import React from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  setConversation,
  setIds,
  setPageState,
} from "@redux/pageState/pageStateActions";
import { ContactCardProps } from "@FgTypes/rightTypes";

export function ContactCard({
  animate,
  conversation_id,
  conversation_name,
  contact_name,
  last_message,
  contact_creation_date,
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
        <div
          className="mx-5 my-2 space-y-1"
          style={{ width: "calc(100% - 2.5rem)" }}
        >
          <p className="w-full font-Josefin text-xl font-bold line-clamp-1 leading-5 pt-2">
            {contact_name}
          </p>
          <p className="w-full font-Josefin text-md text-fg-black-30 truncate">
            {last_message}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
