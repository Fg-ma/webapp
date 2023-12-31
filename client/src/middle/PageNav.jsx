import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from 'framer-motion';
import { setPageState } from "../redux/pageState/pageStateActions";

const navButtonsVar = {
    init: {
        fontSize: "1rem",
        lineHeight: "1rem",
        paddingTop: "0.25rem",
        textDecorationLine: "underline",
        textDecorationColor: "rgba(44, 146, 245, 0)",
        textDecorationThickness: "2px",
        textUnderlineOffset: "8px",
    },
    hover: {
        textDecorationColor: "rgba(44, 146, 245, 1)",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        paddingTop: "0rem",
    },
    transition: { 
        ease: "easeOut", 
        duration: 0.1,
    },
};

export default function PageNav() {

    /* 
        Description:   
            Creates the page navbar that appears at the bottom of the middle space
            section. Most of the state changes here will appear to chane the content 
            in the middle space rather than side spaces.
        Unique Properties:
            framer-motion used to control hover styles.
    */

    const dispatch = useDispatch();
    const mainPageState = useSelector((state) => state.page.main.pagePayload.pageState);

    const deactiveStyles = {};
    const activeStyles = {
        textDecorationLine: "underline",
        textDecorationColor: "#F56114",
        textUnderlineOffset: "8px",
        textDecorationThickness: "2px",
        paddingBottom: "0.25rem",
    };
    const mainPageStyles = {
        profile: deactiveStyles,
        home: deactiveStyles,
        messages: deactiveStyles,
        dogEars: deactiveStyles,
        notifications: deactiveStyles,
        settings: deactiveStyles,
    };

    mainPageStyles[mainPageState] = { ...activeStyles };

    function swapPageState(newState) {
        dispatch(setPageState('main', newState));
    };

    return (
        <nav
            id="pageNav"
            className="bg-fg-white-95 h-16  w-full rounded-xl mt-8" 
            style={{ boxShadow: '0px 8px 8px -4px rgba(0, 0, 0, 0.1), 0 6px 6px -4px rgba(0, 0, 0, 0.06)' }}
        >
            <div className="flex divide-x-2 divide-fg-white-70 h-full">
                <motion.div 
                    className="h-11 w-1/6 my-auto flex justify-center items-center cursor-pointer"
                    variants={navButtonsVar}
                    initial="init"
                    whileHover="hover"
                    transition={navButtonsVar.transition}
                    onClick={() => swapPageState('profile')}
                >
                    <button 
                        className="rounded-full bg-fg-white-90 h-10 aspect-square text-sm">
                    </button>
                    <button style={mainPageStyles["profile"]} className="ml-2">Profile</button>
                </motion.div>
                <motion.div 
                    className="h-8 w-1/6 my-auto flex justify-center items-center cursor-pointer"
                    variants={navButtonsVar}
                    initial="init"
                    whileHover="hover"
                    transition={navButtonsVar.transition}
                    onClick={() => swapPageState('home')}
                >
                    <button 
                        className="w-7 aspect-square bg-no-repeat bg-center bg-cover" 
                        style={{ backgroundImage: 'url("/assets/icons/home.svg")' }}>
                    </button>
                    <button style={mainPageStyles["home"]} className="ml-1 pt-1">Home</button>
                </motion.div>
                <motion.div 
                    className="h-8 w-1/6 my-auto flex justify-center items-center cursor-pointer"
                    variants={navButtonsVar}
                    initial="init"
                    whileHover="hover"
                    transition={navButtonsVar.transition}
                    onClick={() => swapPageState('messages')}
                >
                    <button 
                        className="w-7 aspect-square bg-no-repeat bg-center bg-cover" 
                        style={{ backgroundImage: 'url("/assets/icons/messages.svg")' }}>
                    </button>
                    <button style={mainPageStyles["messages"]} className="ml-1 pt-1">Messages</button>
                </motion.div>
                <motion.div 
                    className="h-8 w-1/6 my-auto flex justify-center items-center cursor-pointer"
                    variants={navButtonsVar}
                    initial="init"
                    whileHover="hover"
                    transition={navButtonsVar.transition}
                    onClick={() => swapPageState('dogEars')}
                >
                    <button 
                        className="w-7 aspect-square bg-no-repeat bg-center bg-cover" 
                        style={{ backgroundImage: 'url("/assets/icons/dogEars.svg")' }}>
                    </button>
                    <button style={mainPageStyles["dogEars"]} className="ml-1 pt-1">Dog-Ears</button>
                </motion.div>
                <motion.div 
                    className="h-8 w-1/6 my-auto flex justify-center items-center cursor-pointer"
                    variants={navButtonsVar}
                    initial="init"
                    whileHover="hover"
                    transition={navButtonsVar.transition}
                    onClick={() => swapPageState('notifications')}
                >
                    <button 
                        className="w-7 aspect-square bg-no-repeat bg-center bg-cover" 
                        style={{ backgroundImage: 'url("/assets/icons/notifications.svg")' }}>
                    </button>
                    <button style={mainPageStyles["notifications"]} className="ml-1 pt-1">Notifications</button>
                </motion.div>
                <motion.div 
                    className="h-8 w-1/6 my-auto flex justify-center items-center cursor-pointer"
                    variants={navButtonsVar}
                    initial="init"
                    whileHover="hover"
                    transition={navButtonsVar.transition}
                    onClick={() => swapPageState('settings')}
                >
                    <button 
                        className="w-7 aspect-square bg-no-repeat bg-center bg-cover" 
                        style={{ backgroundImage: 'url("/assets/icons/settings.svg")' }}>
                    </button>
                    <button style={mainPageStyles["settings"]} className="ml-1 pt-1">Settings</button>
                </motion.div>
            </div>
        </nav>
    )
}