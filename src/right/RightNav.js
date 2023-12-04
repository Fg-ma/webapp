import React, { useState } from "react";

export default function RightNav() {
    const [rightState, setRightState] = useState("news");

    const deactiveStyles = {};
    const activeStyles = {
        textDecorationLine: "underline",
        textDecorationColor: "#F56114",
        textUnderlineOffset: "8px",
        textDecorationThickness: "2px",
    };

    const rightStyles = {
        individuals: deactiveStyles,
        groups: deactiveStyles,
        organizations: deactiveStyles,
    };

    rightStyles[rightState] = activeStyles;

    function swapRightState(state) {
        setRightState(state);
    };

    return (
        <nav id="rightSelectionBarSpace" className="block w-full rounded-t-xl h-12 bg-fg-white-90 drop-shadow-md">
            <div className="flex divide-x-2 divide-fg-white-70 h-full">
                <div className="h-7 w-1/4 my-auto flex justify-center items-center text-lg hover:underline hover:decoration-fg-secondary hover:decoration-2 hover:underline-offset-8 hover:text-base transition">
                    <button className="w-full" style={rightStyles["news"]} onClick={() => swapRightState('news')}>News</button>
                </div>
                <div className="h-7 w-1/4 my-auto flex justify-center items-center text-lg hover:underline hover:decoration-fg-secondary hover:decoration-2 hover:underline-offset-8 hover:text-base transition">
                    <button className="w-full" style={rightStyles["explore"]} onClick={() => swapRightState('explore')}>Explore</button>
                </div>
                <div className="h-7 w-1/4 my-auto flex justify-center items-center text-lg hover:underline hover:decoration-fg-secondary hover:decoration-2 hover:underline-offset-8 hover:text-base transition">
                    <button className="w-full" style={rightStyles["messages"]} onClick={() => swapRightState('messages')}>Messages</button>
                </div>
                <div className="h-7 w-1/4 my-auto flex justify-center items-center text-lg hover:underline hover:decoration-fg-secondary hover:decoration-2 hover:underline-offset-8 hover:text-base transition">
                    <button className="w-full" style={rightStyles["dogEars"]} onClick={() => swapRightState('dogEars')}>Dog-Ears</button>
                </div>
            </div>
        </nav>
    )
}