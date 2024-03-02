import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { Sheet } from "@FgTypes/rightTypes";
import { NewsCard } from "./RightSpaceCards";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function NewsCards() {
  /* 
    Description:   
      Gets issues data from a database then extracts the id, title, and issueQuestions to be mapped
      into cards.
    Unique Properties:
      It queries for any affiliate responses.
  */

  const [sheets, setSheets] = useState<Sheet[]>([]);

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response = await Axios.get(`${serverUrl}/sheets`);
        setSheets(response.data);
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      }
    };

    fetchSheetData();
  }, []);

  const newsCards = sheets.map((issueInfo) => {
    return (
      <NewsCard
        key={issueInfo.sheet_id}
        sheet_id={issueInfo.sheet_id}
        title={issueInfo.sheet_title}
        subject={issueInfo.sheet_subject}
      />
    ); //affResponses={issueInfo.affResponses} />
  });

  return (
    <div id="newsCards" className="h-full mr-3 overflow-scroll">
      {newsCards}
    </div>
  );
}
