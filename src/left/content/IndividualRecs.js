import React from "react";
import { IndividualCard } from "./LeftSpaceCards";
import { individuals } from "../../data";

export default function IndividualRecs() {

    /* 
        Description:   
            Gets individual data from a database then extracts the id, name, and currentIssue to be mapped
            into cards.
        Unique Properties:
            N/A
    */
   
    const indRecs = individuals.map(indInfo => {
        return <IndividualCard key={indInfo.id} name={indInfo.name} currentIssue={indInfo.currentIssue} />
    })

    return (
        <div id="individualRecs" className="mr-3 h-full overflow-scroll">
            {indRecs}
        </div>
    )
}