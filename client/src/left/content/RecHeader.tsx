import React from "react";
import { RecHeaderProps } from "@FgTypes/leftTypes";

export default function RecHeader({
  lightness,
  togglePaneHeight,
}: RecHeaderProps) {
  /* 
    Description:   
      Acts as a divider in the LeftVerticalSplitPane. Basic set up of a recommendations header.
    Unique Properties:
      Changes lightness based on its height on the page but that logic is handled in 
      LeftVerticalSplitPane and passed in with the correct value.
  */

  return (
    <div
      id="recHeader"
      className="h-9 flex items-center drop-shadow-md"
      style={{ backgroundColor: `hsl(21, 92%, ${lightness}%)` }}
    >
      <div className="grow flex items-center justify-start ml-5 text-xl text-white pt-1">
        <p>Recommendations...</p>
      </div>
      <div className="flex items-center mr-5">
        <div
          className="flex items-center h-5 cursor-pointer"
          onClick={togglePaneHeight}
        >
          <button className="bg-fg-black-25 h-2 w-10 rounded"></button>
        </div>
      </div>
    </div>
  );
}
