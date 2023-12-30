import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrop } from "../../redux/filters/filterActions";
import MiddleSearchBar from "./MiddleSearchBar"

export default function MiddleDrop({ middleSpaceContainerRef, middleSpaceRef }) {

    /* 
        Description:   
            Creates the arrow button for opening the MiddleSearchBar.
        Unique Properties:
            Fancy stuff done to the drop button and the reveal of the search bar, but done quickly.
    */

    const dispatch = useDispatch();
    const dropped = useSelector(state => state.filters.middle.isDrop)    
    const [showSearchBar, setShowSearchBar] = useState(false);

    const handleDrop = () => {
        dispatch(toggleDrop('middle', 'isDrop'));
        if (dropped) {
            setTimeout(() => {
                setShowSearchBar(!dropped);
            }, 50);
        } else {
            setTimeout(() => {
                setShowSearchBar(!dropped);
            }, 275);
        }
    };

    const getButtonTransform = () => {
        return dropped ? 'scaleY(-1)' : 'none';
    };

    return (
        <div id="dropContainer" className="flex flex-col justify-center items-center">
            <button 
                className="relative h-12 aspect-square bg-225 bg-no-repeat bg-center mb-2" 
                style={{ 
                    backgroundImage: "url('assets/icons/dropDown.svg')", 
                    transform: `${getButtonTransform()}`,
                    opacity: dropped ? 1 : 0.90,
                    transformOrigin: 'center',
                    transition: 'transform 0.45s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.6s cubic-bezier(0.42, 0, 1, 1)'
                }} 
                onClick={handleDrop}>
            </button>
            {showSearchBar ? <MiddleSearchBar middleSpaceContainerRef={middleSpaceContainerRef} middleSpaceRef={middleSpaceRef} /> : null}
        </div>
    );
};