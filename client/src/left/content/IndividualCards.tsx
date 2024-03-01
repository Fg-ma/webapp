import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import config from "@config";
import { IndividualCard } from "./LeftSpaceCards";
import { Individual } from "@FgTypes/leftTypes";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function IndividualCards() {
  /* 
    Description:   
      Gets individual data from a database then extracts the id, name, and currentIssue to be mapped
      into cards.
    Unique Properties:
      N/A
  */

  const [individuals, setIndividuals] = useState<Individual[]>([]);

  useEffect(() => {
    const fetchIndividualData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found in local storage");
          return;
        }

        const response = await Axios.get(
          `${serverUrl}/affiliateRelations/get_affiliated_individuals`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setIndividuals(response.data);
      } catch (error) {
        console.error("Error fetching individual data:", error);
      }
    };

    fetchIndividualData();
  }, []);

  const indCards = individuals.map((indInfo) => {
    return (
      <IndividualCard
        key={indInfo.individual_id}
        id={indInfo.individual_id}
        name={indInfo.individual_name}
        currentIssue={indInfo.individual_currentIssue}
      />
    );
  });

  return (
    <div id="individualCards" className="h-full mr-3 overflow-scroll">
      {indCards}
    </div>
  );
}
