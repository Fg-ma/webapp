import React from "react";

export function IndividualCard(props) {
    return (
        <div className="bg-white w-fill my-4 mx-6 h-20 py-2.5 flex items-center rounded-md">
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

export function GroupCard(props) {
    return (
        <div className="bg-white w-fill my-4 mx-6 h-24 py-2.5 flex items-center rounded-md">
            <div className="w-16 aspect-square bg-fg-white-85 ml-4 mr-5 rounded-md grid place-items-center flex-shrink-0">
                <p>pic</p>
            </div>
            <div className="m-2">
                <p className="font-Josefin text-xl">{props.name}</p>
                <p className="font-K2D text-sm text-fg-black-30">{props.currentIssue}</p>
                <p className="groupAffliliates">Affiliates in this group: {props.affInCommon}</p>
            </div>
        </div>
    )
}

export function OrganizationCard(props) {
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