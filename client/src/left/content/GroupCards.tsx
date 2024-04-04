import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { GroupCard } from "./LeftSpaceCards";
import { Group } from "@FgTypes/leftTypes";
import { useAffiliateContext } from "@context/AffiliateContext";
import { useIndexedDBContext } from "@context/IDBContext";
import { AFFILIATED_GROUPS_TABLE } from "@IDB/IDBService";

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

  const {
    storeAffiliatedEntities,
    getStoredAffiliatedEntities,
    deleteStoredAffiliatedEntities,
  } = useIndexedDBContext();
  const { affiliateRelation, setAffiliateRelation } = useAffiliateContext();
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

        const storedGroups = groups.map((group) => ({
          ...group,
          animate: false,
        }));

        await deleteStoredAffiliatedEntities(AFFILIATED_GROUPS_TABLE);
        await storeAffiliatedEntities(AFFILIATED_GROUPS_TABLE, [
          { ...response.data },
          ...storedGroups,
        ]);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    const deleteOldRelationData = async () => {
      const newGroups = groups.filter(
        (group) => group.group_handle !== affiliateRelation.affiliate_id_target,
      );

      setGroups(newGroups);

      await deleteStoredAffiliatedEntities(AFFILIATED_GROUPS_TABLE);
      await storeAffiliatedEntities(AFFILIATED_GROUPS_TABLE, newGroups);
    };

    if (
      affiliateRelation?.entity_type === 2 &&
      affiliateRelation?.action === "newRelation"
    ) {
      fetchNewRelationData();
      setAffiliateRelation({
        action: "",
        affiliate_id_root: "",
        affiliate_id_target: "",
        affiliate_relation_date: "",
        affiliate_relation_id: "",
        entity_type: 0,
      });
    } else if (
      affiliateRelation?.entity_type === 2 &&
      affiliateRelation?.action === "deletedRelation"
    ) {
      deleteOldRelationData();
      setAffiliateRelation({
        action: "",
        affiliate_id_root: "",
        affiliate_id_target: "",
        affiliate_relation_date: "",
        affiliate_relation_id: "",
        entity_type: 0,
      });
    }
  }, [affiliateRelation]);

  const sortData = (data: Group[]) => {
    const parseDate = (dateString: string | null) =>
      dateString
        ? new Date(dateString).getTime()
        : new Date("2000-01-01T01:01:01.000Z").getTime();

    data.sort(
      (a: Group, b: Group) =>
        parseDate(b.affiliate_relation_date) -
        parseDate(a.affiliate_relation_date),
    );

    return [...data];
  };

  useEffect(() => {
    const fetchGroupData = async () => {
      const storedAffiliates = await getStoredAffiliatedEntities(
        AFFILIATED_GROUPS_TABLE,
      );

      if (storedAffiliates.length === 0) {
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

          const sortedData = sortData(response.data);

          setGroups(sortedData);
          await storeAffiliatedEntities(AFFILIATED_GROUPS_TABLE, sortedData);
        } catch (error) {
          console.error("Error fetching group data:", error);
        }
      } else {
        setGroups(storedAffiliates as Group[]);
      }
    };

    fetchGroupData();
  }, []);

  const grpCards = groups.map((grpInfo) => {
    return (
      <GroupCard
        key={grpInfo.group_handle}
        name={grpInfo.group_name}
        handle={grpInfo.group_handle}
        currentIssue={grpInfo.group_currentIssue}
        affInCommon="placeholder"
        animate={grpInfo.animate}
      />
    );
  });

  return (
    <div id="groupCards" className="h-max">
      {grpCards}
    </div>
  );
}
