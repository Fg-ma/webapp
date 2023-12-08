import React from "react";
import { DogEarCard } from "./RightSpaceCards";
import { dogEars } from "../../data"

export default function DogEarCards() {
    const dogEarCards = dogEars.map(deInfo => {
        return <DogEarCard key={deInfo.id} title={deInfo.title} issueQuestions={deInfo.issueQuestions} affResponses={deInfo.affResponses} />
    })

    return (
        <div id="dogEarCards" className="h-full mr-3 overflow-scroll">
            {dogEarCards}
        </div>
    )
}