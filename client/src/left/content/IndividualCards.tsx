import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { IndividualCard } from "./LeftSpaceCards";
import { Individual } from "@FgTypes/leftTypes";
import { useAffiliateContext } from "../../middle/pages/entityPage/header/AffiliateContext";

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
  const { affiliateRelation } = useAffiliateContext();
  const [individuals, setIndividuals] = useState<Individual[]>([]);

  useEffect(() => {
    const fetchNewRelationData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found in local storage");
          return;
        }

        const response = await Axios.get(
          `${serverUrl}/individuals/${affiliateRelation.affiliate_id_target}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setIndividuals((prev) => [response.data, ...prev]);
      } catch (error) {
        console.error("Error fetching individual data:", error);
      }
    };

    if (
      affiliateRelation?.entity_type === 1 &&
      affiliateRelation?.action === "newRelation"
    ) {
      fetchNewRelationData();
    } else if (
      affiliateRelation?.entity_type === 1 &&
      affiliateRelation?.action === "deletedRelation"
    ) {
      const newIndividuals = individuals.filter(
        (individual) =>
          individual.individual_id !== affiliateRelation.affiliate_id_target,
      );

      setIndividuals(newIndividuals);
    }
  }, [affiliateRelation]);

  const sortData = (data: any) => {
    const parseDate = (dateString: string | null) =>
      dateString
        ? new Date(dateString).getTime()
        : new Date("2000-01-01T01:01:01.000Z").getTime();

    data.sort(
      (a: any, b: any) =>
        parseDate(b.affiliate_relation_date) -
        parseDate(a.affiliate_relation_date),
    );

    return [...data];
  };

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

        setIndividuals(sortData(response.data));
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
