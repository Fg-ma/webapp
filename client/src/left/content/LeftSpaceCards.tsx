import React from "react";
import { useDispatch } from "react-redux";
import { setIds, setPageState } from "@redux/pageState/pageStateActions";
import {
  IndividualCardProps,
  GroupCardProps,
  OrganizationCardProps,
} from "@FgTypes/leftTypes";
import ProfilePicture from "@components/profilePicture/ProfilePicture";
import { motion, AnimatePresence } from "framer-motion";

/* 
  Description:   
    Templates for all of the left side cards that data from the database gets mapped to. 
    Formats the data into something visually appealing.
  Unique Properties:
    N/A
*/

export function IndividualCard({
  id,
  name,
  currentIssue = null,
  animate,
}: IndividualCardProps) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPageState("main", "individuals"));
    dispatch(setPageState("individuals", "sheets"));
    dispatch(setIds("main", "individual_id", id));
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
        <div className="w-14 aspect-square ml-4 mr-5">
          <ProfilePicture
            size={{ h: 3.5, w: 3.5 }}
            entity_id={id}
            entity_type={1}
            styles="rounded-full"
            clickable={false}
          />
        </div>
        <div className="m-2 truncate">
          <p className="font-Josefin text-xl truncate">{name}</p>
          <p className="font-K2D text-sm text-fg-black-30 truncate">
            {currentIssue}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function GroupCard({
  id,
  name,
  currentIssue = null,
  affInCommon = null,
  animate,
}: GroupCardProps) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPageState("main", "groups"));
    dispatch(setPageState("groups", "sheets"));
    dispatch(setIds("main", "group_id", id));
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
        <div className="w-16 aspect-square ml-4 mr-5">
          <ProfilePicture
            size={{ h: 4, w: 4 }}
            entity_id={id}
            entity_type={2}
            styles="rounded-md"
            clickable={false}
          />
        </div>
        <div className="m-2 truncate">
          <p className="font-Josefin text-xl truncate">{name}</p>
          <p className="font-K2D text-base text-fg-black-30 truncate">
            {currentIssue}
          </p>
          <p className="font-K2D text-sm text-fg-black-30 truncate">
            Affiliates in this group: {affInCommon}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function OrganizationCard({
  id,
  name,
  currentIssue = null,
  stances = null,
  animate,
}: OrganizationCardProps) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPageState("main", "organizations"));
    dispatch(setPageState("organizations", "sheets"));
    dispatch(setIds("main", "organization_id", id));
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
            entity_id={id}
            entity_type={3}
            styles="rounded-md"
            clickable={false}
          />
        </div>
        <div className="m-2 h-full truncate">
          <p className="font-Josefin text-xl truncate">{name}</p>
          <p className="font-K2D text-base text-fg-black-30 truncate">
            {currentIssue}
          </p>
          <p className="font-K2D text-sm text-fg-black-30 truncate">
            Stances: {stances}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
