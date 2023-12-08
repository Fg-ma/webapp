import React from "react";
import { MessagesCard } from "./RightSpaceCards";
import { messages } from "../../data";

export default function IndividualCards() {
    const messCards = messages.map(messInfo => {
        return <MessagesCard key={messInfo.id} name={messInfo.name} lastMessage={messInfo.lastMessage} />
    })

    return (
        <div id="messagesCards" className="h-full mr-3 overflow-scroll">
            {messCards}
        </div>
    )
}