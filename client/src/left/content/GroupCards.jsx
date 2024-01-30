import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { GroupCard } from "./LeftSpaceCards";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment ? config.development.serverUrl : config.production.serverUrl;

export default function GroupCards() {

    /* 
        Description:   
            Gets group data from a database then extracts the id, name, and currentIssue to be mapped
            into cards.
        Unique Properties:
            It queries for any affiliates that the user may have in common with the group.
    */

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        Axios.get(`${serverUrl}/groups`).then((response) => {
            setGroups(response.data);
        });
    }, []);
   
    const grpCards = groups.map(grpInfo => {
        return <GroupCard 
                    key={grpInfo.group_id} 
                    id={grpInfo.group_id}
                    name={grpInfo.group_name} 
                    currentIssue={grpInfo.group_currentIssue} 
                /> //affInCommon={grpInfo.affInCommon} />
    });

    return (
        <div id="groupCards" className="h-full mr-3 overflow-scroll">
            {grpCards}
        </div>
    )
}