import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRightNav } from "../redux/pageState/pageStateActions";

export default function RightNav() {

    /* 
        Description:   
            A navbar that cycles between news, explore, messages, and dog ears. The currently 
            selected item is underlined in fg-primary. It also sets the state in redux to 
            determine what should be displayed in the rightSpaceContentContainer.
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

    const rightPage = useSelector((state) => state.page.rightPagePayload.rightPageState);

    const rightStyles = {
        news: deactiveStyles,
        explore: deactiveStyles,
        messages: deactiveStyles,
        dogEars: deactiveStyles,
    };

    // Activate the style for the current rightPage
    rightStyles[rightPage] = { ...activeStyles };


    function swapRightState(state) {
        dispatch(setRightNav(state));
    }

    return (
        <nav id="rightNavbarBarSpace" className="block w-full rounded-t-xl h-12 bg-fg-white-90 drop-shadow-md">
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
    );
}
