import React from "react";
import "./leftSpace.css";
import LeftVerticalSplitPane from "./LeftVerticalSplitPane";
import LeftNav from "./LeftNav";

export default function LeftSpace() {
    return (
        <div id="leftSpace" className="rounded-xl overflow-hidden h-4/5 shadow-md">
            <LeftNav />
            <div id="leftSpaceContentContainer" style={{ height: `calc(100% - 3rem)` }}>
                <LeftVerticalSplitPane />
            </div>
        </div>
    )
}