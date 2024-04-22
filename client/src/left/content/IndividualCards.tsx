import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { IndividualCard } from "./IndividualCard";
import { Individual, IndividualCardsProps } from "@FgTypes/leftTypes";
import { useAffiliateContext } from "@context/AffiliateContext";
import { useIndexedDBContext } from "@context/IDBContext";
import { AFFILIATED_INDIVIDUALS_TABLE } from "@IDB/IDBService";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function IndividualCards({
  leftTopPaneRef,
}: IndividualCardsProps) {
  /* 
    Description:   
      Gets individual data from a database then extracts the id, name, and current_issue to be mapped
      into cards.
    Unique Properties:
      N/A
  */

  const {
    storeAffiliatedEntities,
    getStoredAffiliatedEntities,
    deleteStoredAffiliatedEntities,
  } = useIndexedDBContext();
  const { affiliateRelation, setAffiliateRelation } = useAffiliateContext();
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
          `${serverUrl}/individuals/${affiliateRelation.affiliate_username_target}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const newIndividual = { ...response.data, animate: true };

        setIndividuals((prev) => [newIndividual, ...prev]);

        const storeIndividuals = individuals.map((individual) => ({
          ...individual,
          animate: false,
        }));

        await deleteStoredAffiliatedEntities(AFFILIATED_INDIVIDUALS_TABLE);
        await storeAffiliatedEntities(AFFILIATED_INDIVIDUALS_TABLE, [
          { ...response.data },
          ...storeIndividuals,
        ]);
      } catch (error) {
        console.error("Error fetching individual data:", error);
      }
    };

    const deleteOldRelationData = async () => {
      const newIndividuals = individuals.filter(
        (individual) =>
          individual.individual_username !==
          affiliateRelation.affiliate_username_target,
      );

      setIndividuals(newIndividuals);

      await deleteStoredAffiliatedEntities(AFFILIATED_INDIVIDUALS_TABLE);
      await storeAffiliatedEntities(
        AFFILIATED_INDIVIDUALS_TABLE,
        newIndividuals,
      );
    };

    if (
      affiliateRelation?.entity_type === 1 &&
      affiliateRelation?.action === "newRelation"
    ) {
      fetchNewRelationData();

      if (leftTopPaneRef.current) {
        const scrollOptions: ScrollToOptions = {
          top: 0,
          behavior: "smooth",
        };

        leftTopPaneRef.current.scrollTo(scrollOptions);
      }

      setAffiliateRelation({
        action: "",
        affiliate_username_root: "",
        affiliate_username_target: "",
        affiliate_relation_date: "",
        affiliate_relation_id: "",
        entity_type: 0,
      });
    } else if (
      affiliateRelation?.entity_type === 1 &&
      affiliateRelation?.action === "deletedRelation"
    ) {
      deleteOldRelationData();

      setAffiliateRelation({
        action: "",
        affiliate_username_root: "",
        affiliate_username_target: "",
        affiliate_relation_date: "",
        affiliate_relation_id: "",
        entity_type: 0,
      });
    }
  }, [affiliateRelation]);

  const sortData = (data: Individual[]) => {
    const parseDate = (dateString: string | null) =>
      dateString
        ? new Date(dateString).getTime()
        : new Date("2000-01-01T01:01:01.000Z").getTime();

    data.sort(
      (a: Individual, b: Individual) =>
        parseDate(b.affiliate_relation_date) -
        parseDate(a.affiliate_relation_date),
    );

    return [...data];
  };

  useEffect(() => {
    const fetchIndividualData = async () => {
      const storedAffiliates = await getStoredAffiliatedEntities(
        AFFILIATED_INDIVIDUALS_TABLE,
      );

      if (storedAffiliates.length === 0) {
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

          const sortedData = sortData(response.data);

          setIndividuals(sortedData);
          await storeAffiliatedEntities(
            AFFILIATED_INDIVIDUALS_TABLE,
            sortedData,
          );
        } catch (error) {
          console.error("Error fetching individual data:", error);
        }
      } else {
        setIndividuals(storedAffiliates as Individual[]);
      }
    };

    fetchIndividualData();
  }, []);

  const indCards = individuals.map((indInfo) => {
    return (
      <IndividualCard
        key={indInfo.individual_username}
        name={indInfo.individual_name}
        username={indInfo.individual_username}
        current_issue={indInfo.individual_current_issue}
        animate={indInfo.animate ? true : false}
      />
    );
  });

  return (
    <div className="h-max my-4 ml-9 flex flex-col space-y-4">{indCards}</div>
  );
}
