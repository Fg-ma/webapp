import React from "react";

export default function RelatedIssuesHeader ({ lightness, togglePaneHeight}) {

    /* 
        Description:   
            Acts as a divider in the MiddleVerticalSplitPane. Basic set up of a related issues header.
        Unique Properties:
            Changes lightness based on its height on the page but that logic is handled in 
            MiddleVerticalSplitPane and passed in with the correct value.
    */

    return (
        <div id="relatedIssuesHeader" className="h-9 flex drop-shadow-md" style={{ backgroundColor: `hsl(21, 92%, ${lightness}%)` }}>
            <div className="grow my-auto grid place-items-start ml-5 text-xl text-white pt-1">
                <p>Related Issues</p>
            </div>
            <div className="grow my-auto grid place-items-end mr-5">
                <button className="bg-fg-black-25 h-2 w-10 rounded" onClick={togglePaneHeight}></button>
            </div>
        </div>
    )
}