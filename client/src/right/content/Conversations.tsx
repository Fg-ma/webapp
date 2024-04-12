import React, { useEffect, useState } from "react";
import Axios from "axios";
import config from "@config";
import { useSocketContext } from "@context/LiveUpdatesContext";
import { Conversation } from "@FgTypes/rightTypes";
import { ConversationCard } from "./ConversationCard";
import { useLastMessageContext } from "@context/LastMessageContext";
import { useIndexedDBContext } from "@context/IDBContext";
import { useConversationContext } from "@context/ConversationContext";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function Conversations() {
  const { liveUpdatesSocket } = useSocketContext();
  const { lastMessage } = useLastMessageContext();
  const { fluxConversation, setFluxConversation } = useConversationContext();
  const {
    storeConversation,
    storeConversations,
    getStoredConversations,
    deleteStoredConversations,
  } = useIndexedDBContext();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [newConversation, setNewConversation] = useState<Conversation>();

  const sortData = (data: Conversation[]) => {
    const parseDate = (dateString: string | null) =>
      dateString
        ? new Date(dateString).getTime()
        : new Date("2000-01-01T01:01:01.000Z").getTime();

    const sortedData = [...data];

    sortedData.sort((a, b) => {
      if (a.last_message_date !== null && b.last_message_date !== null) {
        return parseDate(b.last_message_date) - parseDate(a.last_message_date);
      } else if (a.last_message_date !== null && b.last_message_date === null) {
        return (
          parseDate(b.conversation_creation_date) -
          parseDate(a.last_message_date)
        );
      } else if (a.last_message_date === null && b.last_message_date !== null) {
        return (
          parseDate(b.last_message_date) -
          parseDate(a.conversation_creation_date)
        );
      } else {
        return (
          parseDate(b.conversation_creation_date) -
          parseDate(a.conversation_creation_date)
        );
      }
    });

    return [...sortedData];
  };

  useEffect(() => {
    const fetchConversations = async () => {
      const storedConversations = await getStoredConversations();

      if (storedConversations.length === 0) {
        try {
          const token = localStorage.getItem("token");

          if (!token) {
            return;
          }

          const response = await Axios.get(
            `${serverUrl}/conversations/user_conversations`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const sortedData = sortData(response.data);

          setConversations(sortedData);
          await storeConversations(sortedData);
        } catch (error) {
          console.error("Error fetching entity data:", error);
        }
      } else {
        setConversations(sortData(storedConversations));
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchNewConversation = async () => {
      const storedConversations = await getStoredConversations();

      if (storedConversations.length !== 0) {
        try {
          const token = localStorage.getItem("token");

          if (!token) {
            console.error("Token not found in local storage");
            return;
          }

          const response = await Axios.get(
            `${serverUrl}/conversations/get_conversation_by_conversation_id`,
            {
              params: {
                conversation_id: fluxConversation.conversation_id,
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const newConversation = { ...response.data, animate: true };

          setNewConversation(newConversation);

          await storeConversation({ ...response.data, animate: false });
        } catch (error) {
          console.error("Error fetching Conversation data:", error);
        }
      }
    };

    const deleteOldConversation = async () => {
      const newConversations = conversations.filter(
        (conversation) =>
          conversation.conversation_id !== fluxConversation.conversation_id,
      );

      setConversations(newConversations);

      await deleteStoredConversations();
      await storeConversations(newConversations);
    };

    if (fluxConversation?.action === "newConversation") {
      fetchNewConversation();
      setFluxConversation({
        action: "",
        conversation_id: "",
      });
    } else if (fluxConversation?.action === "deletedConversation") {
      deleteOldConversation();
      setFluxConversation({
        action: "",
        conversation_id: "",
      });
    }
  }, [fluxConversation]);

  // Update last message and message position
  useEffect(() => {
    const updatedConversations = conversations.map((conversation) => {
      if (conversation.conversation_id === lastMessage.conversation_id) {
        return {
          ...conversation,
          last_message: lastMessage.last_message,
        };
      }
      return conversation;
    });

    const indexToUpdate = updatedConversations.findIndex(
      (conversation) =>
        conversation.conversation_id === lastMessage.conversation_id,
    );

    if (indexToUpdate !== -1) {
      const updatedConversation = updatedConversations.splice(
        indexToUpdate,
        1,
      )[0];
      updatedConversations.unshift(updatedConversation);
    }

    setConversations(updatedConversations);
  }, [lastMessage]);

  // Establish incomingMessage live update socket connection
  useEffect(() => {
    liveUpdatesSocket?.on(
      "incomingMessage",
      (incomingMessage: { content: string; conversation_id: string }) => {
        setConversations((prevConversations) => {
          const updatedConversations = prevConversations.map((conversation) => {
            if (
              conversation.conversation_id === incomingMessage.conversation_id
            ) {
              return {
                ...conversation,
                last_message: incomingMessage.content,
              };
            }
            return conversation;
          });

          const indexToUpdate = updatedConversations.findIndex(
            (conversation) =>
              conversation.conversation_id === incomingMessage.conversation_id,
          );

          if (indexToUpdate !== -1) {
            const updatedConversation = updatedConversations.splice(
              indexToUpdate,
              1,
            )[0];
            updatedConversations.unshift(updatedConversation);
          }

          return updatedConversations;
        });
      },
    );

    return () => {
      liveUpdatesSocket?.off("incomingMessage");
    };
  }, []);

  const getConversationMembersNames = (conversation: Conversation) => {
    let conversationMembersNames: string[] = [];

    for (const member of conversation.members) {
      if (member.individual_data) {
        if (member.individual_data.individual_name) {
          conversationMembersNames.push(member.individual_data.individual_name);
        } else {
          conversationMembersNames.push(
            member.individual_data.individual_username,
          );
        }
      } else if (member.group_data) {
        if (member.group_data.group_name) {
          conversationMembersNames.push(member.group_data.group_name);
        } else {
          conversationMembersNames.push(member.group_data.group_handle);
        }
      } else if (member.organization_data) {
        if (member.organization_data.organization_name) {
          conversationMembersNames.push(
            member.organization_data.organization_name,
          );
        } else {
          conversationMembersNames.push(
            member.organization_data.organization_handle,
          );
        }
      }
    }

    return conversationMembersNames;
  };

  let newConversationCard;
  if (newConversation) {
    const foundConversation = conversations.find(
      (conversation) =>
        conversation.conversation_id === newConversation.conversation_id,
    );
    if (!foundConversation) {
      newConversationCard = (
        <ConversationCard
          key={newConversation.conversation_id}
          animate={newConversation.animate}
          conversation_id={newConversation.conversation_id}
          conversation_name={newConversation.conversation_name}
          last_message={newConversation.last_message}
          members={getConversationMembersNames(newConversation)}
          conversation_creation_date={
            newConversation.conversation_creation_date
          }
        />
      );
    }
  }

  const conversationCards = conversations.map((conversation) => {
    return (
      <ConversationCard
        key={conversation.conversation_id}
        conversation_id={conversation.conversation_id}
        conversation_name={conversation.conversation_name}
        last_message={conversation.last_message}
        members={getConversationMembersNames(conversation)}
        conversation_creation_date={conversation.conversation_creation_date}
      />
    );
  });

  return (
    <div>
      {newConversationCard}
      {conversationCards}
    </div>
  );
}
