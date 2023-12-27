import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrop } from "../../redux/filters/filterActions";
import MiddleSearchBar from "./MiddleSearchBar"

export default function MiddleDrop({ middleSpaceContainerRef }) {

    /* 
        Description:   
            Creates the arrow button for opening the MiddleSearchBar.
        Unique Properties:
            N/A
    */

    const dispatch = useDispatch();
    const dropped = useSelector(state => state.filters.middle.isDrop);

    function handleDrop() {
        dispatch(toggleDrop('middle', 'isDrop'));
    }

    const getDropIconRotation = () => {
        if (dropped) {
            return 180;
        } else {
            return 0;
        }
    };

    return (
        <div id="dropContainer" className="flex flex-col justify-center items-center">
            <button 
                className="relative h-12 aspect-square bg-225 bg-no-repeat bg-center mb-2" 
                style={{ backgroundImage: "url('assets/icons/dropDown.svg')", transform: `rotate(${getDropIconRotation()}deg)`  }} 
                onClick={handleDrop}>
            </button>
            {dropped ? <MiddleSearchBar middleSpaceContainerRef={middleSpaceContainerRef} /> : null}
        </div>
    )
}