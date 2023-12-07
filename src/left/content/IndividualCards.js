import React from "react";
import { IndividualCard } from "./LeftSpaceCards";
import { individuals } from "../../data";

export default function IndividualCards() {
    const indCards = individuals.map(indInfo => {
        return <IndividualCard key={indInfo.id} name={indInfo.name} currentIssue={indInfo.currentIssue} />
    })

    return (
        <div id="individualCards" className="h-full mr-3 overflow-scroll">
            {indCards}
        </div>
    )
}