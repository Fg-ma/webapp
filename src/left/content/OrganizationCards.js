import React from "react";
import { OrganizationCard } from "./LeftSpaceCards";
import { organizations } from "../../data";

export default function OrganizationCards() {
    const orgCards = organizations.map(orgInfo => {
        return <OrganizationCard key={orgInfo.id} name={orgInfo.name} currentIssue={orgInfo.currentIssue} stances={orgInfo.stances} />
    })

    return (
        <div id="organizationCards" className="h-full mr-3 overflow-scroll">
            {orgCards}
        </div>
    )
}