import React from "react";

export default function RelatedIssuesHeader () {
    return (
        <div id="relatedIssuesHeader" className="h-9 bg-fg-primary-desat flex drop-shadow-md">
            <div className="grow my-auto grid place-items-start ml-5 text-lg pt-1">
                <p>Related Issues</p>
            </div>
            <div className="grow my-auto grid place-items-end mr-5">
                <button className="bg-fg-black-20 h-2 w-10 rounded"></button>
            </div>
        </div>
    )
}