import { TablesLiveProps } from "@FgTypes/middleTypes";
import React from "react";

export default function TablesLive({
  sizeLocationRotation,
  videoRef,
}: TablesLiveProps) {
  return (
    <div
      className="absolute"
      style={{
        width: `${sizeLocationRotation.w}%`,
        height: `${sizeLocationRotation.h}%`,
        left: `${sizeLocationRotation.x}%`,
        top: `${sizeLocationRotation.y}%`,
        transform: `rotate(${sizeLocationRotation.r}deg)`,
      }}
    >
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
}
