import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { OrganizationCard } from "./LeftSpaceCards";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

interface Organization {
  organization_id: string;
  organization_name: string;
  organization_handle: string;
  organization_currentIssue: string;
  organization_description: string;
  organization_stances: string;
}

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
        key={orgInfo.organization_id}
        id={orgInfo.organization_id}
        name={orgInfo.organization_name}
        currentIssue={orgInfo.organization_currentIssue}
        stances={orgInfo.organization_stances}
      />
    );
  });

  return (
    <div id="organizationRecs" className="mr-3 h-full overflow-scroll">
      {orgRecs}
    </div>
  );
}