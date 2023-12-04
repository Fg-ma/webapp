import React, { useState } from "react";

export default function LeftNav() {
    const [leftState, setLeftState] = useState("individuals");

    const deactiveStyles = {};
    const activeStyles = {
        textDecorationLine: "underline",
        textDecorationColor: "#F56114",
        textUnderlineOffset: "8px",
        textDecorationThickness: "2px",
    };

    const leftStyles = {
        individuals: deactiveStyles,
        groups: deactiveStyles,
        organizations: deactiveStyles,
    };

    leftStyles[leftState] = activeStyles;

    function swapLeftState(state) {
        setLeftState(state);
    };

    return (
        <nav id="leftSelectionBarSpace" className="block w-full rounded-t-xl h-12 bg-fg-white-90 drop-shadow-md">
            <div className="flex divide-x-2 divide-fg-white-70 h-full">
                <div className="h-7 w-1/3 my-auto flex justify-center items-center text-lg hover:underline hover:decoration-fg-secondary hover:decoration-2 hover:underline-offset-8 hover:text-base transition">
                    <button className="w-full" style={leftStyles["individuals"]} onClick={() => swapLeftState('individuals')}>Individuals</button>
                </div>
                <div className="h-7 w-1/3 my-auto flex justify-center items-center text-lg hover:underline hover:decoration-fg-secondary hover:decoration-2 hover:underline-offset-8 hover:text-base transition">
                    <button className="w-full" style={leftStyles["groups"]} onClick={() => swapLeftState('groups')}>Groups</button>
                </div>
                <div className="h-7 w-1/3 my-auto flex justify-center items-center text-lg hover:underline hover:decoration-fg-secondary hover:decoration-2 hover:underline-offset-8 hover:text-base transition">
                    <button className="w-full" style={leftStyles["organizations"]} onClick={() => swapLeftState('organizations')}>Organizations</button>
                </div>
            </div>
        </nav>
    )
}