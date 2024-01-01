import React from "react";
import { IndividualCard } from "./LeftSpaceCards";
import { individuals } from "../../data";

export default function IndividualCards() {

    /* 
        Description:   
            Gets individual data from a database then extracts the id, name, and currentIssue to be mapped
            into cards.
        Unique Properties:
            N/A
    */
   
    const indCards = individuals.map(indInfo => {
        return <IndividualCard key={indInfo.id} name={indInfo.name} currentIssue={indInfo.currentIssue} />
    })

    return (
        <div id="individualCards" className="h-full mr-3 overflow-scroll">
            {indCards}
        </div>
    )
}