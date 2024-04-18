import React from "react";
import TablesUtilityBar from "./TablesUtilityBar";

export default function Tables() {
  return (
    <div className="w-full h-full flex flex-col">
      <div
        className="overflow-hidden w-full flex flex-col items-center justify-center space-y-4 pr-12"
        style={{ height: "85%" }}
      >
        <div className="flex flex-row w-full px-36 justify-between">
          <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
          <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
          <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
          <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
          <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
          <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
        </div>
        <div className="w-full flex flex-row items-center justify-center grow space-x-4">
          <div className="flex flex-col h-full py-12 justify-between">
            <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
            <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
            <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
          </div>
          <div className="bg-fg-white-95 w-full h-full rounded-3xl"></div>
          <div className="flex flex-col h-full py-12 justify-between">
            <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
            <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
            <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
          </div>
        </div>
        <div className="flex flex-row w-full px-36 justify-between">
          <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
          <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
          <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
          <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
          <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
          <div className="bg-fg-white-95 w-20 aspect-square rounded-full"></div>
        </div>
      </div>
      <TablesUtilityBar />
    </div>
  );
}
