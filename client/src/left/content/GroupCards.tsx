import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { GroupCard } from "./GroupCard";
import { Group, GroupCardsProps } from "@FgTypes/leftTypes";
import { useAffiliateContext } from "@context/AffiliateContext";
import { useIndexedDBContext } from "@context/IDBContext";
import { AFFILIATED_GROUPS_TABLE } from "@IDB/IDBService";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function GroupCards({ leftTopPaneRef }: GroupCardsProps) {
  /* 
    Description:   
      Gets group data from a database then extracts the id, name, and current_issue to be mapped
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
          `${serverUrl}/groups/${affiliateRelation.affiliate_username_target}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const newGroup = { ...response.data, animate: true };

        setGroups((prev) => [newGroup, ...prev]);

        const storeGroups = groups.map((group) => ({
          ...group,
          animate: false,
        }));

        await deleteStoredAffiliatedEntities(AFFILIATED_GROUPS_TABLE);
        await storeAffiliatedEntities(AFFILIATED_GROUPS_TABLE, [
          { ...response.data },
          ...storeGroups,
        ]);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    const deleteOldRelationData = async () => {
      const newGroups = groups.filter(
        (group) =>
          group.group_handle !== affiliateRelation.affiliate_username_target,
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
      affiliateRelation?.entity_type === 2 &&
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
        current_issue={grpInfo.group_current_issue}
        affInCommon="placeholder"
        animate={grpInfo.animate}
      />
    );
  });

  return (
    <div className="h-max my-4 ml-9 flex flex-col space-y-4">{grpCards}</div>
  );
}
