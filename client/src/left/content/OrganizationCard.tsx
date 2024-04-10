import React from "react";
import { useDispatch } from "react-redux";
import { setIds, setPageState } from "@redux/pageState/pageStateActions";
import { OrganizationCardProps } from "@FgTypes/leftTypes";
import ProfilePicture from "@components/profilePicture/ProfilePicture";
import { motion, AnimatePresence } from "framer-motion";

export function OrganizationCard({
  name,
  handle,
  current_issue = null,
  stances = null,
  animate,
}: OrganizationCardProps) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPageState("main", "organizations"));
    dispatch(setPageState("organizations", "sheets"));
    dispatch(setIds("main", "organization_id", handle));
    dispatch(setIds("organizations", "collection_id", null));
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
        <div className="w-16 aspect-square ml-4 mr-5">
          <ProfilePicture
            size={{ h: 4, w: 4 }}
            entity_username={handle}
            entity_type={3}
            styles="rounded-md"
            clickable={false}
          />
        </div>
        <div className="m-2 h-full truncate">
          <p className="font-Josefin text-xl truncate">
            {name ? name : handle}
          </p>
          <p className="font-K2D text-base text-fg-black-30 truncate">
            {current_issue}
          </p>
          <p className="font-K2D text-sm text-fg-black-30 truncate">
            Stances: {stances}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
