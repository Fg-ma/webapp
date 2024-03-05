import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { OrganizationCard } from "./LeftSpaceCards";
import { Organization } from "@FgTypes/leftTypes";
import { useAffiliateContext } from "../../middle/pages/entityPage/header/AffiliateContext";

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

  const { affiliateRelation } = useAffiliateContext();
  const [organizations, setOrganizations] = useState<Organization[]>([]);

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
      } catch (error) {
        console.error("Error fetching organization data:", error);
      }
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
      const newOrganizations = organizations.filter(
        (organization) =>
          organization.organization_id !==
          affiliateRelation.affiliate_id_target,
      );

      setOrganizations(newOrganizations);
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
    const fetchOrganizationData = async () => {
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

        setOrganizations(sortData(response.data));
      } catch (error) {
        console.error("Error fetching organization data:", error);
      }
    };

    fetchOrganizationData();
  }, []);

  const orgCards = organizations.map((orgInfo) => {
    return (
      <OrganizationCard
        key={orgInfo.organization_id}
        id={orgInfo.organization_id}
        name={orgInfo.organization_name}
        currentIssue={orgInfo.organization_currentIssue}
        stances={orgInfo.organization_stances}
        animate={orgInfo.animate}
      />
    );
  });

  return (
    <div id="organizationCards" className="h-full mr-3 overflow-scroll">
      {orgCards}
    </div>
  );
}
