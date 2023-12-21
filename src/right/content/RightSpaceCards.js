import React from "react";

export function NewsCard(props) {

    /* 
    Description:   
        Templates for all of the right side cards that data from the database gets mapped to. 
        Formats the data into something visually appealing.
    Unique Properties:
        N/A
    */

    return (
        <div className="bg-white w-fill my-4 mx-6 h-36 flex items-center rounded-md">
            <div className="w-28 aspect-square overflow-clip bg-fg-white-85 ml-3 rounded-sm grid place-items-center">
                <p>pic</p>
            </div>
            <div className="m-2 w-2/3 space-y-1">
                <p className="font-Josefin text-lg font-bold line-clamp-2">{props.title}</p>
                <div>
                    <p className="font-Josefin text-base text-fg-black-30 line-clamp-2">{props.issueQuestions}</p>
                    <p className="font-K2D text-xs text-fg-black-30 truncate">Affiliates' responses: {props.affResponses}</p>
                </div>
            </div>
        </div>
    )
}

export function MessagesCard(props) {
    return (
        <div className="bg-white w-fill my-4 mx-6 h-20 py-2.5 flex items-center rounded-md">
            <div className="w-14 aspect-square bg-fg-white-85 ml-4 mr-5 rounded-full grid place-items-center flex-shrink-0">
                <p>pic</p>
            </div>
            <div className="m-2">
                <p className="font-Josefin text-xl">{props.name}</p>
                <p className="font-K2D text-sm text-fg-black-30">{props.lastMessage}</p>
            </div>
        </div>
    )
}

export function DogEarCard(props) {
    return (
        <div className="bg-white w-fill my-4 mx-6 h-36 flex items-center rounded-md">
            <div className="w-28 aspect-square overflow-clip bg-fg-white-85 ml-3 rounded-sm grid place-items-center">
                <p>pic</p>
            </div>
            <div className="m-2 w-2/3 space-y-1">
                <p className="font-Josefin text-lg font-bold line-clamp-2">{props.title}</p>
                <div>
                    <p className="font-Josefin text-base text-fg-black-30 line-clamp-2">{props.issueQuestions}</p>
                    <p className="font-K2D text-xs text-fg-black-30 truncate">Affiliates' responses: {props.affResponses}</p>
                </div>
            </div>
        </div>
    )
}