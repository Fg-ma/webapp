import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { CoverSheet, RelatedIssuesCardProps } from "@FgTypes/middleTypes";
const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function RelatedIssues() {
  /* 
    Description:   
      Gets related issues data from a data base then extracts the id and title to be mapped
      into cards.
    Unique Properties:
      It queries for any affiliates responses to the related issue.
  */

  const [coverSheets, setCoverSheets] = useState<CoverSheet[]>([]);

  useEffect(() => {
    const fetchCoverSheetData = async () => {
      try {
        const response = await Axios.get(`${serverUrl}/sheets`);
        setCoverSheets(response.data);
      } catch (error) {
        console.error("Error fetching cover sheet data:", error);
      }
    };

    fetchCoverSheetData();
  }, []);

  const relIssues = coverSheets.map((relIssuesInfo) => {
    return (
      <RelatedIssuesCard
        key={relIssuesInfo.sheet_id}
        title={relIssuesInfo.sheet_title}
        affResponses="placeholder"
      />
    );
  });

  return (
    <div id="individualRecs" className="h-full">
      {relIssues}
    </div>
  );
}

function RelatedIssuesCard({
  title,
  affResponses = null,
}: RelatedIssuesCardProps) {
  return (
    <div className="bg-white w-fill my-4 ml-9 h-24 flex items-center rounded-md">
      <div className="w-16 aspect-square overflow-clip bg-fg-white-85 ml-3 rounded-sm grid place-items-center">
        <p>pic</p>
      </div>
      <div className="m-5 w-full truncate">
        <p className="font-Josefin text-xl font- truncate">{title}</p>
        <p className="font-K2D text-sm text-fg-black-30 truncate">
          Affiliates' responses: {affResponses}
        </p>
      </div>
    </div>
  );
}
