import React from "react";

export default function RelatedIssuesHeader ({ lightness, togglePaneHeight}) {
    return (
        <div id="relatedIssuesHeader" className="h-9 flex drop-shadow-md" style={{ backgroundColor: `hsl(21, 92%, ${lightness}%)` }}>
            <div className="grow my-auto grid place-items-start ml-5 text-lg pt-1">
                <p>Related Issues</p>
            </div>
            <div className="grow my-auto grid place-items-end mr-5">
                <button className="bg-fg-black-20 h-2 w-10 rounded" onClick={togglePaneHeight}></button>
            </div>
        </div>
    )
}