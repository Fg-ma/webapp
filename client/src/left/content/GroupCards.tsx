import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { GroupCard } from "./LeftSpaceCards";
import { Group } from "@FgTypes/leftTypes";
import { useAffiliateContext } from "@context/AffiliateContext";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function GroupCards() {
  /* 
    Description:   
      Gets group data from a database then extracts the id, name, and currentIssue to be mapped
      into cards.
    Unique Properties:
      It queries for any affiliates that the user may have in common with the group.
  */

  const { affiliateRelation } = useAffiliateContext();
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchNewRelationData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found in local storage");
          return;
        }

        const response = await Axios.get(
          `${serverUrl}/groups/${affiliateRelation.affiliate_id_target}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const newGroup = { ...response.data, animate: true };

        setGroups((prev) => [newGroup, ...prev]);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    if (
      affiliateRelation?.entity_type === 2 &&
      affiliateRelation?.action === "newRelation"
    ) {
      fetchNewRelationData();
    } else if (
      affiliateRelation?.entity_type === 2 &&
      affiliateRelation?.action === "deletedRelation"
    ) {
      const newIndividuals = groups.filter(
        (group) => group.group_id !== affiliateRelation.affiliate_id_target,
      );

      setGroups(newIndividuals);
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
    const fetchGroupData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found in local storage");
          return;
        }

        const response = await Axios.get(
          `${serverUrl}/affiliateRelations/get_affiliated_groups`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setGroups(sortData(response.data));
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    fetchGroupData();
  }, []);

  const grpCards = groups.map((grpInfo) => {
    return (
      <GroupCard
        key={grpInfo.group_id}
        id={grpInfo.group_id}
        name={grpInfo.group_name}
        currentIssue={grpInfo.group_currentIssue}
        affInCommon="placeholder"
        animate={grpInfo.animate}
      />
    );
  });

  return (
    <div id="groupCards" className="h-full mr-3 overflow-scroll">
      {grpCards}
    </div>
  );
}
