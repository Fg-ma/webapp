import React from "react";
import { IndividualCard } from "./LeftSpaceCards";
import { individuals } from "../../data";

export default function IndividualRecs() {
    const indRecs = individuals.map(indInfo => {
        return <IndividualCard key={indInfo.id} name={indInfo.name} currentIssue={indInfo.currentIssue} />
    })

    return (
        <div id="individualRecs" className="mr-3 h-full overflow-scroll">
            {indRecs}
        </div>
    )
}