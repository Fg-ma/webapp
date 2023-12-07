import React from "react";
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

function OrganizationCard(props) {
    return (
        <div className="bg-white w-fill my-4 mx-6 h-24 py-2.5 flex items-center rounded-md">
            <div className="w-16 aspect-square bg-fg-white-85 ml-4 mr-5 rounded-md grid place-items-center flex-shrink-0">
                <p>pic</p>
            </div>
            <div className="m-2 h-full">
                <p className="font-Josefin text-xl">{props.name}</p>
                <p className="font-K2D text-sm text-fg-black-30">{props.currentIssue}</p>
                <p className="orgStances">Stances: {props.stances}</p>
            </div>
        </div>
    )
}