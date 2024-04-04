import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import config from "@config";
import { OrganizationCard } from "./LeftSpaceCards";
import { Organization } from "@FgTypes/leftTypes";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function OrganizationRecs() {
  /* 
    Description:   
      Gets organization data from a database then extracts the id, name, currentIssue, and stances to 
      be mapped into cards.
    Unique Properties:
      N/A
  */

  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const response = await Axios.get(`${serverUrl}/organizations`);
        setOrganizations(response.data);
      } catch (error) {
        console.error("Error fetching organization data:", error);
      }
    };

    fetchOrganizationData();
  }, []);

  const orgRecs = organizations.map((orgInfo) => {
    return (
      <OrganizationCard
        key={orgInfo.organization_handle}
        name={orgInfo.organization_name}
        handle={orgInfo.organization_handle}
        currentIssue={orgInfo.organization_currentIssue}
        stances={orgInfo.organization_stances}
      />
    );
  });

  return <div className="h-max">{orgRecs}</div>;
}
