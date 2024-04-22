import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { IndividualCard } from "./IndividualCard";
import { Individual } from "@FgTypes/leftTypes";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function IndividualRecs() {
  /* 
    Description:   
      Gets individual data from a database then extracts the id, name, and current_issue to be mapped
      into cards.
    Unique Properties:
      N/A
  */

  const [individuals, setIndividuals] = useState<Individual[]>([]);

  useEffect(() => {
    const fetchIndividualData = async () => {
      try {
        const response = await Axios.get(`${serverUrl}/individuals`);
        setIndividuals(response.data);
      } catch (error) {
        console.error("Error fetching individual data:", error);
      }
    };

    fetchIndividualData();
  }, []);

  const indRecs = individuals.map((indInfo) => {
    return (
      <IndividualCard
        key={indInfo.individual_username}
        name={indInfo.individual_name}
        username={indInfo.individual_username}
        current_issue={indInfo.individual_current_issue}
      />
    );
  });

  return (
    <div className="h-max my-4 ml-9 flex flex-col space-y-4">{indRecs}</div>
  );
}
