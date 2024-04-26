import React from "react";
import { UserBubbleProps } from "@FgTypes/middleTypes";

export default function UserBubble({ message }: UserBubbleProps) {
  let messageLines: string[] = [];
  let result = [];
  let consecutiveEmptyCount = 0;

  if (message) {
    messageLines = message.split("\n");
  }

  for (let i = 0; i < messageLines.length; i++) {
    if (messageLines[i] === "") {
      consecutiveEmptyCount++;
      if (consecutiveEmptyCount <= 1) {
        result.push(messageLines[i]);
      } else {
        consecutiveEmptyCount = 0;
      }
    } else {
      consecutiveEmptyCount = 0;
      result.push(messageLines[i]);
    }
  }

  return (
    <div className="w-full h-max flex items-center justify-end pt-5">
      <div className="font-K2D text-lg relative max-w-md w-max h-max bg-fg-primary-desaturated font-bold rounded-3xl px-5 py-2 mr-4 text-white">
        {result.map((line, index) => (
          <span
            key={index}
            className="block w-full max-w-full flex-wrap z-20 relative break-words"
          >
            {line === "" ? <br /> : line}
          </span>
        ))}
        <svg
          className="absolute -bottom-3 -right-3.5 w-10 h-10 rotate-20 fill-fg-primary-desaturated z-10"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M152-160q-23 0-35-20.5t1-40.5l328-525q12-19 34-19t34 19l328 525q13 20 1 40.5T808-160H152Z" />
        </svg>
      </div>
    </div>
  );
}
