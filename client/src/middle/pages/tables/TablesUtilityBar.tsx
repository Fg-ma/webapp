import React, { useState } from "react";
import io from "socket.io-client";
import config from "@config";
import TablesTextField from "./TablesTextField";
import ProfilePicture from "@components/profilePicture/ProfilePicture";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function TablesUtilityBar({
  table_id,
  tables_pictures_id,
}: {
  table_id: string;
  tables_pictures_id: string | undefined | null;
}) {
  const tableSocket = io(serverUrl, {
    path: "/table-socket",
  });
  const [isUtilities, setIsUtilities] = useState(false);

  const handleClick = () => {
    setIsUtilities((prev) => !prev);
  };

  return (
    <div className="w-full grow flex flex-row space-x-8 pl-24 pr-36 items-center justify-center">
      <div className="bg-fg-white-95 h-16 aspect-square rounded-xl flex items-center justify-center">
        {tables_pictures_id && (
          <ProfilePicture
            key={tables_pictures_id}
            size={{ w: 3.25, h: 3.25 }}
            entity_type={2}
            styles="rounded-md"
            tables_pictures_id={tables_pictures_id}
          />
        )}
      </div>
      <TablesTextField table_id={table_id} tableSocket={tableSocket} />
      {!isUtilities && (
        <div className="bg-fg-white-95 h-16 w-max rounded-xl flex items-center justify-center p-2.5">
          <div
            className="bg-fg-white-90 h-11 aspect-square rounded-xl flex items-center justify-center"
            onClick={handleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              viewBox="0 -960 960 960"
              width="40"
            >
              <path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
            </svg>
          </div>
        </div>
      )}
      {isUtilities && (
        <div className="bg-fg-white-95 h-16 w-max rounded-xl flex items-center justify-center py-2.5 px-5 space-x-4">
          <div
            className="bg-fg-white-90 h-11 aspect-square rounded-xl flex items-center justify-center"
            onClick={handleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              viewBox="0 -960 960 960"
              width="40"
            >
              <path d="M240-440q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h480q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H240Z" />
            </svg>
          </div>
          <div
            className="bg-fg-white-90 h-11 aspect-square rounded-xl flex items-center justify-center"
            onClick={handleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              viewBox="0 -960 960 960"
              width="32"
            >
              <path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l50-54q11-12 26.5-19t32.5-7h170q17 0 32.5 7t26.5 19l50 54h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z" />
            </svg>
          </div>
          <div
            className="bg-fg-white-90 h-11 aspect-square rounded-xl flex items-center justify-center"
            onClick={handleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              viewBox="0 -960 960 960"
              width="32"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0 0v-560 560Zm80-80h400q12 0 18-11t-2-21L586-459q-6-8-16-8t-16 8L450-320l-74-99q-6-8-16-8t-16 8l-80 107q-8 10-2 21t18 11Z" />
            </svg>
          </div>
          <div
            className="bg-fg-white-90 h-11 aspect-square rounded-xl flex items-center justify-center"
            onClick={handleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              viewBox="0 -960 960 960"
              width="32"
            >
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l126-126q10-10 22-5t12 19v344q0 14-12 19t-22-5L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" />
            </svg>
          </div>
          <div
            className="bg-fg-white-90 h-11 aspect-square rounded-xl flex items-center justify-center"
            onClick={handleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              viewBox="0 -960 960 960"
              width="32"
            >
              <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 480v-83q-92-13-157.5-78T203-479q-2-17 9-29t28-12q17 0 28.5 11.5T284-480q14 70 69.5 115T480-320q72 0 127-45.5T676-480q4-17 15.5-28.5T720-520q17 0 28 12t9 29q-14 91-79 157t-158 79v83q0 17-11.5 28.5T480-120q-17 0-28.5-11.5T440-160Zm40-320q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
