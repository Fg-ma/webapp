import React from "react";
import { MessagesConversationBodyProps } from "@FgTypes/middleTypes";
import MessagesConversationHeader from "./MessagesConversationHeader";
import UserBubble from "./UserBubble";
import RecipientsBubbles from "./RecipientsBubbles";

export default function MessagesConversationBody({
  conversation,
  conversationSize,
  typing,
}: MessagesConversationBodyProps) {
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

  return (
    <div className="w-full grow flex flex-col items-center justify-start pt-10">
      <MessagesConversationHeader />
      {renderContent()}
    </div>
  );
}
