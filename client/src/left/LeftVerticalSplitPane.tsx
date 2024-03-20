import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import RecHeader from "./content/RecHeader";
import IndividualCards from "./content/IndividualCards";
import GroupCards from "./content/GroupCards";
import OrganizationCards from "./content/OrganizationCards";
import IndividualRecs from "./content/IndividualRecs";
import GroupRecs from "./content/GroupRecs";
import OrganizationRecs from "./content/OrganizationRecs";
import { LeftState, LeftVerticalSplitPaneProps } from "@FgTypes/leftTypes";

export default function LeftVerticalSplitPane({
  leftSpaceContentContainerRef,
}: LeftVerticalSplitPaneProps) {
  /*
    Description:   
      Creates 3 panes of which the top and bottom are used to display context
      (individuals/groups/organizations and recommendations respectively).
      The middle panel is a dragable panel that resizes the top and bottom panes,
      importantly this middle pane can be any div(the contents of which dont matter).
    Unique Properties:
      Depending on the height that the middle pane is dragged to the bg-color changes
      from regular lightness fg-primary at the bottom to a lighter fg-primary at the top.
  */

  const leftPage = useSelector(
    (state: LeftState) => state.page.left.pagePayload.pageState,
  );
  const [isResizing, setIsResizing] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState(0);
  const [initialPaneHeight, setInitialPaneHeight] = useState(0);
  const [paneHeight, setPaneHeight] = useState("60%");
  const [headerLightness, setHeaderLightness] = useState(80);
  const leftBottomPaneRef = useRef<HTMLDivElement>(null);

  // Handles softly lowering and raising the pane height when togglePaneHeight is called
  const animateTogglePaneHeight = (targetHeight: number, duration = 500) => {
    const start = Date.now();
    const initialHeight = parseFloat(paneHeight) || 0;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min(1, (now - start) / duration);

      const easedProgress = 0.5 - Math.cos(progress * Math.PI) / 2;

      const newPaneHeight =
        initialHeight + (targetHeight - initialHeight) * easedProgress;

      setPaneHeight(`${newPaneHeight}%`);
      setHeaderLightness(getLightness(newPaneHeight));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleMove = (clientY: number) => {
    if (isResizing) {
      const containerHeight =
        leftSpaceContentContainerRef.current?.offsetHeight;

      if (!containerHeight) {
        return;
      }

      const mouseYDelta = clientY - initialMousePosition;

      // Adjust the speed by fiddling with the sensitivity factor
      const sensitivityFactor = 1;
      let newPaneHeight =
        initialPaneHeight +
        (mouseYDelta / containerHeight) * 100 * sensitivityFactor;

      // Cap the newPaneHeight to a maximum value
      const maxPaneHeight = 100;
      newPaneHeight = Math.min(newPaneHeight, maxPaneHeight);

      const minPaneHeight = 15;
      newPaneHeight = Math.max(newPaneHeight, minPaneHeight);

      // Calculate lightness based on the percentage of newPaneHeight
      let lightness = getLightness(newPaneHeight);

      setPaneHeight(`${newPaneHeight}%`);
      setHeaderLightness(lightness);
    }
  };

  const handleEnd = () => {
    setIsResizing(false);
  };

  const handleStart = (clientY: number) => {
    setIsResizing(true);
    setInitialMousePosition(clientY);
    setInitialPaneHeight(parseFloat(paneHeight) || 0);
  };

  const handleMouseMove = (event: MouseEvent) => {
    handleMove(event.clientY);
  };

  const handleTouchMove = (event: TouchEvent) => {
    handleMove(event.touches[0].clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Handles resizing event listeners
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isResizing]);

  // Gets initial conditions
  useEffect(() => {
    // Get the initial height of the leftPane when the component mounts
    const initialHeight = parseFloat(paneHeight) || 0;

    // Set the initial lightness based on the initial height
    let initialLightness = getLightness(initialHeight);

    setHeaderLightness(initialLightness);
  }, []);

  // Controls the toggle pane height controlled by the button in RelatedIssuesHeader
  const togglePaneHeight = () => {
    const newHeight = parseFloat(paneHeight) < 100 ? "100%" : "79%";
    animateTogglePaneHeight(parseFloat(newHeight));
  };

  const getLightness = (height: number) => {
    let lightness = Math.max(52, 100 - height * 0.75);
    lightness = Math.min(60, lightness);
    return lightness;
  };

  const renderContent = () => {
    switch (leftPage) {
      case "individuals":
        return <IndividualCards />;
      case "groups":
        return <GroupCards />;
      case "organizations":
        return <OrganizationCards />;
      default:
        return <IndividualCards />;
    }
  };

  const renderRecs = () => {
    switch (leftPage) {
      case "individuals":
        return <IndividualRecs />;
      case "groups":
        return <GroupRecs />;
      case "organizations":
        return <OrganizationRecs />;
      default:
        return <IndividualRecs />;
    }
  };

  return (
    <div className="flex flex-col relative w-full h-full">
      <div
        className="overflow-auto box-border"
        style={{ height: paneHeight, scrollbarGutter: "stable" }}
      >
        {renderContent()}
      </div>
      <div
        className="cursor-ns-resize select-none"
        onMouseDown={(e) => {
          handleStart(e.clientY);
        }}
        onTouchStart={(e) => {
          handleStart(e.touches[0].clientY);
        }}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
      >
        <RecHeader
          lightness={headerLightness}
          togglePaneHeight={togglePaneHeight}
        />
      </div>
      <div
        ref={leftBottomPaneRef}
        className="bg-fg-white-95 overflow-auto box-border"
        style={{ height: `calc(100% - ${paneHeight} - 2.25rem)` }}
      >
        {renderRecs()}
      </div>
      {leftBottomPaneRef.current &&
        leftBottomPaneRef.current.clientHeight >= 15 && (
          <div
            className="h-3 absolute bottom-0 left-0 right-0 mx-8 z-40"
            style={{
              background: `linear-gradient(to top, rgba(243, 243, 243, 1) 0%, rgba(243, 243, 243, 0.35) 50%, rgba(243, 243, 243, 0) 100%)`,
              filter: "blur(4px)",
              width: `calc(100% - 4rem)`,
            }}
          ></div>
        )}
    </div>
  );
}
