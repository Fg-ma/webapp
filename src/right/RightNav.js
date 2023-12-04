import React from "react";

export default function RightNav() {
    return (
        <nav id="rightSelectionBarSpace" className="block w-full rounded-t-xl h-12 bg-fg-white-90 drop-shadow-md">
            <div className="flex divide-x-2 divide-fg-white-70 h-full">
                <div className="w-1/4 my-auto flex justify-center items-center">
                    <button className="text-lg underline-offset-8 underline decoration-fg-primary decoration-2">News</button>
                </div>
                <div className="w-1/4 my-auto flex justify-center items-center">
                    <button className="text-lg">Explore</button>
                </div>
                <div className="w-1/4 my-auto flex justify-center items-center">
                    <button className="text-lg">Messages</button>
                </div>
                <div className="w-1/4 my-auto flex justify-center items-center">
                    <button className="text-lg">Dog-Ears</button>
                </div>
            </div>
        </nav>
    )
}