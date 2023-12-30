import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrop, setFilterOption, applyFilterOptions, clearFilterOptions, cancelFilterChanges } from "../../redux/filters/filterActions";
import MiddleAddAdvancedSearchFilter from "./MiddleAddAdvancedSearchFilter";
import MiddleAdvancedSearchFilter from "./MiddleAdvancedSearchFilter";

export default function MiddleSearchFilter({ refs }) {

    /* 
        Description:   
            Creates the middle search filter form and sets the state using redux.
        Unique Properties:
            Only applied filters will save.
    */

    const dispatch = useDispatch();
    const filterFormData = useSelector(state => state.filters.middle.filterPayload);

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

    return (
        <div ref={refs.middleSpaceFilter} className="w-full bg-white rounded-md mt-2 shadow-md">
            <form className="flex h-full m-4">
                <div className="bg-white flex flex-col pr-6 justify-between" style={{ width: "55%" }}>
                    <div>
                        <p className="text-2xl mb-1">Filter by</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center">
                                <input 
                                    type="checkbox"
                                    id="middleIsWhatsCurrent"
                                    name="isWhatsCurrent"
                                    className="w-5 aspect-square cursor-pointer"
                                    checked={filterFormData.isWhatsCurrent}
                                    onChange={handleFilterFormChange}
                                />
                                <label htmlFor="middleIsWhatsCurrent" className="text-base ml-2 font-K2D cursor-pointer">What's Current</label>
                            </div>
                            <div className="flex items-center">
                                <input 
                                    type="checkbox"
                                    id="middleIsAffiliateActivity"
                                    name="isAffiliateActivity"
                                    className="w-5 aspect-square cursor-pointer"
                                    checked={filterFormData.isAffiliateActivity}
                                    onChange={handleFilterFormChange}
                                />
                                <label htmlFor="middleIsAffiliateActivity" className="text-base ml-2 font-K2D cursor-pointer">Affiliate Activity</label>
                            </div>
                            <div className="flex items-center">
                                <input 
                                    type="checkbox"
                                    id="middleIsAllTimeGreats"
                                    name="isAllTimeGreats"
                                    className="w-5 aspect-square cursor-pointer"
                                    checked={filterFormData.isAllTimeGreats}
                                    onChange={handleFilterFormChange}
                                />
                                <label htmlFor="middleIsAllTimeGreats" className="text-base ml-2 font-K2D cursor-pointer">All Time Greats</label>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox"
                                        id="middleIsDatePosted"
                                        name="isDatePosted"
                                        className="w-5 aspect-square cursor-pointer"
                                        checked={filterFormData.isDatePosted}
                                        onChange={handleFilterFormChange}
                                    />
                                    <label htmlFor="middleIsDatePosted" className="text-base ml-2 font-K2D cursor-pointer">Date Posted</label>
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
                                        id="middleIsPopularity"
                                        name="isPopularity"
                                        className="w-5 aspect-square cursor-pointer"
                                        checked={filterFormData.isPopularity}
                                        onChange={handleFilterFormChange}
                                    />
                                    <label htmlFor="middleIsPopularity" className="text-base ml-2 font-K2D cursor-pointer">Popularity</label>
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
                    <div className="mt-4">
                        <input 
                            type="button" 
                            value="Apply" 
                            className="text-sm font-K2D w-20 h-8 rounded-2xl bg-fg-primary text-white cursor-pointer"
                            onClick={() => { handleApplyFilterOptions(); handleDrop(); }}
                        />
                        <input 
                            type="button" 
                            value="Clear" 
                            className="text-sm font-K2D w-20 h-8 rounded-2xl bg-fg-secondary text-white mx-4 cursor-pointer"
                            onClick={handleClearFilterForm}
                        />
                        <input 
                            type="button" 
                            value="Cancel" 
                            className="text-sm font-K2D w-20 h-8 rounded-2xl bg-fg-black-25 text-white cursor-pointer"
                            onClick={() => { handleCancelFilterChanges(); handleDrop(); }}
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center" style={{ width: "45%" }}>
                    {filterFormData.isAdvancedSearch ? (
                        <MiddleAdvancedSearchFilter
                            handleFilterFormChange={handleFilterFormChange}
                            refs={{
                                middleAdvancedSearchFilter: refs.middleAdvancedSearchFilter,
                                middleDateRange: refs.middleDateRange,
                                middleDateRangeCaptionDropdown: refs.middleDateRangeCaptionDropdown,
                                middleAdvancedFilterDropdownDropRef: refs.middleAdvancedFilterDropdownDropRef,
                            }}
                        />
                    ) : (
                        <MiddleAddAdvancedSearchFilter
                            middleAddAdvancedSearchFilterRef={refs.middleAddAdvancedSearchFilter}
                        />
                    )}
                </div>
            </form>
        </div>
    )
}