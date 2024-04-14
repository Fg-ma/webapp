import React from "react";
import { RecipientsBubblesProps } from "@FgTypes/middleTypes";

export default function RecipientsBubbles({
  message,
  conversationSize,
  sender,
}: RecipientsBubblesProps) {
  let messageLines: string[] = [];
  let result = [];
  let consecutiveEmptyCount = 0;

  if (message && message !== " typing") {
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
    <div className="w-full h-max flex flex-col items-start justify-center pt-5">
      <div className="font-K2D text-lg relative max-w-md w-max h-max bg-fg-white-90 font-bold rounded-3xl px-5 py-2 ml-4">
        {message !== "typing" ? (
          <span className="block w-full max-w-full flex-wrap z-20 relative">
            {result.map((line, index) => (
              <span
                key={index}
                className="block w-full max-w-full flex-wrap z-20 relative break-words"
              >
                {line === "" ? <br /> : line}
              </span>
            ))}
          </span>
        ) : (
          <span className="w-full max-w-full flex-wrap z-20 relative py-2 flex flex-row space-x-2">
            <div className="w-3 aspect-square bg-fg-white-75 rounded-full"></div>
            <div className="w-3 aspect-square bg-fg-white-75 rounded-full"></div>
            <div className="w-3 aspect-square bg-fg-white-75 rounded-full"></div>
          </span>
        )}
        <svg
          className="absolute -bottom-4.5 -left-4 w-10 h-10 rotate-220 fill-fg-white-90 z-10"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M152-160q-23 0-35-20.5t1-40.5l328-525q12-19 34-19t34 19l328 525q13 20 1 40.5T808-160H152Z" />
        </svg>
      </div>
      {conversationSize > 2 && (
        <div className="font-K2D text-sm text-fg-black-40 mt-2 ml-4">
          {sender}
        </div>
      )}
    </div>
  );
}
