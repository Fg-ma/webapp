import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  addAdvancedAffiliateFilter,
  removeAdvancedAffiliateFilter,
} from "@redux/filters/filterActions";
import { FilterCardProps, FilterState } from "@FgTypes/componentTypes";
import Popup from "./Popup";
import ProfilePicture from "@components/profilePicture/ProfilePicture";

export default function FilterCard({
  entity_username,
  filter,
  entity_name,
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
  const isFilterSelected = advFilters.includes(entity_name);
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
    const element = document.getElementById(
      `${subcategory}_${entity_username}`,
    );

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
  }, [entity_username, name]);

  const handleFilterClick = () => {
    if (!isFilterSelected) {
      dispatch(addAdvancedAffiliateFilter(filter, entity_name, subcategory));
    } else {
      dispatch(removeAdvancedAffiliateFilter(filter, entity_name, subcategory));
    }
  };

  return (
    <motion.div
      id={`${subcategory}_${entity_username}`}
      className="bg-white my-1 h-14 py-1 px-2 cursor-pointer flex items-center rounded-md"
      onMouseEnter={handleMouseEnter as any}
      onMouseLeave={handleMouseLeave}
      onClick={!popupState.visible ? handleFilterClick : () => {}}
      whileHover={{ backgroundColor: "rgb(44, 146, 245)" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <ProfilePicture
        size={{ w: 3, h: 3 }}
        entity_username={entity_username}
        entity_type={subcategory === "ind" ? 1 : subcategory === "grp" ? 2 : 3}
        styles={
          subcategory === "ind"
            ? "rounded-full"
            : subcategory === "grp"
              ? "rounded-md"
              : "rounded-sm"
        }
        clickable={false}
      />
      <span
        ref={nameSpanRef}
        className={`
                    m-2 ml-4 font-Josefin text-lg select-none truncate
                    ${
                      isFilterSelected
                        ? "underline decoration-2 underline-offset-8 decoration-fg-primary"
                        : "none"
                    }
                `}
      >
        {entity_name}
      </span>
      {popupState.visible && (
        <Popup
          entity_username={entity_username}
          entity_name={entity_name}
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
