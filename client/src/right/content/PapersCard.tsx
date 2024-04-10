import React from "react";
import { useDispatch } from "react-redux";
import { setIds, setPageState } from "@redux/pageState/pageStateActions";
import { PapersCardProps } from "@FgTypes/rightTypes";

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
