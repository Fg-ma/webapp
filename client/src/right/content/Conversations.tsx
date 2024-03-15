import React, { useEffect, useState } from "react";
import Axios from "axios";
import config from "@config";
import { useSocketContext } from "@context/LiveUpdatesContext";
import { Conversation } from "@FgTypes/rightTypes";
import { ConversationCard } from "./RightSpaceCards";
import { useLastMessageContext } from "@context/LastMessageContext";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function Conversations() {
  const { liveUpdatesSocket } = useSocketContext();
  const { lastMessage } = useLastMessageContext();
  const [conversations, setConversations] = useState<Conversation[]>([]);

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

        setConversations(sortData(response.data));
      } catch (error) {
        console.error("Error fetching entity data:", error);
      }
    };

    fetchConversations();
  }, []);

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

  const conversationCards = conversations.map((conversation) => {
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

    return (
      <ConversationCard
        key={conversation.conversation_id}
        conversation_id={conversation.conversation_id}
        conversation_name={conversation.conversation_name}
        last_message={conversation.last_message}
        members={conversationMembersNames}
        conversation_creation_date={conversation.conversation_creation_date}
      />
    );
  });

  return <div>{conversationCards}</div>;
}
