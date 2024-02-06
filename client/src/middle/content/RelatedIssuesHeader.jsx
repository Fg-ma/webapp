import React from "react";

export default function RelatedIssuesHeader({ lightness, togglePaneHeight }) {
    /* 
        Description:   
            Acts as a divider in the MiddleVerticalSplitPane. Basic set up of a related issues header.
        Unique Properties:
            Changes lightness based on its height on the page but that logic is handled in 
            MiddleVerticalSplitPane and passed in with the correct value.
    */

    return (
        <div
            id='relatedIssuesHeader'
            className='h-9 flex items-center drop-shadow-md'
            style={{ backgroundColor: `hsl(21, 92%, ${lightness}%)` }}
        >
            <div className='grow my-auto flex justify-start items-center ml-5 text-xl text-white pt-1'>
                <p>Related Issues</p>
            </div>
            <div className='flex items-center mr-5'>
                <div
                    className='flex items-center h-5 cursor-pointer'
                    onClick={togglePaneHeight}
                >
                    <button className='bg-fg-black-25 h-2 w-10 rounded'></button>
                </div>
            </div>
        </div>
    );
}
