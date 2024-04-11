import React from "react";
import { useDispatch } from "react-redux";
import { setIds, setPageState } from "@redux/pageState/pageStateActions";
import { IndividualCardProps } from "@FgTypes/leftTypes";
import ProfilePicture from "@components/profilePicture/ProfilePicture";
import { motion, AnimatePresence } from "framer-motion";

export function IndividualCard({
  name,
  username,
  current_issue = null,
  animate,
}: IndividualCardProps) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPageState("main", "individuals"));
    dispatch(setPageState("individuals", "sheets"));
    dispatch(setIds("main", "individual_id", username));
    dispatch(setIds("individuals", "collection_id", null));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={animate && { opacity: 0, scale: 0.95 }}
        animate={animate && { opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-fill my-4 ml-9 h-20 py-2.5 flex items-center rounded-md cursor-pointer"
        onClick={handleClick}
      >
        <div className="w-14 aspect-square mx-4">
          <ProfilePicture
            size={{ h: 3.5, w: 3.5 }}
            entity_username={username}
            entity_type={1}
            styles="rounded-full"
            clickable={false}
          />
        </div>
        <div className="my-2 mr-4 truncate">
          <p className="font-Josefin text-xl truncate">
            {name ? name : username}
          </p>
          <p className="font-K2D text-sm text-fg-black-30 truncate">
            {current_issue}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
