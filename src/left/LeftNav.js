import React from "react";

export default function LeftNav() {
    return (
        <nav id="leftSelectionBarSpace" className="block w-full rounded-t-xl h-12 bg-fg-white-90 drop-shadow-md">
            <div className="flex divide-x-2 divide-fg-white-70 h-full">
                <div className="w-1/3 my-auto flex justify-center items-center">
                    <button className="text-lg underline-offset-8 underline decoration-fg-primary decoration-2">Individuals</button>
                </div>
                <div className="w-1/3 my-auto flex justify-center items-center">
                    <button className="text-lg">Groups</button>
                </div>
                <div className="w-1/3 my-auto flex justify-center items-center">
                    <button className="text-lg">Organizations</button>
                </div>
            </div>
        </nav>
    )
}