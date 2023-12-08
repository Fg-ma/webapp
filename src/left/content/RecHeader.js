import React from "react";

export default function RecHeader ({ lightness }) {
    return (
        <div id="recHeader" className="h-9 flex drop-shadow-md" style={{ backgroundColor: `hsl(21, 92%, ${lightness}%)` }}>
            <div className="grow my-auto grid place-items-start ml-5 text-lg pt-1">
                <p>Recommendations...</p>
            </div>
            <div className="grow my-auto grid place-items-end mr-5">
                <button className="bg-fg-black-20 h-2 w-10 rounded"></button>
            </div>
        </div>
    )
}