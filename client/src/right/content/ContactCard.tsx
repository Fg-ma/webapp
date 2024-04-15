import React from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  setConversation,
  setIds,
  setPageState,
} from "@redux/pageState/pageStateActions";
import { ContactCardProps } from "@FgTypes/rightTypes";
import ProfilePicture from "@components/profilePicture/ProfilePicture";

function highlightText(text: string | null, filter: string | undefined) {
  if (!filter || !text) {
    return text;
  }

  const regex = new RegExp(`(${filter})`, "ig");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === filter.toLowerCase() ? (
      <em key={index}>
        <strong>{part}</strong>
      </em>
    ) : (
      part
    ),
  );
}

export function ContactCard({
  entity_username,
  entity_type,
  animate,
  conversation_id,
  conversation_name,
  contact_name,
  last_message,
  contact_creation_date,
  filter,
}: ContactCardProps) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPageState("main", "messages"));
    dispatch(setIds("main", "conversation_id", conversation_id));
    if (contact_name) {
      dispatch(
        setConversation(
          conversation_name,
          [contact_name],
          contact_creation_date,
        ),
      );
    } else {
      dispatch(setConversation(conversation_name, [], contact_creation_date));
    }
  };

  const lastMessage = last_message?.includes("\n")
    ? last_message?.split("\n")[0]
    : last_message;

  const filteredContactName = highlightText(contact_name, filter);
  const filteredLastMessage = highlightText(lastMessage, filter);

  return (
    <AnimatePresence>
      <motion.div
        initial={animate && { opacity: 0, scale: 0.95 }}
        animate={animate && { opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="bg-white my-4 ml-9 h-20 flex items-center rounded-md cursor-pointer"
        onClick={handleClick}
      >
        <div className="w-14 aspect-square mx-4">
          <ProfilePicture
            size={{ h: 3.5, w: 3.5 }}
            entity_username={entity_username}
            entity_type={entity_type}
            styles={
              entity_type === 1
                ? "rounded-full"
                : entity_type === 2
                  ? "rounded-lg"
                  : entity_type === 3
                    ? "rounded"
                    : ""
            }
            clickable={false}
          />
        </div>
        <div className="my-2 mr-4 truncate">
          <p className="w-full font-Josefin text-xl font-bold line-clamp-1 leading-5 pt-2">
            {filteredContactName}
          </p>
          <p className="w-full font-Josefin text-md text-fg-black-30 truncate">
            {filteredLastMessage}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
