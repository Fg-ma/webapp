import React from "react";
import { createPortal } from "react-dom";
import { PopupProps } from "@FgTypes/componentTypes";
import ProfilePicture from "@components/profilePicture/ProfilePicture";

export default function Popup({
  entity_username,
  entity_name,
  position,
  onMouseEnter,
  onMouseLeave,
  handleFilterClick,
  popupRef,
  isFilterSelected,
  subcategory,
}: PopupProps) {
  /* 
    Description:   
      The popup is the portal that is created when the mouse hovers over a FilterCard that has 
      text overflowing.
    Unique Properties:
      Acts the same as a filter card except that it can go beyond the boundaries of the container 
      and doesn't switch to fg-secondary as the background when hovered over.
  */

  return createPortal(
    <div
      id={`${subcategory}Popup_${entity_name}`}
      className="bg-white my-1 ml-2 mr-3 h-14 py-1 px-2 w-max absolute z-50 overflow-visible cursor-pointer flex items-center rounded-md shadow-md"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      onMouseEnter={onMouseEnter as any}
      onMouseLeave={onMouseLeave}
      onClick={handleFilterClick}
      ref={popupRef}
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
        className={`m-2 font-Josefin text-lg select-none
                    ${
                      isFilterSelected
                        ? "underline decoration-2 underline-offset-8 decoration-fg-primary"
                        : "none"
                    }
                `}
      >
        {entity_name}
      </span>
    </div>,
    document.body,
  );
}
