import React from "react";
import { GroupCard } from "./LeftSpaceCards";
import { groups } from "../../data";

export default function GroupRecs() {
    const grpRecs = groups.map(grpInfo => {
        return <GroupCard key={grpInfo.id} name={grpInfo.name} currentIssue={grpInfo.currentIssue} affInCommon={grpInfo.affInCommon} />
    })

    return (
        <div id="groupRecs" className="mr-3 h-full overflow-scroll">
            {grpRecs}
        </div>
    )
}