import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { Sheet } from "@FgTypes/rightTypes";
import { PapersCard } from "./PapersCard";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function Papers() {
  /* 
    Description:   
      Gets issues data from a database then extracts the id, title, and issueQuestions to be mapped
      into cards.
    Unique Properties:
      It queries for any affiliate responses.
  */

  const [papers, setPapers] = useState<Sheet[]>([]);

  useEffect(() => {
    const fetchPaperData = async () => {
      try {
        const response = await Axios.get(`${serverUrl}/sheets`);
        setPapers(response.data);
      } catch (error) {
        console.error("Error fetching paper data:", error);
      }
    };

    fetchPaperData();
  }, []);

  const newsCards = papers.map((paperInfo) => {
    return (
      <PapersCard
        key={paperInfo.sheet_id}
        paper_id={paperInfo.sheet_id}
        title={paperInfo.sheet_title}
        subject={paperInfo.sheet_subject}
      />
    );
  });

  return (
    <div id="newsCards" className="h-full">
      {newsCards}
    </div>
  );
}
