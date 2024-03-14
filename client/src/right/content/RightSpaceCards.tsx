import React from "react";
import { useDispatch } from "react-redux";
import {
  setConversation,
  setIds,
  setPageState,
} from "@redux/pageState/pageStateActions";
import {
  PapersCardProps,
  NewsCardProps,
  DogEarCardProps,
  ConversationCardProps,
  ContactCardProps,
} from "@FgTypes/rightTypes";
import SheetThumbnail from "@components/thumbnails/SheetThumbnail";

/* 
  Description:   
    Templates for all of the right side cards that data from the database gets mapped to. 
    Formats the data into something visually appealing.
  Unique Properties:
    N/A
*/

export function PapersCard({ paper_id, title, subject }: PapersCardProps) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPageState("main", "papers"));
    dispatch(setIds("main", "paper_id", paper_id));
  };

  return (
    <div
      className="bg-white my-4 ml-9 h-36 flex items-center rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <img></img>
      <div className="m-2 w-2/3 space-y-1">
        <p className="font-Josefin text-lg font-bold line-clamp-2">{title}</p>
        <p className="font-Josefin text-base text-fg-black-30 line-clamp-2">
          {subject}
        </p>
      </div>
    </div>
  );
}

export function NewsCard({
  sheet_id,
  title,
  subject,
  affResponses = null,
}: NewsCardProps) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPageState("main", "sheets"));
    dispatch(setIds("main", "sheet_id", sheet_id));
  };

  return (
    <div
      className="bg-white my-4 ml-9 h-36 flex items-center rounded-md cursor-pointer"
      onClick={handleClick}
    >
      {sheet_id && (
        <SheetThumbnail
          sheet_id={sheet_id}
          size={{ h: 7, w: 7 }}
          styles="ml-3 rounded-sm"
        />
      )}
      <div className="m-2 w-2/3 space-y-1">
        <p className="font-Josefin text-lg font-bold line-clamp-2">{title}</p>
        <div>
          <p className="font-Josefin text-base text-fg-black-30 line-clamp-2">
            {subject}
          </p>
          <p className="font-K2D text-xs text-fg-black-30 truncate">
            Affiliates' responses: {affResponses}
          </p>
        </div>
      </div>
    </div>
  );
}

export function DogEarCard({
  sheet_id,
  title,
  subject,
  affResponses = null,
}: DogEarCardProps) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPageState("main", "sheets"));
    dispatch(setIds("main", "sheet_id", sheet_id));
  };

  return (
    <div
      className="bg-white my-4 ml-9 h-36 flex items-center rounded-md cursor-pointer"
      onClick={handleClick}
    >
      {sheet_id && (
        <SheetThumbnail
          sheet_id={sheet_id}
          size={{ h: 7, w: 7 }}
          styles="ml-3 rounded-sm"
        />
      )}
      <div className="m-2 w-2/3 space-y-1">
        <p className="font-Josefin text-lg font-bold line-clamp-2">{title}</p>
        <div>
          <p className="font-Josefin text-base text-fg-black-30 line-clamp-2">
            {subject}
          </p>
          <p className="font-K2D text-xs text-fg-black-30 truncate">
            Affiliates' responses: {affResponses}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ConversationCard({
  conversation_id,
  conversation_name,
  last_message,
  members,
  conversation_creation_date,
}: ConversationCardProps) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPageState("main", "messages"));
    dispatch(setIds("main", "conversation_id", conversation_id));
    dispatch(
      setConversation(conversation_name, members, conversation_creation_date),
    );
  };

  return (
    <div
      className="bg-white my-4 ml-9 h-20 flex items-center rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <div
        className="mx-5 my-2 space-y-1"
        style={{ width: "calc(100% - 2.5rem)" }}
      >
        <p className="w-full font-Josefin text-xl font-bold line-clamp-1 leading-5 pt-2">
          {conversation_name
            ? conversation_name
            : members && members.join(", ")}
        </p>
        <p className="w-full font-Josefin text-md text-fg-black-30 truncate">
          {last_message}
        </p>
      </div>
    </div>
  );
}

export function ContactCard({
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
    <div
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
    </div>
  );
}
