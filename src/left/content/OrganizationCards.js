import React from "react";
import { OrganizationCard } from "./LeftSpaceCards";
import { organizations } from "../../data";

export default function OrganizationCards() {

    /* 
        Description:   
            Gets organization data from a database then extracts the id, name, currentIssue, and stances to 
            be mapped into cards.
        Unique Properties:
            N/A
    */
   
    const orgCards = organizations.map(orgInfo => {
        return <OrganizationCard key={orgInfo.id} name={orgInfo.name} currentIssue={orgInfo.currentIssue} stances={orgInfo.stances} />
    })

    return (
        <div id="organizationCards" className="h-full mr-3 overflow-scroll">
            {orgCards}
        </div>
    )
}