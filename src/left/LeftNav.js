import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function LeftNav() {
    const deactiveStyles = {};
    const activeStyles = {
        textDecorationLine: "underline",
        textDecorationColor: "#F56114",
        textUnderlineOffset: "8px",
        textDecorationThickness: "2px",
    };

    const dispatch = useDispatch();

    const leftPage = useSelector((state) => state.leftNav?.leftPage || "individuals");

    const leftStyles = {
        individuals: deactiveStyles,
        groups: deactiveStyles,
        organizations: deactiveStyles,
    };

    // Activate the style for the current leftPage
    leftStyles[leftPage] = { ...activeStyles };


    function swapLeftState(state) {
        dispatch({
            type: "leftNav",
            payload: {
                leftPage: state,
            },
        });
    }

    return (
        <nav id="leftNavbarBarSpace" className="block w-full rounded-t-xl h-12 bg-fg-white-90 drop-shadow-md">
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
    );
}
