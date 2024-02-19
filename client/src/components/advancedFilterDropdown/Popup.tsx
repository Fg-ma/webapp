import React from "react";
import { createPortal } from "react-dom";

interface PopupProps {
  name: string;
  position: {
    top: number;
    left: number;
  };
  onMouseEnter: (event: MouseEvent) => void;
  onMouseLeave: () => void;
  handleFilterClick: () => void;
  popupRef: React.RefObject<HTMLDivElement>;
  isFilterSelected: boolean;
  subcategory: string;
}

export default function Popup({
  name,
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
      id={`${subcategory}Popup_${name}`}
      className="bg-white my-1 ml-2 mr-3 h-14 py-1 px-2 w-max fixed z-10 overflow-visible cursor-pointer flex items-center rounded-md"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      onMouseEnter={onMouseEnter as any}
      onMouseLeave={onMouseLeave}
      onClick={handleFilterClick}
      ref={popupRef}
    >
      <div className="w-12 aspect-square bg-fg-white-85 mr-2 rounded-md grid place-items-center flex-shrink-0">
        <p className="select-none">pic</p>
      </div>
      <span
        className={`m-2 font-Josefin text-lg select-none
                    ${
                      isFilterSelected
                        ? "underline decoration-2 underline-offset-8 decoration-fg-primary"
                        : "none"
                    }
                `}
      >
        {name}
      </span>
    </div>,
    document.body,
  );
}
