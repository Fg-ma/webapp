import React from "react";
import { OrganizationCard } from "./LeftSpaceCards";
import { organizations } from "../../data";

export default function OrganizationRecs() {

    /* 
        Description:   
            Gets organization data from a database then extracts the id, name, currentIssue, and stances to 
            be mapped into cards.
        Unique Properties:
            N/A
    */
   
    const orgRecs = organizations.map(orgInfo => {
        return <OrganizationCard key={orgInfo.id} name={orgInfo.name} currentIssue={orgInfo.currentIssue} stances={orgInfo.stances} />
    })

    return (
        <div id="organizationRecs" className="mr-3 h-full overflow-scroll">
            {orgRecs}
        </div>
    )
}