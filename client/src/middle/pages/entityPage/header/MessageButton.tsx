import React from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
import config from "@config";
import {
  setConversation,
  setIds,
  setPageState,
  setSecondaryPageState,
} from "@redux/pageState/pageStateActions";
import { MessageButtonProps } from "@FgTypes/middleTypes";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function MessageButton({ entity_id }: MessageButtonProps) {
  const dispatch = useDispatch();

  const handleClick = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const response = await Axios.get(
      `${serverUrl}/conversations/message_button`,
      {
        params: {
          entity_id: entity_id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    dispatch(setPageState("main", "messages"));
    dispatch(setSecondaryPageState("main", "messages"));
    dispatch(setIds("main", "conversation_id", response.data.conversation_id));
    dispatch(
      setConversation(
        response.data.conversation_name,
        response.data.members,
        response.data.conversation_creation_date,
      ),
    );
  };

  return (
    <button
      className="w-1/4 h-9 rounded-md bg-fg-white-95"
      onClick={handleClick}
    >
      Message
    </button>
  );
}
