import React, { useState } from "react";
import MiddleSearchBar from "./MiddleSearchBar"

export default function MiddleDrop() {
    const [dropped, setDropped] = useState(false)

    function handleDrop() {
        setDropped(!dropped)
    }

    const getDropIcon = () => {
        if (dropped) {
            return 180;
        } else {
            return 0;
        }
    };

    return (
        <div id="dropContainer" className="flex flex-col justify-center items-center">
            <button className="relative h-12 aspect-square bg-225 bg-no-repeat bg-center mb-2" style={{ backgroundImage: "url('assets/icons/dropDown.svg')", transform: `rotate(${getDropIcon()}deg)`,  }} onClick={handleDrop}></button>
            {dropped ? <MiddleSearchBar /> : null}
        </div>
    )
}