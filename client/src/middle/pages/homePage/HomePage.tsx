import React, { useRef } from "react";
import { HomePageProps } from "@FgTypes/middleTypes";
import MiddleVerticalSplitPane from "./MiddleVerticalSplitPane";
import MiddleDrop from "../../search/MiddleDrop";

export default function HomePage({
  middleSpaceContainerRef,
  middleSpaceRef,
}: HomePageProps) {
  const middleSpaceContentContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-full">
      <div className="absolute inset-0 left-1/2 transform -translate-x-1/2 z-10 -top-6 h-fit">
        <MiddleDrop
          middleSpaceContainerRef={middleSpaceContainerRef}
          middleSpaceRef={middleSpaceRef}
        />
      </div>
      <div
        ref={middleSpaceContentContainerRef}
        className="overflow-hidden rounded-xl h-full w-full"
      >
        <MiddleVerticalSplitPane
          middleSpaceContentContainerRef={middleSpaceContentContainerRef}
        />
      </div>
    </div>
  );
}
