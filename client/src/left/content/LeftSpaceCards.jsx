import React from "react";

/* 
    Description:   
        Templates for all of the left side cards that data from the database gets mapped to. 
        Formats the data into something visually appealing.
    Unique Properties:
        N/A
*/

export function IndividualCard({ name, currentIssue }) {
    return (
        <div className="bg-white w-fill my-4 mx-6 h-20 py-2.5 flex items-center rounded-md">
            <div className="w-14 aspect-square bg-fg-white-85 ml-4 mr-5 rounded-full grid place-items-center flex-shrink-0">
                <p>pic</p>
            </div>
            <div className="m-2 truncate">
                <p className="font-Josefin text-xl truncate">{name}</p>
                <p className="font-K2D text-sm text-fg-black-30 truncate">{currentIssue}</p>
            </div>
        </div>
    )
}

export function GroupCard({ name, currentIssue, affInCommon }) {
    return (
        <div className="bg-white w-fill my-4 mx-6 h-24 py-2.5 flex items-center rounded-md">
            <div className="w-16 aspect-square bg-fg-white-85 ml-4 mr-5 rounded-md grid place-items-center flex-shrink-0">
                <p>pic</p>
            </div>
            <div className="m-2 truncate">
                <p className="font-Josefin text-xl truncate">{name}</p>
                <p className="font-K2D text-base text-fg-black-30 truncate">{currentIssue}</p>
                <p className="font-K2D text-sm text-fg-black-30 truncate">Affiliates in this group: {affInCommon}</p>
            </div>
        </div>
    )
}

export function OrganizationCard({ name, currentIssue, stances }) {
    return (
        <div className="bg-white w-fill my-4 mx-6 h-24 py-2.5 flex items-center rounded-md">
            <div className="w-16 aspect-square bg-fg-white-85 ml-4 mr-5 rounded-md grid place-items-center flex-shrink-0">
                <p>pic</p>
            </div>
            <div className="m-2 h-full truncate">
                <p className="font-Josefin text-xl truncate">{name}</p>
                <p className="font-K2D text-base text-fg-black-30 truncate">{currentIssue}</p>
                <p className="font-K2D text-sm text-fg-black-30 truncate">Stances: {stances}</p>
            </div>
        </div>
    )
}