import React from "react";
import individuals from "../../individuals";

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

function IndividualCard(props) {
    return (
        <div className="bg-white w-fill my-4 mx-6 h-fit py-2.5 flex items-center rounded-md">
            <div className="w-14 aspect-square bg-fg-white-85 ml-4 mr-5 rounded-full grid place-items-center flex-shrink-0">
                <p>pic</p>
            </div>
            <div className="m-2">
                <p className="font-Josefin text-xl">{props.name}</p>
                <p className="font-K2D text-xs text-fg-black-30">{props.currentIssue}</p>
            </div>
        </div>
    )
}