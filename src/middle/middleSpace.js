import React, { useState, useEffect } from "react";
import "./middleSpace.css";

export default function MiddleSpace() {
    return (
        <div id="middleSpace" className="rounded-xl moverflow-hidden h-4/5">
            <MiddleDrop />
            <MiddleVerticalSplitPane />
        </div>
    )
}

function MiddleVerticalSplitPane() {
    const [isResizing, setIsResizing] = useState(false);
    const [initialMousePosition, setInitialMousePosition] = useState(0);
    const [initialPaneHeight, setInitialPaneHeight] = useState(0);
    const [paneHeight, setPaneHeight] = useState('79%');

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
                hi
            </div>
            <div className="resizer" onMouseDown={handleMouseDown}>
                <RelatedIssuesHeader />
            </div>
            <div className="pane" style={{ height: `calc(100% - ${paneHeight} - 2.25rem)` }}>
                <RelatedIssues />
            </div>
        </div>
  );
};

function RelatedIssuesHeader () {
    return (
        <div id="relatedIssuesHeader" className="h-9 bg-fg-white-90 flex drop-shadow-md">
            <div className="grow my-auto grid place-items-start ml-5 text-lg pt-1">
                <p>Related Issues</p>
            </div>
            <div className="grow my-auto grid place-items-end mr-5">
                <button className="bg-fg-black-20 h-2 w-10 rounded"></button>
            </div>
        </div>
    )
}

function RelatedIssues() {
    return (
        <div id="individualRecs" className="mr-3 h-full overflow-scroll">
            <div className="bg-white w-fill my-4 mx-6 h-24 flex items-center rounded-md">
                <div className="w-16 aspect-square overflow-clip bg-fg-white-85 ml-3 rounded-sm grid place-items-center">
                    <p>pic</p>
                </div>
                <div className="m-2 w-2/3">
                    <p className="font-Josefin text-xl font-bold">Global Warmings Affects on Gazelles in Africa</p>
                    <p className="font-K2D text-xs text-fg-black-30">Affiliates’ responses: John Smith, GOP, PETA...</p>
                </div>
            </div>
        </div>
    )
}

function MiddleDrop() {
    const [dropped, setDropped] = useState(false)

    function handleDrop() {
        setDropped(!dropped)
    }

    const getDropIcon = () => {
        if (dropped) {
            return 'dropUp.svg';
        } else {
            return 'dropDown.svg';
        }
    };

    return (
        <div id="dropContainer" className="flex flex-col justify-center items-center">
            <button className="relative h-24 aspect-square bg-cover bg-no-repeat" style={{ backgroundImage: `url("assets/icons/${getDropIcon()}")` }} onClick={handleDrop}></button>
            {dropped ? <MiddleSearchBar /> : null}
        </div>
    )
}


function MiddleSearchBar() {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
  
    const handleInputFocus = () => {
        setIsInputFocused(true);
    };
  
    const handleInputBlur = () => {
        setIsInputFocused(false);
    };
  
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
  
    const getSearchIcon = () => {
        if (isInputFocused || inputValue.trim() !== '') {
            return 'searchArrow.svg';
        } else {
            return 'search.svg';
        }
    };
  
    return (
        <form className="w-4/5 h-10 bg-fg-white-85 rounded-md overflow-clip flex items-center">
            <input
                id="middleSearchSubmit"
                type="submit"
                value=""
                className="w-6 h-6 bg-cover bg-no-repeat ml-2"
                style={{ backgroundImage: `url("assets/icons/${getSearchIcon()}")` }}
            />
            <input
                id="middleSearchArea"
                type="text"
                placeholder="Search..."
                className="grow h-full outline-none bg-fg-white-85 placeholder-fg-black-25 text-lg mx-1"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                value={inputValue}
            />
            <input
                id="middleFilterButton"
                type="button"
                className="w-8 h-8 bg-cover bg-no-repeat mr-2"
                style={{ backgroundImage: `url("assets/icons/filter.svg")` }}
            />
        </form>
    );
}