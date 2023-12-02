import React from "react";
import "./leftSpace.css";

import { useState, useEffect } from 'react';

export default function LeftSpace() {
    return (
        <div id="leftSpace" className="rounded-xl overflow-hidden">
            <LeftSpaceNav />
            <div id="leftSpaceContentContainer" style={{ height: `calc(100% - 3rem)` }}>
                <CustomVerticalSplitPane />
            </div>
        </div>
    )
}

function CustomVerticalSplitPane() {
    const [isResizing, setIsResizing] = useState(false);
    const [initialMousePosition, setInitialMousePosition] = useState(0);
    const [initialPaneHeight, setInitialPaneHeight] = useState(0);
    const [paneHeight, setPaneHeight] = useState('60%');

    const handleMouseMove = (event) => {
        if (isResizing) {
            const containerHeight = document.getElementById("leftSpaceContentContainer").offsetHeight;
            const mouseY = event.clientY;
            const mouseYDelta = mouseY - initialMousePosition;

            // Adjust the speed by fiddling with the sensetivity factor
            const sensitivityFactor = 1;
            let newPaneHeight = initialPaneHeight + (mouseYDelta / containerHeight) * 100 * sensitivityFactor;

            // Cap the newPaneHeight to a maximum value
            const maxPaneHeight = 100;
            newPaneHeight = Math.min(newPaneHeight, maxPaneHeight);

            const minPaneHeight = 15;
            newPaneHeight = Math.max(newPaneHeight, minPaneHeight);

            setPaneHeight(`${newPaneHeight}%`);
        }
    };

    const handleMouseUp = () => {
        setIsResizing(false);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    const handleMouseDown = (event) => {
        setIsResizing(true);
        setInitialMousePosition(event.clientY);
        setInitialPaneHeight(parseFloat(paneHeight) || 0);
    };

    return (
        <div className="vertical-split-pane">
            <div className="pane" style={{ height: paneHeight }}>
                <IndividualCards />
            </div>
            <div className="resizer" onMouseDown={handleMouseDown}>
                <IndividualRecHeader />
            </div>
            <div className="pane" style={{ height: `calc(100% - ${paneHeight} - 2.25rem)` }}>
                <IndividualRecs />
            </div>
        </div>
  );
};

function IndividualRecHeader () {
    return (
        <div id="individualRecHeader" className="h-9 bg-fg-white-90 flex drop-shadow-md">
            <div className="grow my-auto grid place-items-start ml-5 text-lg pt-1">
                <p>Recommendations...</p>
            </div>
            <div className="grow my-auto grid place-items-end mr-5">
                <button className="bg-fg-black-20 h-2 w-10 rounded"></button>
            </div>
        </div>
    )
}

function LeftSpaceNav() {
    return (
        <nav id="leftSelectionBarSpace" className="block w-full rounded-t-xl h-12 bg-fg-white-90 drop-shadow-md">
            <div className="flex divide-x-2 divide-fg-white-70 h-full">
                <div className="w-1/3 my-auto grid place-items-center">
                    <button className="text-lg underline-offset-8 underline decoration-fg-primary decoration-2">Individuals</button>
                </div>
                <div className="w-1/3 my-auto grid place-items-center">
                    <button className="text-lg">Groups</button>
                </div>
                <div className="w-1/3 my-auto grid place-items-center">
                    <button className="text-lg">Organizations</button>
                </div>
            </div>
        </nav>
    )
}

function IndividualRecs() {
    return (
        <div id="individualRecs" className="mr-3 h-full overflow-scroll">
            <div class="individualRecCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualRecFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualRecInfo" className="m-2">
                    <p class="individualRecName" className="font-Josefin text-xl">Paula Anderson</p>
                    <p class="individualRecCurrentIssue" className="font-K2D text-xs text-fg-black-30">How do we Address the World Burning?</p>
                </div>
            </div>
            <div class="individualRecCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualRecFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualRecInfo" className="m-2">
                    <p class="individualRecName" className="font-Josefin text-xl">Jameson Friday</p>
                    <p class="individualRecCurrentIssue" className="font-K2D text-xs text-fg-black-30">Fights Abroad, but are they Our Fight?</p>
                </div>
            </div>
            <div class="individualRecCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualRecFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualRecInfo" className="m-2">
                    <p class="individualRecName" className="font-Josefin text-xl">Jimmy Page</p>
                    <p class="individualRecCurrentIssue" className="font-K2D text-xs text-fg-black-30">Capital Hill or Crap-ital Hill?</p>
                </div>
            </div>
            <div class="individualRecCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualRecFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualRecInfo" className="m-2">
                    <p class="individualRecName" className="font-Josefin text-xl">Johnson Black</p>
                    <p class="individualRecCurrentIssue" className="font-K2D text-xs text-fg-black-30">What Should Public Schools be Allowed to Teach?</p>
                </div>
            </div>
            <div class="individualRecCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualRecFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualRecInfo" className="m-2">
                    <p class="individualRecName" className="font-Josefin text-xl">Sara Goodman</p>
                    <p class="individualRecCurrentIssue" className="font-K2D text-xs text-fg-black-30">How will the New Pope Handle the Growing Schism?</p>
                </div>
            </div>
            <div class="individualRecCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualRecFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualRecInfo" className="m-2">
                    <p class="individualRecName" className="font-Josefin text-xl">Pearson Wright</p>
                    <p class="individualRecCurrentIssue" className="font-K2D text-xs text-fg-black-30">Is Partisan-ism Tearing America Apart?</p>
                </div>
            </div>
            <div class="individualRecCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualRecFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualRecInfo" className="m-2">
                    <p class="individualRecName" className="font-Josefin text-xl">Wayne Yorick</p>
                    <p class="individualRecCurrentIssue" className="font-K2D text-xs text-fg-black-30">Are Reporters Dangerous or Working with the Government?</p>
                </div>
            </div>
            <div class="individualRecCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualRecFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualRecInfo" className="m-2">
                    <p class="individualRecName" className="font-Josefin text-xl">Sasha Kain</p>
                    <p class="individualRecCurrentIssue" className="font-K2D text-xs text-fg-black-30">Should America send Relief to Japan?</p>
                </div>
            </div>
        </div>
    )
}

function IndividualCards() {
    return (
        <div id="individualCards" className="h-full mr-3 overflow-scroll">
            <div class="individualCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualInfo" className="m-2">
                    <p class="individualName" className="font-Josefin text-xl">Paula Anderson</p>
                    <p class="individualCurrentIssue" className="font-K2D text-xs text-fg-black-30">How do we Address the World Burning?</p>
                </div>
            </div>
            <div class="individualCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualInfo" className="m-2">
                    <p class="individualName" className="font-Josefin text-xl">Jameson Friday</p>
                    <p class="individualCurrentIssue" className="font-K2D text-xs text-fg-black-30">Fights Abroad, but are they Our Fight?</p>
                </div>
            </div>
            <div class="individualCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualInfo" className="m-2">
                    <p class="individualName" className="font-Josefin text-xl">Jimmy Page</p>
                    <p class="individualCurrentIssue" className="font-K2D text-xs text-fg-black-30">Capital Hill or Crap-ital Hill?</p>
                </div>
            </div>
            <div class="individualCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualInfo" className="m-2">
                    <p class="individualName" className="font-Josefin text-xl">Johnson Black</p>
                    <p class="individualCurrentIssue" className="font-K2D text-xs text-fg-black-30">What Should Public Schools be Allowed to Teach?</p>
                </div>
            </div>
            <div class="individualCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualInfo" className="m-2">
                    <p class="individualName" className="font-Josefin text-xl">Sara Goodman</p>
                    <p class="individualCurrentIssue" className="font-K2D text-xs text-fg-black-30">How will the New Pope Handle the Growing Schism?</p>
                </div>
            </div>
            <div class="individualCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualInfo" className="m-2">
                    <p class="individualName" className="font-Josefin text-xl">Pearson Wright</p>
                    <p class="individualCurrentIssue" className="font-K2D text-xs text-fg-black-30">Is Partisan-ism Tearing America Apart?</p>
                </div>
            </div>
            <div class="individualCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualInfo" className="m-2">
                    <p class="individualName" className="font-Josefin text-xl">Wayne Yorick</p>
                    <p class="individualCurrentIssue" className="font-K2D text-xs text-fg-black-30">Are Reporters Dangerous or Working with the Government?</p>
                </div>
            </div>
            <div class="individualCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualInfo" className="m-2">
                    <p class="individualName" className="font-Josefin text-xl">Sasha Kain</p>
                    <p class="individualCurrentIssue" className="font-K2D text-xs text-fg-black-30">Should America send Relief to Japan?</p>
                </div>
            </div>
            <div class="individualCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualInfo" className="m-2">
                    <p class="individualName" className="font-Josefin text-xl">Paula Anderson</p>
                    <p class="individualCurrentIssue" className="font-K2D text-xs text-fg-black-30">How do we Address the World Burning?</p>
                </div>
            </div>
            <div class="individualCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualInfo" className="m-2">
                    <p class="individualName" className="font-Josefin text-xl">Paula Anderson</p>
                    <p class="individualCurrentIssue" className="font-K2D text-xs text-fg-black-30">How do we Address the World Burning?</p>
                </div>
            </div>
            <div class="individualCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualInfo" className="m-2">
                    <p class="individualName" className="font-Josefin text-xl">Paula Anderson</p>
                    <p class="individualCurrentIssue" className="font-K2D text-xs text-fg-black-30">How do we Address the World Burning?</p>
                </div>
            </div>
            <div class="individualCard" className="bg-white w-fill my-4 mx-6 h-20 flex items-center rounded-md">
                <div class="individualFilePic" className="w-14 h-14 bg-fg-white-85 ml-4 mr-6 rounded-full grid place-items-center">
                    <p>pic</p>
                </div>
                <div class="individualInfo" className="m-2">
                    <p class="individualName" className="font-Josefin text-xl">Paula Anderson</p>
                    <p class="individualCurrentIssue" className="font-K2D text-xs text-fg-black-30">How do we Address the World Burning?</p>
                </div>
            </div>
        </div>
    )
}