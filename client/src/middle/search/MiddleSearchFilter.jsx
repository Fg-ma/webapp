import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { toggleDrop, setFilterOption, applyFilterOptions, clearFilterOptions, cancelFilterChanges } from "../../redux/filters/filterActions";
import MiddleAddAdvancedSearchFilter from "./MiddleAddAdvancedSearchFilter";
import MiddleAdvancedSearchFilter from "./MiddleAdvancedSearchFilter";
import Checkbox from "../../components/checkbox/Checkbox";

const middleAdvancedSearchFilterVar = {
    init: { 
        y: "25%", 
        opacity: 0,
    },
    animate: { 
        y: 0, 
        opacity: 1,
     },
    transition: { 
        duration: 0.85, 
        ease: "easeOut",
    },
};

export default function MiddleSearchFilter({ refs }) {

    /* 
        Description:   
            Creates the middle search filter form and sets the state using redux.
        Unique Properties:
            Only applied filters will save.
    */

    const dispatch = useDispatch();
    const filterFormData = useSelector(state => state.filters.middle.filterPayload);
    const [middleAdvancedSearchFilterVisible, setMiddleAdvancedSearchFilterVisible] = useState(false);
    const [hovering, setHovering] = useState({
        middleIsWhatsCurrent: false,
        middleIsAffiliateActivity: false,
        middleIsAllTimeGreats: false,
        middleIsDatePosted: false,
        middleIsPopularity: false,
    });

    // Used to stop MiddleAddAdvancedSearchFilter from rendering before MiddleAdvancedSearchFilter has had a chance to exit
    useEffect(() => {
        if (filterFormData.isAdvancedSearch) {
            setMiddleAdvancedSearchFilterVisible(filterFormData.isAdvancedSearch);
        }
    }, [filterFormData.isAdvancedSearch]);

    function handleFilterFormChange (event) {
        const { name, type, checked, value } = event.target;
        dispatch(setFilterOption('middle', name, type === 'checkbox' ? checked : value));
    };

    function handleApplyFilterOptions () {
        dispatch(applyFilterOptions('middle', filterFormData));
    };

    function handleClearFilterForm () {
        dispatch(clearFilterOptions('middle'));
    };

    function handleCancelFilterChanges () {
        dispatch(cancelFilterChanges('middle'));
    };

    function handleDrop () {
        dispatch(toggleDrop('middle', 'isDropFilter'));
    };

    // Handles detecting hovers so the proper styles can be applied in the Checkbox component
    const handleCheckboxStartHover = (event) => {
        const { id } = event.target;
        setHovering(prev => ({
            ...prev,
            [id]: true,
        }));
    };

    const handleCheckboxEndHover = (event) => {
        const { id } = event.target;
        setHovering(prev => ({
            ...prev,
            [id]: false,
        }));
    };

    return (
        <div ref={refs.middleSpaceFilter} className="w-full bg-white rounded-md mt-2 shadow-md">
            <form className="flex h-full p-4">
                <div className="bg-white flex flex-col pr-6 justify-between" style={{ width: "55%" }}>
                    <div>
                        <p className="text-2xl mb-1">Filter by</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center">
                                <input 
                                    type="checkbox"
                                    id="middleIsWhatsCurrentInput"
                                    name="isWhatsCurrent"
                                    className="hidden"
                                    checked={filterFormData.isWhatsCurrent}
                                    onChange={handleFilterFormChange}
                                />
                                <motion.label 
                                    id="middleIsWhatsCurrent"
                                    htmlFor="middleIsWhatsCurrentInput"
                                    className="relative flex items-center cursor-pointer"
                                    onHoverStart={handleCheckboxStartHover}
                                    onHoverEnd={handleCheckboxEndHover}
                                >
                                    <Checkbox checked={filterFormData.isWhatsCurrent} hovering={hovering.middleIsWhatsCurrent} />
                                    <span className="text-base ml-2 font-K2D">What's Current</span>
                                </motion.label>
                            </div>
                            <div className="flex items-center">
                                <input 
                                    type="checkbox"
                                    id="middleIsAffiliateActivityInput"
                                    name="isAffiliateActivity"
                                    className="hidden"
                                    checked={filterFormData.isAffiliateActivity}
                                    onChange={handleFilterFormChange}
                                />
                                <motion.label 
                                    id="middleIsAffiliateActivity"
                                    htmlFor="middleIsAffiliateActivityInput" 
                                    className="relative flex items-center cursor-pointer"
                                    onHoverStart={handleCheckboxStartHover}
                                    onHoverEnd={handleCheckboxEndHover}
                                >
                                    <Checkbox checked={filterFormData.isAffiliateActivity} hovering={hovering.middleIsAffiliateActivity}/>
                                    <span className="text-base ml-2 font-K2D">Affiliate Activity</span>
                                </motion.label>
                            </div>
                            <div className="flex items-center">
                                <input 
                                    type="checkbox"
                                    id="middleIsAllTimeGreatsInput"
                                    name="isAllTimeGreats"
                                    className="hidden"
                                    checked={filterFormData.isAllTimeGreats}
                                    onChange={handleFilterFormChange}
                                />
                                <motion.label 
                                    id="middleIsAllTimeGreats"
                                    htmlFor="middleIsAllTimeGreatsInput" 
                                    className="relative flex items-center cursor-pointer"
                                    onHoverStart={handleCheckboxStartHover}
                                    onHoverEnd={handleCheckboxEndHover}
                                >
                                    <Checkbox checked={filterFormData.isAllTimeGreats} hovering={hovering.middleIsAllTimeGreats} />
                                    <span className="text-base ml-2 font-K2D">All Time Greats</span>
                                </motion.label>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox"
                                        id="middleIsDatePostedInput"
                                        name="isDatePosted"
                                        className="hidden"
                                        checked={filterFormData.isDatePosted}
                                        onChange={handleFilterFormChange}
                                    />
                                    <motion.label 
                                        id="middleIsDatePosted"
                                        htmlFor="middleIsDatePostedInput" 
                                        className="relative flex items-center cursor-pointer"
                                        onHoverStart={handleCheckboxStartHover}
                                        onHoverEnd={handleCheckboxEndHover}
                                    >
                                        <Checkbox checked={filterFormData.isDatePosted} hovering={hovering.middleIsDatePosted} />
                                        <span className="text-base ml-2 font-K2D">Date Posted</span>
                                    </motion.label>
                                </div>
                                {filterFormData.isDatePosted && 
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            className="datePostedCheckBox" 
                                            name="isDatePostedSwitched" 
                                            checked={filterFormData.isDatePostedSwitched}
                                            onChange={handleFilterFormChange}
                                        />
                                        <span className="slider round"></span>
                                        <div className="inline w-40">
                                            <div className="inline-block w-1/2 text-center">
                                                <span className="middleLabelText newest">Newest</span>
                                            </div>
                                            <div className="inline-block w-1/2 text-center">
                                                <span className="middleLabelText oldest">Oldest</span>
                                            </div>
                                        </div>
                                    </label>
                                }
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox"
                                        id="middleIsPopularityInput"
                                        name="isPopularity"
                                        className="hidden"
                                        checked={filterFormData.isPopularity}
                                        onChange={handleFilterFormChange}
                                    />
                                    <motion.label 
                                        id="middleIsPopularity"
                                        htmlFor="middleIsPopularityInput" 
                                        className="relative flex items-center cursor-pointer"
                                        onHoverStart={handleCheckboxStartHover}
                                        onHoverEnd={handleCheckboxEndHover}
                                    >
                                        <Checkbox checked={filterFormData.isPopularity} hovering={hovering.middleIsPopularity} />
                                        <span className="text-base ml-2 font-K2D">Popularity</span>
                                    </motion.label>
                                </div>
                                {filterFormData.isPopularity &&
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            className="popularityCheckBox"
                                            name="isPopularitySwitched" 
                                            checked={filterFormData.isPopularitySwitched}
                                            onChange={handleFilterFormChange}
                                        />
                                        <span className="slider round"></span>
                                        <div className="inline w-40">
                                            <div className="inline-block w-1/2 text-center">
                                                <span className="middleLabelText upVotes">Up Votes</span>
                                            </div>
                                            <div className="inline-block w-1/2 text-center">
                                                <span className="middleLabelText downVotes">Down Votes</span>
                                            </div>
                                        </div>
                                    </label>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="mt-3.5 flex space-x-4">
                        <div className="flex justify-center items-center" style={{ width: "5.25rem", height: "2.25rem" }}>
                            <motion.input 
                                type="button" 
                                value="Apply" 
                                className="text-sm font-K2D w-20 h-8 rounded-full bg-fg-primary text-white cursor-pointer"
                                onClick={() => { handleApplyFilterOptions(); handleDrop(); }}
                                whileHover={{ width: "5.25rem", height: "2.25rem" }}
                                transition={{ duration: 0.1, }}
                            />
                        </div>
                        <div className="flex justify-center items-center" style={{ width: "5.25rem", height: "2.25rem" }}>
                            <motion.input 
                                type="button" 
                                value="Clear" 
                                className="text-sm font-K2D w-20 h-8 rounded-2xl bg-fg-secondary text-white cursor-pointer"
                                onClick={handleClearFilterForm}
                                whileHover={{ width: "5.25rem", height: "2.25rem" }}
                                transition={{ duration: 0.1, }}
                            />
                        </div>
                        <div className="flex justify-center items-center" style={{ width: "5.25rem", height: "2.25rem" }}>
                            <motion.input 
                                type="button" 
                                value="Cancel" 
                                className="text-sm font-K2D w-20 h-8 rounded-2xl bg-fg-black-25 text-white cursor-pointer"
                                onClick={() => { handleCancelFilterChanges(); handleDrop(); }}
                                whileHover={{ width: "5.25rem", height: "2.25rem" }}
                                transition={{ duration: 0.1, }}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center" style={{ width: "45%"}}>
                    <AnimatePresence onExitComplete={() => {setMiddleAdvancedSearchFilterVisible(false)}}>
                        {filterFormData.isAdvancedSearch && (
                            <motion.div
                                variants={middleAdvancedSearchFilterVar}
                                initial="init"
                                animate="animate"
                                transition="transition"
                                exit="init"
                            >
                                <MiddleAdvancedSearchFilter
                                    handleFilterFormChange={handleFilterFormChange}
                                    refs={{
                                        middleAdvancedSearchFilter: refs.middleAdvancedSearchFilter,
                                        middleDateRange: refs.middleDateRange,
                                        middleDateRangeCaptionDropdown: refs.middleDateRangeCaptionDropdown,
                                        middleAdvancedFilterDropdownDropRef: refs.middleAdvancedFilterDropdownDropRef,
                                    }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {!filterFormData.isAdvancedSearch && !middleAdvancedSearchFilterVisible && (
                        <MiddleAddAdvancedSearchFilter
                            middleAddAdvancedSearchFilterRef={
                                refs.middleAddAdvancedSearchFilter
                            }
                        />
                    )}
                </div>
            </form>
        </div>
    )
}