import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLeftNav } from "../redux/pageState/pageStateActions";

export default function LeftNav() {

    /* 
        Description:   
            A navbar that cycles between individuals, groups, and organizations. The currently 
            selected item is underlined in fg-primary. It also sets the state in redux to 
            determine what should be displayed in the top and bottom panes of LeftVerticalSplitPane.
        Unique Properties:
            N/A
    */
   
    const deactiveStyles = {};
    const activeStyles = {
        textDecorationLine: "underline",
        textDecorationColor: "#F56114",
        textUnderlineOffset: "8px",
        textDecorationThickness: "2px",
    };

    const dispatch = useDispatch();

    const leftPage = useSelector((state) => state.page.leftPagePayload.leftPageState);

    const leftStyles = {
        individuals: deactiveStyles,
        groups: deactiveStyles,
        organizations: deactiveStyles,
    };

    leftStyles[leftPage] = { ...activeStyles };


    function swapLeftState(state) {
        dispatch(setLeftNav(state));
    }

    return (
        <nav id="leftNavbarBarSpace" className="relative z-50 block w-full rounded-t-xl h-12 bg-fg-white-90 drop-shadow-md">
            <div className="flex divide-x-2 divide-fg-white-70 h-full drop-shadow-md">
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
