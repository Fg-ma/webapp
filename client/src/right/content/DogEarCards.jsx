import React from "react";
import { DogEarCard } from "./RightSpaceCards";
import { dogEars } from "../../data"

export default function DogEarCards() {

    /* 
        Description:   
            Gets dogEars data from a database then extracts the id, title, and issueQuestions to be mapped
            into cards.
        Unique Properties:
            It queries for any affiliate responses.
    */

    const dogEarCards = dogEars.map(deInfo => {
        return <DogEarCard key={deInfo.id} title={deInfo.title} issueQuestions={deInfo.issueQuestions} affResponses={deInfo.affResponses} />
    })

    return (
        <div id="dogEarCards" className="h-full mr-3 overflow-scroll">
            {dogEarCards}
        </div>
    )
}