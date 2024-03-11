import React, { useEffect, useState } from "react";
import Axios from "axios";
import config from "@config";
import { Conversation } from "@FgTypes/rightTypes";
import { ConversationsCard } from "./RightSpaceCards";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function Conversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const sortData = (data: Conversation[]) => {
    const parseDate = (dateString: string | null) =>
      dateString
        ? new Date(dateString).getTime()
        : new Date("2000-01-01T01:01:01.000Z").getTime();

    data.sort(
      (a, b) =>
        parseDate(b.conversation_creation_date) -
        parseDate(a.conversation_creation_date),
    );

    return [...data];
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
      <ConversationsCard
        key={conversation.conversation_id}
        conversation_id={conversation.conversation_id}
        conversation_name={conversation.conversation_name}
        last_message={conversation.last_message}
        members={conversationMembersNames}
      />
    );
  });

  return <div>{conversationCards}</div>;
}
