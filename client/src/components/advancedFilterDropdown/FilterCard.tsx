import React, { useState, useEffect, useRef, MouseEventHandler } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  addAdvancedAffiliateFilter,
  removeAdvancedAffiliateFilter,
} from "@redux/filters/filterActions";
import Popup from "./Popup";

interface FilterCardProps {
  filter: string;
  identify: string;
  name: string;
  subcategory: string;
  popupRef: React.RefObject<HTMLDivElement>;
}

interface FilterState {
  filters: {
    [filter: string]: {
      filterPayload: {
        affiliatedFilters: {
          [key: string]: string[];
          ind: string[];
          grp: string[];
          org: string[];
        };
      };
    };
  };
}

export default function FilterCard({
  filter,
  identify,
  name,
  subcategory,
  popupRef,
}: FilterCardProps) {
  /* 
    Description:   
      Creates the cards that appear in the AdvancedFilterDropDowns.
    Unique Properties:
      Determines when, how, and where to display popups(portals).
  */

  const dispatch = useDispatch();
  const advFilters = useSelector(
    (state: FilterState) =>
      state.filters[filter].filterPayload.affiliatedFilters[subcategory],
  );
  const isFilterSelected = advFilters.includes(name);
  const [popupState, setPopupState] = useState({
    visible: false,
    position: { top: 0, left: 0 },
  });
  const [isMouseInsidePopup, setIsMouseInsidePopup] = useState(false);
  const isMouseInsideCard = useRef(true);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const nameSpanRef = useRef<HTMLSpanElement>(null);

  const calculatePopupPosition = (event: MouseEvent) => {
    const boundingBox = (event.target as HTMLElement).getBoundingClientRect();
    return {
      top: boundingBox.top + window.scrollY - 4,
      left: boundingBox.left + window.scrollX - 8,
    };
  };

  // Handles the mouse entering a card and waits 1.5 seconds to set the popup state to visible
  const handleMouseEnter = (event: MouseEvent) => {
    isMouseInsideCard.current = true;
    clearTimeout(hoverTimeout.current!);
    if (!isMouseInsidePopup) {
      hoverTimeout.current = setTimeout(() => {
        if (
          isMouseInsideCard.current &&
          nameSpanRef.current &&
          nameSpanRef.current.scrollWidth > nameSpanRef.current.offsetWidth
        ) {
          setPopupState({
            visible: true,
            position: calculatePopupPosition(event),
          });
        }
      }, 1500);
    } else {
      if (isMouseInsideCard.current) {
        setPopupState({
          visible: true,
          position: calculatePopupPosition(event),
        });
      }
    }
  };

  const handleMouseLeave = () => {
    isMouseInsideCard.current = false;
    clearTimeout(hoverTimeout.current!);
  };

  const handlePopupMouseEnter = () => {
    setIsMouseInsidePopup(true);
    clearTimeout(hoverTimeout.current!);
  };

  const handlePopupMouseLeave = () => {
    setIsMouseInsidePopup(false);
    clearTimeout(hoverTimeout.current!);
  };

  useEffect(() => {
    if (!isMouseInsidePopup) {
      setPopupState({
        visible: false,
        position: { top: 0, left: 0 },
      });
    }
  }, [isMouseInsidePopup]);

  useEffect(() => {
    const element = document.getElementById(`${subcategory}_${identify}`);

    if (element) {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        clearTimeout(hoverTimeout.current!);
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    return () => {};
  }, [identify, name]);

  const handleFilterClick = () => {
    if (!isFilterSelected) {
      dispatch(addAdvancedAffiliateFilter(filter, name, subcategory));
    } else {
      dispatch(removeAdvancedAffiliateFilter(filter, name, subcategory));
    }
  };

  return (
    <motion.div
      id={`${subcategory}_${identify}`}
      className="bg-white my-1 ml-2 mr-3 h-14 py-1 px-2 cursor-pointer flex items-center rounded-md"
      onMouseEnter={handleMouseEnter as any}
      onMouseLeave={handleMouseLeave}
      onClick={!popupState.visible ? handleFilterClick : () => {}}
      whileHover={{ backgroundColor: "rgb(44, 146, 245)" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div
        className={`w-12 aspect-square bg-fg-white-85 mr-2 grid place-items-center flex-shrink-0
                ${subcategory === "ind" ? "rounded-full" : "rounded-md"}
                `}
      >
        <p className="select-none">pic</p>
      </div>
      <span
        ref={nameSpanRef}
        className={`
                    m-2 font-Josefin text-lg select-none truncate
                    ${
                      isFilterSelected
                        ? "underline decoration-2 underline-offset-8 decoration-fg-primary"
                        : "none"
                    }
                `}
      >
        {name}
      </span>
      {popupState.visible && (
        <Popup
          name={name}
          position={popupState.position}
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopupMouseLeave}
          handleFilterClick={handleFilterClick}
          popupRef={popupRef}
          isFilterSelected={isFilterSelected}
          subcategory={subcategory}
        />
      )}
    </motion.div>
  );
}