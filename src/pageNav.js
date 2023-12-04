import React, { useState } from "react";
import "./pageNav.css";

export default function PageNav() {
    const [pageState, setPageState] = useState("home");

    const deactiveStyles = {};
    const activeStyles = {
        textDecorationLine: "underline",
        textDecorationColor: "#F56114",
        textUnderlineOffset: "8px",
        textDecorationThickness: "2px",
    };

    const pageStyles = {
        profile: deactiveStyles,
        home: deactiveStyles,
        messages: deactiveStyles,
        dogEars: deactiveStyles,
        notifications: deactiveStyles,
        settings: deactiveStyles,
    };

    pageStyles[pageState] = activeStyles;

    function swapPageState(state) {
        setPageState(state);
    };

    return (
        <nav id="pageNav" className="bg-fg-white-95 h-16  w-full rounded-xl mt-8">
            <div className="flex divide-x-2 divide-fg-white-70 h-full">
                <div className="w-1/6 my-auto flex justify-center items-center text-base hover:underline hover:decoration-fg-secondary hover:decoration-2 hover:underline-offset-8 hover:text-sm transition">
                    <button className="rounded-full bg-fg-white-90 h-10 w-10 text-sm"></button>
                    <button style={pageStyles["profile"]} className="ml-2" onClick={() => swapPageState('profile')}>Profile</button>
                </div>
                <div className="w-1/6 my-auto flex justify-center items-center text-base hover:underline hover:decoration-fg-secondary hover:decoration-2 hover:underline-offset-8 hover:text-sm transition">
                    <button id="homeButton"></button>
                    <button style={pageStyles["home"]} className="ml-1" onClick={() => swapPageState('home')}>Home</button>
                </div>
                <div className="w-1/6 my-auto flex justify-center items-center text-base hover:underline hover:decoration-fg-secondary hover:decoration-2 hover:underline-offset-8 hover:text-sm transition">
                    <button id="messagesButton"></button>
                    <button style={pageStyles["messages"]} className="ml-1" onClick={() => swapPageState('messages')}>Messages</button>
                </div>
                <div className="w-1/6 my-auto flex justify-center items-center text-base hover:underline hover:decoration-fg-secondary hover:decoration-2 hover:underline-offset-8 hover:text-sm transition">
                    <button id="dogEarsButton"></button>
                    <button style={pageStyles["dogEars"]} className="ml-1" onClick={() => swapPageState('dogEars')}>Dog-Ears</button>
                </div>
                <div className="w-1/6 my-auto flex justify-center items-center text-base hover:underline hover:decoration-fg-secondary hover:decoration-2 hover:underline-offset-8 hover:text-sm transition">
                    <button id="notificationsButton"></button>
                    <button style={pageStyles["notifications"]} className="ml-1" onClick={() => swapPageState('notifications')}>Notifications</button>
                </div>
                <div className="w-1/6 my-auto flex justify-center items-center text-base hover:underline hover:decoration-fg-secondary hover:decoration-2 hover:underline-offset-8 hover:text-sm transition">
                    <button id="settingsButton"></button>
                    <button style={pageStyles["settings"]} className="ml-1" onClick={() => swapPageState('settings')}>Settings</button>
                </div>
            </div>
        </nav>
    )
}