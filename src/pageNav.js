import React from "react";
import "./pageNav.css";

export default function PageNav() {
    return (
        <nav id="pageNav" className="bg-fg-white-95 h-16  w-full rounded-xl mt-8">
            <div className="flex divide-x-2 divide-fg-white-70 h-full">
                <div className="w-1/6 my-auto flex justify-center items-center">
                    <button className="rounded-full bg-fg-white-90 h-10 w-10 text-sm">Pic</button>
                    <button className="ml-2 text-base">Profile</button>
                </div>
                <div className="w-1/6 my-auto flex justify-center items-center">
                    <button id="homeButton"></button>
                    <button className="ml-1 text-base underline-offset-8 underline decoration-fg-primary decoration-2">Home</button>
                </div>
                <div className="w-1/6 my-auto flex justify-center items-center">
                    <button id="messagesButton"></button>
                    <button className="ml-1 text-base">Messages</button>
                </div>
                <div className="w-1/6 my-auto flex justify-center items-center">
                    <button id="dogEarsButton"></button>
                    <button className="ml-1 text-base">Dog-Ears</button>
                </div>
                <div className="w-1/6 my-auto flex justify-center items-center">
                    <button id="notificationsButton"></button>
                    <button className="ml-1 text-base">Notificiations</button>
                </div>
                <div className="w-1/6 my-auto flex justify-center items-center">
                    <button id="settingsButton"></button>
                    <button className="ml-1 text-base">Settings</button>
                </div>
            </div>
        </nav>
    )
}