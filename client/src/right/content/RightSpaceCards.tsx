import React from "react";
import { useDispatch } from "react-redux";
import { setIds, setPageState } from "@redux/pageState/pageStateActions";
import {
  PapersCardProps,
  NewsCardProps,
  MessagesCardProps,
  DogEarCardProps,
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
      className="bg-white w-fill my-4 mx-6 h-36 flex items-center rounded-md"
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
      className="bg-white w-fill my-4 mx-6 h-36 flex items-center rounded-md"
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

export function MessagesCard({ name, lastMessage = null }: MessagesCardProps) {
  return (
    <div className="bg-white w-fill my-4 mx-6 h-20 py-2.5 flex items-center rounded-md">
      <div className="w-14 aspect-square bg-fg-white-85 ml-4 mr-5 rounded-full grid place-items-center flex-shrink-0">
        <p>pic</p>
      </div>
      <div className="m-2">
        <p className="font-Josefin text-xl truncate">{name}</p>
        <p className="font-K2D text-sm text-fg-black-30 line-clamp-2">
          {lastMessage}
        </p>
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
      className="bg-white w-fill my-4 mx-6 h-36 flex items-center rounded-md"
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
