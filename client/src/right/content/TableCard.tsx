import React from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  setIds,
  setPageState,
  setTable,
} from "@redux/pageState/pageStateActions";
import { TableMember, TableCardProps } from "@FgTypes/rightTypes";
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

const getMembersNames = (members: TableMember[]) => {
  let conversationMembersNames: string[] = [];

  for (const member of members) {
    if (member.individual_data) {
      if (member.individual_data.individual_name) {
        conversationMembersNames.push(member.individual_data.individual_name);
      } else {
        conversationMembersNames.push(
          member.individual_data.individual_username,
        );
      }
    } else if (member.group_data) {
      if (member.group_data.group_name) {
        conversationMembersNames.push(member.group_data.group_name);
      } else {
        conversationMembersNames.push(member.group_data.group_handle);
      }
    } else if (member.organization_data) {
      if (member.organization_data.organization_name) {
        conversationMembersNames.push(
          member.organization_data.organization_name,
        );
      } else {
        conversationMembersNames.push(
          member.organization_data.organization_handle,
        );
      }
    }
  }

  return conversationMembersNames;
};

export function TableCard({
  animate,
  table_id,
  table_name,
  last_message,
  members,
  table_creation_date,
  tables_pictures_id,
  filter,
}: TableCardProps) {
  const dispatch = useDispatch();

  const membersNames = getMembersNames(members);

  const handleClick = () => {
    dispatch(setPageState("main", "tables"));
    dispatch(setIds("main", "table_id", table_id));
    dispatch(setTable(table_name, membersNames, table_creation_date));
  };

  const lastMessage = last_message?.includes("\n")
    ? last_message?.split("\n")[0]
    : last_message;

  const filteredConversationName = highlightText(table_name, filter);
  const filteredLastMessage = highlightText(lastMessage, filter);
  const filteredMembers = highlightText(membersNames.join(", "), filter);

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
        {(members.length < 2 || tables_pictures_id) && (
          <div className="w-14 aspect-square mx-4">
            <ProfilePicture
              size={{ h: 3.5, w: 3.5 }}
              entity_username={
                members.length < 2
                  ? members[0].individual_data
                    ? members[0].individual_data.individual_username
                    : members[0].group_data
                      ? members[0].group_data.group_handle
                      : members[0].organization_data
                        ? members[0].organization_data.organization_handle
                        : ""
                  : ""
              }
              entity_type={
                members[0].individual_data
                  ? 1
                  : members[0].group_data
                    ? 2
                    : members[0].organization_data
                      ? 3
                      : 0
              }
              styles={
                tables_pictures_id
                  ? "rounded-md"
                  : members[0].individual_data
                    ? "rounded-full"
                    : members[0].group_data
                      ? "rounded-lg"
                      : members[0].organization_data
                        ? "rounded"
                        : ""
              }
              clickable={false}
              tables_pictures_id={
                tables_pictures_id ? tables_pictures_id : undefined
              }
            />
          </div>
        )}
        <div
          className={` my-2 space-y-1 ${
            members.length < 2 || tables_pictures_id ? "mr-4" : "mx-4"
          }`}
          style={{ width: "calc(100% - 2.5rem)" }}
        >
          <p className="w-full font-Josefin text-xl font-bold line-clamp-1 leading-5 pt-2">
            {filteredConversationName
              ? filteredConversationName
              : filteredMembers}
          </p>
          <p className="w-full font-Josefin text-md text-fg-black-30 truncate">
            {filteredLastMessage}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
