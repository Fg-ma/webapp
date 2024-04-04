import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { GroupCard } from "./LeftSpaceCards";
import { Group } from "@FgTypes/leftTypes";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function GroupRecs() {
  /* 
    Description:   
      Gets group data from a database then extracts the id, name, and currentIssue to be mapped
      into cards.
    Unique Properties:
      It queries for any affiliates that the user may have in common with the group.
  */

  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await Axios.get(`${serverUrl}/groups`);
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    fetchGroupData();
  }, []);

  const grpRecs = groups.map((grpInfo) => {
    return (
      <GroupCard
        key={grpInfo.group_handle}
        name={grpInfo.group_name}
        handle={grpInfo.group_handle}
        currentIssue={grpInfo.group_currentIssue}
        affInCommon="placeholder"
      />
    );
  });

  return (
    <div id="groupRecs" className="h-max">
      {grpRecs}
    </div>
  );
}
