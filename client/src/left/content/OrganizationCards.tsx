import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import config from "@config";
import { OrganizationCard } from "./LeftSpaceCards";
import { Organization } from "@FgTypes/leftTypes";
import { useAffiliateContext } from "@context/AffiliateContext";
import { AFFILIATED_ORGANIZATIONS_TABLE } from "@IDB/IDBService";
import { useIndexedDBContext } from "@context/IDBContext";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function OrganizationCards() {
  /* 
    Description:   
      Gets organization data from a database then extracts the id, name, currentIssue, and stances to 
      be mapped into cards.
    Unique Properties:
      N/A
  */

  const {
    storeAffiliatedEntities,
    getStoredAffiliatedEntities,
    deleteStoredAffiliatedEntities,
  } = useIndexedDBContext();
  const { affiliateRelation, setAffiliateRelation } = useAffiliateContext();
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  // Handle live updates to affiliation status
  useEffect(() => {
    const fetchNewRelationData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found in local storage");
          return;
        }

        const response = await Axios.get(
          `${serverUrl}/organizations/${affiliateRelation.affiliate_id_target}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const newIndividual = { ...response.data, animate: true };

        setOrganizations((prev) => [newIndividual, ...prev]);

        const storedOrganizations = organizations.map((organization) => ({
          ...organization,
          animate: false,
        }));

        await deleteStoredAffiliatedEntities(AFFILIATED_ORGANIZATIONS_TABLE);
        await storeAffiliatedEntities(AFFILIATED_ORGANIZATIONS_TABLE, [
          { ...response.data },
          ...storedOrganizations,
        ]);
      } catch (error) {
        console.error("Error fetching organization data:", error);
      }
    };

    const deleteOldRelationData = async () => {
      const newOrganizations = organizations.filter(
        (organization) =>
          organization.organization_id !==
          affiliateRelation.affiliate_id_target,
      );

      setOrganizations(newOrganizations);

      await deleteStoredAffiliatedEntities(AFFILIATED_ORGANIZATIONS_TABLE);
      await storeAffiliatedEntities(
        AFFILIATED_ORGANIZATIONS_TABLE,
        newOrganizations,
      );
    };

    if (
      affiliateRelation?.entity_type === 3 &&
      affiliateRelation?.action === "newRelation"
    ) {
      fetchNewRelationData();
    } else if (
      affiliateRelation?.entity_type === 3 &&
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

  const sortData = (data: Organization[]) => {
    const parseDate = (dateString: string | null) =>
      dateString
        ? new Date(dateString).getTime()
        : new Date("2000-01-01T01:01:01.000Z").getTime();

    data.sort(
      (a: Organization, b: Organization) =>
        parseDate(b.affiliate_relation_date) -
        parseDate(a.affiliate_relation_date),
    );

    return [...data];
  };

  useEffect(() => {
    const fetchOrganizationData = async () => {
      const storedAffiliates = await getStoredAffiliatedEntities(
        AFFILIATED_ORGANIZATIONS_TABLE,
      );

      if (storedAffiliates.length === 0) {
        try {
          const token = localStorage.getItem("token");

          if (!token) {
            console.error("Token not found in local storage");
            return;
          }

          const response = await Axios.get(
            `${serverUrl}/affiliateRelations/get_affiliated_organizations`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const sortedData = sortData(response.data);

          setOrganizations(sortedData);
          await storeAffiliatedEntities(
            AFFILIATED_ORGANIZATIONS_TABLE,
            sortedData,
          );
        } catch (error) {
          console.error("Error fetching organization data:", error);
        }
      } else {
        setOrganizations(storedAffiliates as Organization[]);
      }
    };

    fetchOrganizationData();
  }, []);

  const orgCards = organizations.map((orgInfo) => {
    return (
      <OrganizationCard
        key={orgInfo.organization_id}
        id={orgInfo.organization_id}
        name={
          orgInfo.organization_name
            ? orgInfo.organization_name
            : orgInfo.organization_handle
        }
        currentIssue={orgInfo.organization_currentIssue}
        stances={orgInfo.organization_stances}
        animate={orgInfo.animate}
      />
    );
  });

  return <div className="h-max">{orgCards}</div>;
}
