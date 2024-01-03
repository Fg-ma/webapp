import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setPageState } from "../../redux/pageState/pageStateActions";

const indNavButtonsVar = {
    init: {
        fontSize: "1.5rem",
        lineHeight: "2rem",
        textDecorationLine: "underline",
        textDecorationColor: "rgba(44, 146, 245, 0)",
        textDecorationThickness: "2px",
        textUnderlineOffset: "8px",
    },
    hover: {
        textDecorationColor: "rgba(44, 146, 245, 1)",
        fontSize: "1.375rem",
        lineHeight: "1.875rem",
        paddingLeft: "0.25rem",
        paddingRight: "0.25rem",
    },
    transition: { 
        ease: "easeOut", 
        duration: 0.1,
    },
};

const collectionsButtonsVar = {
    hover: {
        textDecorationColor: "rgba(44, 146, 245, 1)",
    },
    transition: { 
        ease: "easeOut", 
        duration: 0.1,
    },
};

export default function individualsPage() {

    const dispatch = useDispatch();
    const individualsPageState = useSelector((state) => state.page.individuals.pagePayload.pageState);

    const deactiveStyles = {};
    const activeStyles = {
        textDecorationLine: "underline",
        textDecorationColor: "#F56114",
        textUnderlineOffset: "8px",
        textDecorationThickness: "2px",
        paddingBottom: "0.25rem",
    };
    const individualsPageStyles = {
        articles: deactiveStyles,
        videos: deactiveStyles,
        images: deactiveStyles,
    };

    individualsPageStyles[individualsPageState] = { ...activeStyles };

    function swapPageState(newState) {
        dispatch(setPageState('individuals', newState));
    };

    return (
        <div className="h-full w-full rounded-xl overflow-hidden">
            <div className="mr-3" style={{ height: `calc(100% - 2.5rem)`}}>
                <div className="overflow-y-scroll h-full w-full">
                    <div className="ml-8 mr-4 pr-6 pl-6 mt-8 pt-8 bg-white rounded-lg overflow-hidden">
                        <div className="flex items-center">
                            <div className="w-24 aspect-square rounded-full bg-fg-white-85 mr-8"></div>
                                <div className="h-fit">
                                    <p className="text-4xl mb-1">Paula Anderson</p>
                                    <div className="flex space-x-6">
                                <div className="h-8 aspect-square bg-fg-white-85 rounded-full"></div>
                                <div className="h-8 aspect-square bg-fg-white-85 rounded-lg"></div>
                                <div className="h-8 aspect-square bg-fg-white-85 rounded-sm"></div>
                                <div className="h-8 aspect-square bg-fg-white-85 rounded-lg"></div>
                                <div className="h-8 aspect-square bg-fg-white-85 rounded-full"></div>
                                <div className="h-8 aspect-square bg-fg-white-85 rounded-full"></div>
                                <div className="h-8 aspect-square bg-fg-white-85 rounded-sm"></div>
                                </div>
                            </div>
                        </div>
                        <p className="text-xl mt-4">paula_anderson123</p>
                        <p className="text-2xl font-bold mt-2">How do we Address the World Burning?</p>
                        <p className="text-xl font-K2D line-clamp-2 mt-1">Chairperson for PETA, Lobbyist on Capital Hill, President of Local Chapter of the National Pet Alliance</p>
                        <p className="text-base font-K2D mt-4">🌎 Passionate Advocate for Change | Chairperson @PETA | Lobbyist on Capitol Hill | President @NationalPetAlliance Local Chapter | 🐾 Dedicated to Animal Welfare | 🌱 Environmental Enthusiast | Seeking Solutions for a Sustainable Future | Let's Address the World Burning Together! 🔥✨ #AnimalRights #EnvironmentalAdvocacy #SustainableLiving</p>
                        <p className="text-base font-K2D mt-4">Eating Animals" by Jonathan Safran Foer,  "Silent Spring" by Rachel Carson, "The Sixth Extinction: An Unnatural History" by Elizabeth Kolbert</p>
                        <div className="space-x-6 font-K2D mt-6 flex items-center justify-center">
                            <button className="w-1/5 h-9 rounded-md bg-fg-primary text-white">Affiliate with</button>
                            <button className="w-1/5 h-9 rounded-md bg-fg-white-95">Message</button>
                            <button className="w-1/5 h-9 rounded-md bg-fg-white-95">Email</button>
                            <button className="w-1/5 h-9 rounded-md bg-fg-white-95">Contact</button>
                        </div>
                        <div className="mt-6 mb-1 flex items-center justify-center">
                            <div className="w-1/3 flex items-center justify-center font-bold">
                                <motion.button 
                                    className="h-8"
                                    style={individualsPageStyles["articles"]}
                                    variants={indNavButtonsVar}
                                    initial="init"
                                    whileHover="hover"
                                    transition={indNavButtonsVar.transition}
                                    onClick={swapPageState("articles")}
                                >
                                    Articles
                                </motion.button>
                            </div>
                            <div className="w-1/3 flex items-center justify-center font-bold">
                                <motion.button 
                                    className="h-8"
                                    style={individualsPageStyles["videos"]}
                                    variants={indNavButtonsVar}
                                    initial="init"
                                    whileHover="hover"
                                    transition={indNavButtonsVar.transition}
                                    onClick={swapPageState("videos")}
                                >
                                    Videos
                                </motion.button>
                            </div>
                            <div className="w-1/3 flex items-center justify-center font-bold">
                                <motion.button 
                                    className="h-8"
                                    style={individualsPageStyles["images"]}
                                    variants={indNavButtonsVar}
                                    initial="init"
                                    whileHover="hover"
                                    transition={indNavButtonsVar.transition}
                                    onClick={swapPageState("images")}
                                >
                                    Images
                                </motion.button>
                            </div>
                        </div>
                        <div className="h-0.5 w-full bg-fg-black-25 rounded-full"></div>
                        <div className="h-10 mt-2 mb-4 space-x-6 flex items-center justify-start">
                            <button className="h-7 aspect-square bg-fg-white-90 rounded bg-cover bg-no-repeat" style={{ backgroundImage: 'url("/assets/icons/plus.svg")' }}></button>
                            <motion.button 
                                className="font-K2D text-lg underline decoration-2 mb-2" 
                                style={{ textUnderlineOffset: '6px' }}
                                variants={collectionsButtonsVar}
                                whileHover="hover"
                                transition={collectionsButtonsVar.transition}
                            >
                                Proper Pet Care
                            </motion.button>
                            <motion.button 
                                className="font-K2D text-lg underline decoration-2 mb-2" 
                                style={{ textUnderlineOffset: '6px' }}
                                variants={collectionsButtonsVar}
                                whileHover="hover"
                                transition={collectionsButtonsVar.transition}
                            >
                                Overflowing Pounds in San Fran
                            </motion.button>
                            <motion.button 
                                className="font-K2D text-lg underline decoration-2 mb-2" 
                                style={{ textUnderlineOffset: '6px' }}
                                variants={collectionsButtonsVar}
                                whileHover="hover"
                                transition={collectionsButtonsVar.transition}
                            >
                                Puppy Pics
                            </motion.button>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="shadow rounded flex flex-col justify-center">
                                <div className="bg-fg-white-85 w-3/4 aspect-square rounded-md mx-auto mt-5 mb-3"></div>
                                <p className="text-base font-bold leading-5 text-center mx-4 h-[3.75rem] line-clamp-3 mb-1">Global Warming’s Affects on Gazelles in Africa things things things things things things things things</p>
                                <p className="text-sm font-K2D text-center mb-3">Creator</p>
                            </div>
                            <div className="shadow rounded flex flex-col justify-center">
                                <div className="bg-fg-white-85 w-3/4 aspect-square rounded-md mx-auto mt-5 mb-3"></div>
                                <p className="text-base font-bold leading-5 text-center mx-4 h-[3.75rem] line-clamp-3 mb-1">Global Warming’s Affects on Gazelles in Africa things things things things things things things things</p>
                                <p className="text-sm font-K2D text-center mb-3">Creator</p>
                            </div>
                            <div className="shadow rounded flex flex-col justify-center">
                                <div className="bg-fg-white-85 w-3/4 aspect-square rounded-md mx-auto mt-5 mb-3"></div>
                                <p className="text-base font-bold leading-5 text-center mx-4 h-[3.75rem] line-clamp-3 mb-1">Global Warming’s Affects on Gazelles in Africa things things things things things things things things</p>
                                <p className="text-sm font-K2D text-center mb-3">Creator</p>
                            </div>
                            <div className="shadow rounded flex flex-col justify-center">
                                <div className="bg-fg-white-85 w-3/4 aspect-square rounded-md mx-auto mt-5 mb-3"></div>
                                <p className="text-base font-bold leading-5 text-center mx-4 h-[3.75rem] line-clamp-3 mb-1">Global Warming’s Affects on Gazelles in Africa things things things things things things things things</p>
                                <p className="text-sm font-K2D text-center mb-3">Creator</p>
                            </div>
                            <div className="shadow rounded flex flex-col justify-center">
                                <div className="bg-fg-white-85 w-3/4 aspect-square rounded-md mx-auto mt-5 mb-3"></div>
                                <p className="text-base font-bold leading-5 text-center mx-4 h-[3.75rem] line-clamp-3 mb-1">Global Warming’s Affects on Gazelles in Africa things things things things things things things things</p>
                                <p className="text-sm font-K2D text-center mb-3">Creator</p>
                            </div>
                            <div className="shadow rounded flex flex-col justify-center">
                                <div className="bg-fg-white-85 w-3/4 aspect-square rounded-md mx-auto mt-5 mb-3"></div>
                                <p className="text-base font-bold leading-5 text-center mx-4 h-[3.75rem] line-clamp-3 mb-1">Global Warming’s Affects on Gazelles in Africa things things things things things things things things</p>
                                <p className="text-sm font-K2D text-center mb-3">Creator</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-10 bg-fg-white-85 flex items-center justify-between">
                <button className="h-10 aspect-square bg-cover bg-no-repeat ml-2" style={{ backgroundImage: 'url("/assets/icons/navigateBack.svg")' }}></button>
                <p className="text-3xl mt-2">Paula Anderson</p>
                <button className="h-8 aspect-square bg-cover bg-no-repeat mr-4" style={{ backgroundImage: 'url("/assets/icons/moreHorizontal.svg")' }}></button>
            </div>
        </div>
    );
};