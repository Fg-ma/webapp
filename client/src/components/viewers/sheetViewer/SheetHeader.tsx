import React, { useRef } from "react";
import SheetActionSection from "./SheetActionSection";

interface SheetHeaderProps {
  sheet_id: string;
  sheetData: {
    sheet_title: string;
    sheet_subject: string;
    entity_type: number;
    sheet_author: any;
    sheet_url: string;
  };
}

export default function SheetHeader({ sheet_id, sheetData }: SheetHeaderProps) {
  let authorElement = null;

  if (sheetData.sheet_author) {
    if (sheetData.entity_type === 1) {
      authorElement = (
        <p className="text-2xl mb-2">
          {sheetData.sheet_author.individual_name}
        </p>
      );
    } else if (sheetData.entity_type === 2) {
      authorElement = (
        <p className="text-2xl mb-2">{sheetData.sheet_author.group_name}</p>
      );
    } else if (sheetData.entity_type === 3) {
      authorElement = (
        <p className="text-2xl mb-2">
          {sheetData.sheet_author.organization_name}
        </p>
      );
    }
  }

  return (
    <div className="bg-fg-white-90 mb-24 rounded-md shadow relative">
      <div className="w-full h-full px-4 pt-4 pb-6 flex flex-col items-center justify-center">
        {sheetData.sheet_title && (
          <p className="text-4xl font-bold mb-3 text-center line-clamp-2">
            {sheetData.sheet_title}
          </p>
        )}
        {sheetData.sheet_subject && (
          <p
            className="text-xl font-K2D text-center mx-6 line-clamp-2 text-ellipsis h-fit mb-2"
            style={{ width: `calc(100% - 3rem)` }}
          >
            {sheetData.sheet_subject}
          </p>
        )}
        {sheetData.sheet_author && authorElement}
        <div className="h-0.5 w-11/12 rounded-full bg-fg-white-75 mb-8"></div>
        <div className="bg-fg-white-85 h-14 w-full rounded space-x-6 flex items-center justify-start pl-6 mb-8">
          <button className="relative max-w-48 h-8 bg-fg-white-75 font-bold rounded-full px-4 pt-1">
            <span className="block w-full max-w-full truncate">
              Click mennn
            </span>
            <svg
              className="absolute -bottom-3.25 -left-3.25 w-8 h-8 rotate-225 fill-fg-white-75"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M152-160q-23 0-35-20.5t1-40.5l328-525q12-19 34-19t34 19l328 525q13 20 1 40.5T808-160H152Z" />
            </svg>
          </button>
          <button className="relative max-w-48 h-8 bg-fg-white-75 font-bold rounded-full px-4 pt-1">
            <span className="block w-full max-w-full truncate">
              Click mennn
            </span>
            <svg
              className="absolute -bottom-3.25 -left-3.25 w-8 h-8 rotate-225 fill-fg-white-75"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M152-160q-23 0-35-20.5t1-40.5l328-525q12-19 34-19t34 19l328 525q13 20 1 40.5T808-160H152Z" />
            </svg>
          </button>
          <button className="relative max-w-48 h-8 bg-fg-white-75 font-bold rounded-full px-4 pt-1">
            <span className="block w-full max-w-full truncate">
              Click mennn
            </span>
            <svg
              className="absolute -bottom-3.25 -left-3.25 w-8 h-8 rotate-225 fill-fg-white-75"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M152-160q-23 0-35-20.5t1-40.5l328-525q12-19 34-19t34 19l328 525q13 20 1 40.5T808-160H152Z" />
            </svg>
          </button>
          <button className="relative max-w-48 h-8 bg-fg-white-75 font-bold rounded-full px-4 pt-1">
            <span className="block w-full max-w-full truncate">
              Click mennn
            </span>
            <svg
              className="absolute -bottom-3.25 -left-3.25 w-8 h-8 rotate-225 fill-fg-white-75"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M152-160q-23 0-35-20.5t1-40.5l328-525q12-19 34-19t34 19l328 525q13 20 1 40.5T808-160H152Z" />
            </svg>
          </button>
        </div>
        <p className="text-base font-K2D pb-1">Views: 67K X 1 Hour Ago</p>
        <p className="text-base font-K2D">Views: 67K X 1 Hour Ago</p>
      </div>
      <SheetActionSection sheet_id={sheet_id} />
    </div>
  );
}
