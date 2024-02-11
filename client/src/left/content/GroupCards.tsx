import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { GroupCard } from "./LeftSpaceCards";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

interface Group {
  group_id: number;
  group_name: string;
  group_currentIssue: string;
  group_description: string;
  group_stances: string;
}

export default function GroupCards() {
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

  const grpCards = groups.map((grpInfo) => {
    return (
      <GroupCard
        key={grpInfo.group_id}
        id={grpInfo.group_id}
        name={grpInfo.group_name}
        currentIssue={grpInfo.group_currentIssue}
        affInCommon="placeholder"
      />
    );
  });

  return (
    <div id="groupCards" className="h-full mr-3 overflow-scroll">
      {grpCards}
    </div>
  );
}
