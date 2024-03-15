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
import { CreateContactButtonProps } from "@FgTypes/middleTypes";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function CreateContactButton({
  entity_id,
}: CreateContactButtonProps) {
  const dispatch = useDispatch();

  const createContact = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const response = await Axios.put(
      `${serverUrl}/contacts/set_contact_by_entity_id`,
      {
        entity_id: entity_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    dispatch(setPageState("main", "messages"));
    dispatch(setPageState("messages", "contacts"));
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
      className="h-11 min-h-11 items-center font-K2D bg-fg-white-95 rounded-md w-full"
      onClick={createContact}
    >
      Create Contact
    </button>
  );
}
