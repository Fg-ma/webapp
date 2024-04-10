import React from "react";
import { useDispatch } from "react-redux";
import {
  setConversation,
  setIds,
  setPageState,
} from "@redux/pageState/pageStateActions";
import { ConversationCardProps } from "@FgTypes/rightTypes";

export function ConversationCard({
  conversation_id,
  conversation_name,
  last_message,
  members,
  conversation_creation_date,
}: ConversationCardProps) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPageState("main", "messages"));
    dispatch(setIds("main", "conversation_id", conversation_id));
    dispatch(
      setConversation(conversation_name, members, conversation_creation_date),
    );
  };

  return (
    <div
      className="bg-white my-4 ml-9 h-20 flex items-center rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <div
        className="mx-5 my-2 space-y-1"
        style={{ width: "calc(100% - 2.5rem)" }}
      >
        <p className="w-full font-Josefin text-xl font-bold line-clamp-1 leading-5 pt-2">
          {conversation_name
            ? conversation_name
            : members && members.join(", ")}
        </p>
        <p className="w-full font-Josefin text-md text-fg-black-30 truncate">
          {last_message}
        </p>
      </div>
    </div>
  );
}
