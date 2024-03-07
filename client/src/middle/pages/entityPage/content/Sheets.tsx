import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { SheetsProps, SheetData } from "@FgTypes/middleTypes";
import { Sheet } from "./Cards";
import { usePinned } from "@context/PinnedContext";

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

  const { pinnedState } = usePinned();
  const [sheetsData, setSheetsData] = useState<SheetData[]>([]);

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

  // Gets sheet data
  useEffect(() => {
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

  // Handle when a sheet is pinned
  useEffect(() => {
    const fetchNewPinnedData = async (filteredSheetData: SheetData[]) => {
      try {
        const response = await Axios.get(
          `${serverUrl}/entities/entity_sheet_by_entities_content_id/${pinnedState.relation_id}`,
        );

        if (response.data.pinned === true) {
          setSheetsData([response.data, ...filteredSheetData]);
        } else if (response.data.pinned === false) {
          setSheetsData(sortData([response.data, ...filteredSheetData]));
        }
      } catch (error) {
        console.error("Error fetching individual data:", error);
      }
    };

    if (pinnedState.type === "sheet" && pinnedState.relation_id) {
      const filteredSheetData = sheetsData.filter(
        (sheet) => sheet.entities_content_id !== pinnedState.relation_id,
      );

      fetchNewPinnedData(filteredSheetData);
    }
  }, [pinnedState]);

  const sheets = sheetsData.map((sheet) => {
    return (
      <Sheet
        key={`sheet_${sheet.sheet_id}`}
        type={"entity"}
        sheet_id={sheet.sheet_id}
        author_id={entity_id}
        pinned={sheet.pinned}
        relation_id={sheet.entities_content_id}
        isEditablePage={isEditablePage}
      />
    );
  });

  return <div className="mt-4 grid grid-cols-3 gap-6">{sheets}</div>;
}
