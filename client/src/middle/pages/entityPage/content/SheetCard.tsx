import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
import config from "@config";
import { setIds, setPageState } from "@redux/pageState/pageStateActions";
import { usePinned } from "@context/PinnedContext";
import { SheetProps, SheetData } from "@FgTypes/middleTypes";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function SheetCard({
  type,
  sheet_id,
  author_id,
  pinned = false,
  relation_id,
  isEditablePage,
}: SheetProps) {
  const dispatch = useDispatch();

  const { setPinnedState } = usePinned();
  const [sheetData, setSheetData] = useState<SheetData>();
  const [hover, setHover] = useState(false);
  const isAuthor = useRef<boolean | null>(null);

  // Gets sheet data from a given sheet_id
  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response = await Axios.get(`${serverUrl}/sheets/${sheet_id}`);
        setSheetData(response.data);
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      }
    };

    fetchSheetData();
  }, [sheet_id]);

  // Checks if the entity is the author of the sheet
  if (sheetData && sheetData.sheet_author_id === author_id) {
    isAuthor.current = true;
  }

  // Toggles if a sheet is pinned by updating the db and then emitting togglePinned to the socket
  const togglePinned = async () => {
    let newPinned;
    let date_pinned;

    if (pinned) {
      newPinned = false;
      date_pinned = null;
    } else {
      newPinned = true;
      const currentDate = new Date();
      date_pinned = currentDate.toISOString();
    }

    try {
      if (type === "collection") {
        await Axios.put(`${serverUrl}/collections/collections_content_pinned`, {
          relation_id: relation_id,
          pinned: newPinned,
          date_pinned: date_pinned,
        });
      } else if (type === "entity") {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        await Axios.put(
          `${serverUrl}/entities/entity_content_pinned`,
          {
            relation_id: relation_id,
            pinned: newPinned,
            date_pinned: date_pinned,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }
    } catch (error) {
      console.error("Error toggling pinned:", error);
    }

    try {
      setPinnedState({ relation_id: relation_id, type: "sheet" });
    } catch (error) {
      console.error("Error toggling pinned:", error);
    }
  };

  const handleClick = () => {
    dispatch(setPageState("main", "sheets"));
    dispatch(setIds("main", "sheet_id", sheet_id));
  };

  return (
    <div
      className="shadow-md rounded flex flex-col justify-center"
      onClick={handleClick}
    >
      <div className="bg-fg-white-85 w-3/4 aspect-square rounded-md mx-auto mt-5 mb-3 relative">
        {isEditablePage.current ? (
          <button
            className="w-8 aspect-square absolute -top-2.5 -right-2.5 bg-cover bg-no-repeat rotate-45 focus:outline-none"
            style={{
              backgroundImage:
                pinned || hover ? 'url("/assets/icons/pin.svg")' : "none",
            }}
            onClick={(e) => {
              e.stopPropagation();
              togglePinned();
            }}
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
          ></button>
        ) : (
          <div
            className={`aspect-square absolute -top-2.5 -right-2.5 bg-cover bg-no-repeat rotate-45 focus:outline-none ${
              pinned ? "w-8" : "w-0"
            }`}
            style={{
              backgroundImage: pinned ? 'url("/assets/icons/pin.svg")' : "none",
            }}
          ></div>
        )}
      </div>
      {sheetData && (
        <p className="text-base font-bold leading-5 text-center mx-4 h-[3.75rem] line-clamp-3 mb-1">
          {sheetData.sheet_title}
        </p>
      )}
      <p className="text-sm font-K2D text-center mb-3">
        {isAuthor.current ? "Author" : "Responseded to"}
      </p>
    </div>
  );
}
