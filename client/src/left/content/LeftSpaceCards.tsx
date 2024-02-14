import React from "react";
import { useDispatch } from "react-redux";
import { setIds, setPageState } from "@redux/pageState/pageStateActions";

/* 
  Description:   
    Templates for all of the left side cards that data from the database gets mapped to. 
    Formats the data into something visually appealing.
  Unique Properties:
    N/A
*/
interface IndividualCardProps {
  id: number;
  name: string;
  currentIssue: string | null;
}

export function IndividualCard({
  id,
  name,
  currentIssue = null,
}: IndividualCardProps) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPageState("main", "individuals"));
    dispatch(setPageState("individuals", "sheets"));
    dispatch(setIds("main", "individual_id", id));
    dispatch(setIds("individuals", "collection_id", 0));
  };

  return (
    <div
      className="bg-white w-fill my-4 mx-6 h-20 py-2.5 flex items-center rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-14 aspect-square bg-fg-white-85 ml-4 mr-5 rounded-full grid place-items-center flex-shrink-0">
        <p>pic</p>
      </div>
      <div className="m-2 truncate">
        <p className="font-Josefin text-xl truncate">{name}</p>
        <p className="font-K2D text-sm text-fg-black-30 truncate">
          {currentIssue}
        </p>
      </div>
    </div>
  );
}

interface GroupCardProps {
  id: number;
  name: string;
  currentIssue: string | null;
  affInCommon: string | null;
}

export function GroupCard({
  id,
  name,
  currentIssue = null,
  affInCommon = null,
}: GroupCardProps) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPageState("main", "groups"));
    dispatch(setPageState("groups", "sheets"));
    dispatch(setIds("main", "group_id", id));
    dispatch(setIds("groups", "collection_id", 0));
  };

  return (
    <div
      className="bg-white w-fill my-4 mx-6 h-24 py-2.5 flex items-center rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-16 aspect-square bg-fg-white-85 ml-4 mr-5 rounded-md grid place-items-center flex-shrink-0">
        <p>pic</p>
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
    </div>
  );
}

interface OrganizationCardProps {
  id: number;
  name: string;
  currentIssue: string | null;
  stances: string | null;
}

export function OrganizationCard({
  id,
  name,
  currentIssue = null,
  stances = null,
}: OrganizationCardProps) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPageState("main", "organizations"));
    dispatch(setPageState("organizations", "sheets"));
    dispatch(setIds("main", "organization_id", id));
    dispatch(setIds("organizations", "collection_id", 0));
  };

  return (
    <div
      className="bg-white w-fill my-4 mx-6 h-24 py-2.5 flex items-center rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-16 aspect-square bg-fg-white-85 ml-4 mr-5 rounded-md grid place-items-center flex-shrink-0">
        <p>pic</p>
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
    </div>
  );
}
