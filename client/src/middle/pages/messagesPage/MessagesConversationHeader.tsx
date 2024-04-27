import { ConversationMeta } from "@FgTypes/middleTypes";
import React from "react";
import { useSelector } from "react-redux";

export default function MessagesConversationHeader() {
  const conversationMeta = useSelector(
    (state: ConversationMeta) => state.page.main.pagePayload.conversation,
  );

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const options: Intl.DateTimeFormatOptions = {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: userTimeZone,
    };

    const formattedDateTime = date.toLocaleString("en-US", options);

    return formattedDateTime;
  }

  return (
    <div className="mb-5 flex flex-col items-center justify-center text-center">
      {conversationMeta.conversation_name && (
        <div className="font-K2D text-fg-black-25 text-xl">
          {conversationMeta.conversation_name}
        </div>
      )}
      {conversationMeta.members && (
        <div className="font-K2D text-fg-black-30 text-lg text-center">
          {conversationMeta.members.length >= 1
            ? conversationMeta.members.join(", ")
            : conversationMeta.members.join(" and ")}
        </div>
      )}
      {conversationMeta.conversation_creation_date && (
        <div className="font-K2D text-fg-black-40 text-sm text-center">
          {formatDate(conversationMeta.conversation_creation_date)}
        </div>
      )}
    </div>
  );
}
