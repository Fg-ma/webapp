import React from "react";
import { MessagesCard } from "./RightSpaceCards";
import { messages } from "../../data";

export default function IndividualCards() {
  /* 
    Description:   
      Gets messages data from a database then extracts the id, name, and lastMessage to be mapped
      into cards.
    Unique Properties:
      N/A
  */

  const messCards = messages.map((messInfo) => {
    return (
      <MessagesCard
        key={messInfo.id}
        name={messInfo.name}
        lastMessage={messInfo.lastMessage}
      />
    );
  });

  return (
    <div id="messagesCards" className="h-full">
      {messCards}
    </div>
  );
}
