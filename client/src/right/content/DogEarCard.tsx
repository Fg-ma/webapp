import React from "react";
import { useDispatch } from "react-redux";
import { setIds, setPageState } from "@redux/pageState/pageStateActions";
import { DogEarCardProps } from "@FgTypes/rightTypes";
import SheetThumbnail from "@components/thumbnails/SheetThumbnail";

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
      className="bg-white h-36 flex items-center rounded-md cursor-pointer"
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
