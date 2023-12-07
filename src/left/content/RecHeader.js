import React from "react";

export default function RecHeader () {
    return (
        <div id="recHeader" className="h-9 bg-fg-white-90 flex drop-shadow-md">
            <div className="grow my-auto grid place-items-start ml-5 text-lg pt-1">
                <p>Recommendations...</p>
            </div>
            <div className="grow my-auto grid place-items-end mr-5">
                <button className="bg-fg-black-20 h-2 w-10 rounded"></button>
            </div>
        </div>
    )
}