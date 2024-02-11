import React, { useRef } from "react";
import "./leftSpace.css";
import LeftVerticalSplitPane from "./LeftVerticalSplitPane";
import LeftNav from "./LeftNav";

export default function LeftSpace() {
  /* 
    Description:   
      Container for everything that happens in the left space section including 
      LeftNav and LeftVerticalSplitPane.
    Unique Properties:
      N/A
  */

  const leftSpaceContentContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="bg-fg-white-95 rounded-xl overflow-hidden h-4/5"
      style={{
        width: "24.5%",
        minWidth: "24.5%",
        maxWidth: "24.5%",
        boxShadow:
          "0px 8px 8px -4px rgba(0, 0, 0, 0.1), 0 6px 6px -4px rgba(0, 0, 0, 0.06)",
      }}
    >
      <LeftNav />
      <div
        ref={leftSpaceContentContainerRef}
        style={{ height: `calc(100% - 3rem)` }}
      >
        <LeftVerticalSplitPane
          leftSpaceContentContainerRef={leftSpaceContentContainerRef}
        />
      </div>
    </div>
  );
}
