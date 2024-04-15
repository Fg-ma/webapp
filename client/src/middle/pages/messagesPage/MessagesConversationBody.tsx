import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { MessagesConversationBodyProps } from "@FgTypes/middleTypes";
import MessagesConversationHeader from "./MessagesConversationHeader";
import UserBubble from "./UserBubble";
import RecipientsBubbles from "./RecipientsBubbles";
import { setConversation } from "@redux/pageState/pageStateActions";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function MessagesConversationBody({
  conversation,
  conversationSize,
  typing,
}: MessagesConversationBodyProps) {
  const token = localStorage.getItem("token");

  const [conversationContent, setConversationContent] = useState<
    React.JSX.Element[]
  >([]);
  const [typingBubbles, setTypingBubbles] = useState<
    (JSX.Element | undefined)[]
  >([]);

  useEffect(() => {
    const fetchTypingData = async () => {
      const typingPromises = typing.map(async (type) => {
        let isUser = false;

        if (!token) {
          return;
        }

        try {
          const response = await Axios.get(`${serverUrl}/auth/isUser`, {
            params: {
              target: type.sender,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          isUser = response.data;
        } catch (error) {
          isUser = false;
        }

        if (!isUser) {
          return (
            <RecipientsBubbles
              key={`typing_bubble_${type.sender}`}
              message={"typing"}
              conversationSize={conversationSize}
              sender={type.sender}
            />
          );
        } else {
          return;
        }
      });

      const resolvedTypingBubbles = await Promise.all(typingPromises);

      setTypingBubbles(resolvedTypingBubbles);
    };

    fetchTypingData();
  }, [token, typing, conversationSize]);

  useEffect(() => {
    const renderContent = () => {
      return conversation.map((message, index) => {
        if (message.isUser) {
          return <UserBubble key={index} message={message.content} />;
        } else {
          return (
            <RecipientsBubbles
              key={index}
              message={message.content}
              conversationSize={conversationSize}
              sender={message.sender}
            />
          );
        }
      });
    };

    setConversationContent(renderContent());
  }, [conversation]);

  return (
    <div className="w-full grow flex flex-col items-center justify-start pt-10">
      <MessagesConversationHeader />
      {conversationContent}
      {typingBubbles}
    </div>
  );
}
