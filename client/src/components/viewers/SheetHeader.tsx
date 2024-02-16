import React from "react";

interface SheetHeaderProps {
  sheetData: {
    sheet_title: string;
    sheet_subject: string;
    entity_type: number;
    sheet_author: any;
    sheet_url: string;
  };
}

export default function SheetHeader({ sheetData }: SheetHeaderProps) {
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
    <div className="bg-fg-white-90 mb-12 rounded-md shadow relative">
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
        <div className="bg-fg-white-85 h-14 w-full rounded space-x-6 flex items-center justify-start pl-6 mb-6">
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
        <p className="text-base font-K2D">Views: 67K X 1 Hour Ago</p>
      </div>
      <div className="bg-fg-white-85 w-5/6 h-12 absolute left-1/2 -translate-x-1/2 -translate-y-5 shadow-lg flex items-center justify-center space-x-2 font-K2D text-sm rounded-md">
        <button className="bg-fg-white-75 h-7 aspect-square rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
          >
            <path d="M840-640q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14H280v-520l240-238q15-15 35.5-17.5T595-888q19 10 28 28t4 37l-45 183h258Zm-480 34v406h360l120-280v-80H480l54-220-174 174ZM160-120q-33 0-56.5-23.5T80-200v-360q0-33 23.5-56.5T160-640h120v80H160v360h120v80H160Zm200-80v-406 406Z" />
          </svg>
        </button>
        <button className="bg-fg-white-75 h-7 aspect-square rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
          >
            <path d="M120-320q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14h440v520L440-82q-15 15-35.5 17.5T365-72q-19-10-28-28t-4-37l45-183H120Zm480-34v-406H240L120-480v80h360l-54 220 174-174Zm200-486q33 0 56.5 23.5T880-760v360q0 33-23.5 56.5T800-320H680v-80h120v-360H680v-80h120Zm-200 80v406-406Z" />
          </svg>
        </button>
        <button className="bg-fg-white-75 h-7 rounded-full px-3 flex items-center justify-center">
          <svg
            className="mr-1"
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
          >
            <path d="M280-400h400q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480H280q-17 0-28.5 11.5T240-440q0 17 11.5 28.5T280-400Zm0-120h400q17 0 28.5-11.5T720-560q0-17-11.5-28.5T680-600H280q-17 0-28.5 11.5T240-560q0 17 11.5 28.5T280-520Zm0-120h400q17 0 28.5-11.5T720-680q0-17-11.5-28.5T680-720H280q-17 0-28.5 11.5T240-680q0 17 11.5 28.5T280-640ZM160-240q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v623q0 27-24.5 37.5T812-148l-92-92H160Zm594-80 46 45v-525H160v480h594Zm-594 0v-480 480Z" />
          </svg>
          Comment
        </button>
        <button className="bg-fg-white-75 h-7 rounded-full px-3 flex items-center justify-center">
          <svg
            className="mr-1"
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
          >
            <path d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z" />
          </svg>
          Share
        </button>
        <button className="bg-fg-white-75 h-7 rounded-full px-3 flex items-center justify-center">
          <svg
            className="mr-1"
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
          >
            <path d="M280-240q-17 0-28.5-11.5T240-280v-80h520v-360h80q17 0 28.5 11.5T880-680v503q0 27-24.5 37.5T812-148l-92-92H280Zm-40-200-92 92q-19 19-43.5 8.5T80-377v-463q0-17 11.5-28.5T120-880h520q17 0 28.5 11.5T680-840v360q0 17-11.5 28.5T640-440H240Zm360-80v-280H160v280h440Zm-440 0v-280 280Z" />
          </svg>
          Start forum
        </button>
        <button className="bg-fg-white-75 h-7 rounded-full px-3 flex items-center justify-center">
          <svg
            className="mr-1"
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
          >
            <path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
          </svg>
          Add to collection
        </button>
      </div>
    </div>
  );
}
