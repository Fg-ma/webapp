import React from "react";
import { useDispatch } from "react-redux";
import { setIds, setPageState } from "@redux/pageState/pageStateActions";
import { GroupCardProps } from "@FgTypes/leftTypes";
import ProfilePicture from "@components/profilePicture/ProfilePicture";
import { motion, AnimatePresence } from "framer-motion";

export function GroupCard({
  name,
  handle,
  current_issue = null,
  affInCommon = null,
  animate,
}: GroupCardProps) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPageState("main", "groups"));
    dispatch(setPageState("groups", "sheets"));
    dispatch(setIds("main", "group_id", handle));
    dispatch(setIds("groups", "collection_id", null));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={animate && { opacity: 0, scale: 0.95 }}
        animate={animate && { opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-fill my-4 ml-9 h-24 py-2.5 flex items-center rounded-md cursor-pointer"
        onClick={handleClick}
      >
        <div className="w-16 aspect-square mx-4">
          <ProfilePicture
            size={{ h: 4, w: 4 }}
            entity_username={handle}
            entity_type={2}
            styles="rounded-lg"
            clickable={false}
          />
        </div>
        <div className="my-2 mr-4 truncate">
          <p className="font-Josefin text-xl truncate">
            {name ? name : handle}
          </p>
          <p className="font-K2D text-base text-fg-black-30 truncate">
            {current_issue}
          </p>
          <p className="font-K2D text-sm text-fg-black-30 truncate">
            Affiliates in this group: {affInCommon}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
