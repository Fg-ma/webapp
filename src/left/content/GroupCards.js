import React from "react";
import { GroupCard } from "./LeftSpaceCards";
import { groups } from "../../data";

export default function GroupCards() {
    const grpCards = groups.map(grpInfo => {
        return <GroupCard key={grpInfo.id} name={grpInfo.name} currentIssue={grpInfo.currentIssue} affInCommon={grpInfo.affInCommon} />
    })

    return (
        <div id="groupCards" className="h-full mr-3 overflow-scroll">
            {grpCards}
        </div>
    )
}