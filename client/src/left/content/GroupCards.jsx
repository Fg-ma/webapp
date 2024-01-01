import React from "react";
import { GroupCard } from "./LeftSpaceCards";
import { groups } from "../../data";

export default function GroupCards() {

    /* 
        Description:   
            Gets group data from a database then extracts the id, name, and currentIssue to be mapped
            into cards.
        Unique Properties:
            It queries for any affiliates that the user may have in common with the group.
    */
   
    const grpCards = groups.map(grpInfo => {
        return <GroupCard key={grpInfo.id} name={grpInfo.name} currentIssue={grpInfo.currentIssue} affInCommon={grpInfo.affInCommon} />
    })

    return (
        <div id="groupCards" className="h-full mr-3 overflow-scroll">
            {grpCards}
        </div>
    )
}