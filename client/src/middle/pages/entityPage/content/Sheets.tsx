import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { io, Socket } from "socket.io-client";
import config from "@config";
import { SheetsProps, SheetData } from "@FgTypes/middleTypes";
import { Sheet } from "./Cards";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function Sheets({ entity_id, isEditablePage }: SheetsProps) {
  /* 
    Description:   
      Queries the database to get the sheets that the passed in entity is related 
      to then sends the appropriate data to the Sheet card component.
    Unique Properties:
      N/A
  */

  const [sheetsData, setSheetsData] = useState<SheetData[]>([]);
  const sheetSocketRef = useRef<Socket | null>(null);

  // Connect socket
  useEffect(() => {
    const socket = io as any;
    sheetSocketRef.current = socket.connect(serverUrl);

    return () => {
      sheetSocketRef.current?.disconnect();
    };
  }, []);

  // Sorts the sheet data first by whether it is pinned or not then sorts by either the date_pinned or the date_added
  const sortData = (data: SheetData[]) => {
    const pinnedRows = data.filter((item) => item.pinned === true);
    const notPinnedRows = data.filter((item) => item.pinned === false);

    const parseDate = (dateString: string | null) =>
      dateString
        ? new Date(dateString).getTime()
        : new Date("2000-01-01T01:01:01.000Z").getTime();

    pinnedRows.sort(
      (a, b) => parseDate(b.date_pinned) - parseDate(a.date_pinned),
    );
    notPinnedRows.sort(
      (a, b) => parseDate(b.date_added) - parseDate(a.date_added),
    );

    return [...pinnedRows, ...notPinnedRows];
  };

  // Gets sheet data and connects to socket
  useEffect(() => {
    // Connects to the socket to get the new data when pinned is updated
    sheetSocketRef.current?.on(
      "pinnedUpdated",
      ({ relation_id, pinned, date_pinned }) => {
        setSheetsData((prevData) => {
          const updatedData = prevData.map((sheet) => {
            if (sheet.entities_content_id === relation_id) {
              return {
                ...sheet,
                pinned: pinned,
                date_pinned: date_pinned,
              };
            }
            return sheet;
          });

          const sortedData = sortData(updatedData);

          return sortedData;
        });
      },
    );

    // Gets original sheet data
    const fetchSheetsData = async () => {
      try {
        const response = await Axios.get(
          `${serverUrl}/entities/entity_sheets/${entity_id}`,
        );

        setSheetsData(sortData(response.data));
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchSheetsData();
  }, [entity_id]);

  const sheets = sheetsData.map((sheet) => {
    return (
      <Sheet
        key={`sheet_${sheet.sheet_id}`}
        type={"entity"}
        sheet_id={sheet.sheet_id}
        author_id={entity_id}
        pinned={sheet.pinned}
        relation_id={sheet.entities_content_id}
        socket={sheetSocketRef.current}
        isEditablePage={isEditablePage}
      />
    );
  });

  return <div className="mt-4 grid grid-cols-3 gap-6">{sheets}</div>;
}
