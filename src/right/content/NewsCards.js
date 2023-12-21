import React from "react";
import { NewsCard } from "./RightSpaceCards";
import { issues } from "../../data"

export default function NewsCards() {

    /* 
        Description:   
            Gets issues data from a database then extracts the id, title, and issueQuestions to be mapped
            into cards.
        Unique Properties:
            It queries for any affiliate responses.
    */

    const newsCards = issues.map(issueInfo => {
        return <NewsCard key={issueInfo.id} title={issueInfo.title} issueQuestions={issueInfo.issueQuestions} affResponses={issueInfo.affResponses} />
    })

    return (
        <div id="newsCards" className="h-full mr-3 overflow-scroll">
            {newsCards}
        </div>
    )
}