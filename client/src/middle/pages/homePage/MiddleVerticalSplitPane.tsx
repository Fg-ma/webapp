import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { MiddleVerticalSplitPaneProps } from "@FgTypes/middleTypes";
import RelatedIssuesHeader from "../../content/RelatedIssuesHeader";
import RelatedIssues from "../../content/RelatedIssues";
import SheetViewer from "@components/viewers/sheetViewer/SheetViewer";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function MiddleVerticalSplitPane({
  middleSpaceContentContainerRef,
}: MiddleVerticalSplitPaneProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState(0);
  const [initialPaneHeight, setInitialPaneHeight] = useState(0);
  const [paneHeight, setPaneHeight] = useState("79%");
  const [headerLightness, setHeaderLightness] = useState(80);

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
        middleSpaceContentContainerRef.current?.offsetHeight;

      if (!containerHeight) {
        return;
      }

      const mouseYDelta = clientY - initialMousePosition;

      // Adjust the speed by fiddling with the sensitivity factor
      const sensitivityFactor = 1;
      let newPaneHeight =
        initialPaneHeight +
        (mouseYDelta / containerHeight) * 100 * sensitivityFactor;

      // Cap the newPaneHeight to a max and min value
      const maxPaneHeight = 100;
      newPaneHeight = Math.min(newPaneHeight, maxPaneHeight);

      const minPaneHeight = 15;
      newPaneHeight = Math.max(newPaneHeight, minPaneHeight);

      setPaneHeight(`${newPaneHeight}%`);
      setHeaderLightness(getLightness(newPaneHeight));
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
    requestAnimationFrame(() => handleMove(event.clientY));
  };

  const handleTouchMove = (event: TouchEvent) => {
    requestAnimationFrame(() => handleMove(event.touches[0].clientY));
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

  useEffect(() => {
    const initialHeight = parseFloat(paneHeight) || 0;

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

  const fileToBlobFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      Axios.put(`${serverUrl}/videos_updating`, formData, {
        headers: {
          "Content-Type": "image/png",
        },
      })
        .then((response) => {})
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  return (
    <div className="flex flex-col w-full h-full relative">
      <div
        className="h-5 absolute top-0 left-0 right-0 mx-8 z-40"
        style={{
          background: `linear-gradient(to bottom, rgba(243, 243, 243, 1) 0%, rgba(243, 243, 243, 0) 100%)`,
          filter: "blur(4px)",
          width: `calc(100% - 4rem)`,
        }}
      ></div>
      <div
        className="overflow-auto box-border"
        style={{ height: paneHeight, scrollbarGutter: "stable" }}
      >
        <div className="ml-8 my-8">
          <SheetViewer sheet_id="1065caad-caee-11ee-83a1-00ff8797c34e" />
          <input type="file" onChange={fileToBlobFunc} />
        </div>
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
        <RelatedIssuesHeader
          lightness={headerLightness}
          togglePaneHeight={togglePaneHeight}
        />
      </div>
      <div
        className="overflow-auto box-border bg-fg-white-95"
        style={{
          height: `calc(100% - ${paneHeight} - 2.25rem)`,
          scrollbarGutter: "stable",
        }}
      >
        <RelatedIssues />
      </div>
      <div
        className="h-3 absolute bottom-0 left-0 right-0 mx-8 z-40"
        style={{
          background: `linear-gradient(to top, rgba(243, 243, 243, 1) 0%, rgba(243, 243, 243, 0.35) 50%, rgba(243, 243, 243, 0) 100%)`,
          filter: "blur(4px)",
          width: `calc(100% - 4rem)`,
        }}
      ></div>
    </div>
  );
}
