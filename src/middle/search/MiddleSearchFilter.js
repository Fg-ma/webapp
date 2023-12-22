import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrop, setFilterOption, applyFilterOptions, clearFilterOptions, cancelFilterChanges } from "../../redux/filters/filterActions";
import MiddleAddAdvancedSearchFilter from "./MiddleAddAdvancedSearchFilter";
import MiddleAdvancedSearchFilter from "./MiddleAdvancedSearchFilter";

export default function MiddleSearchFilter() {

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
        <div className="w-full bg-white rounded-md mt-2 shadow-md">
            <form className="flex h-full m-4">
                <div className="w-3/5 bg-white flex flex-col pr-6 justify-between">
                    <div className="flex flex-col space-y-3 pr-6">
                        <p className="text-2xl">Filter by</p>
                        <div className="flex items-center my-4">
                        <input 
                            type="checkbox"
                            id="isWhatsCurrent"
                            name="isWhatsCurrent"
                            className="w-5 aspect-square cursor-pointer"
                            checked={filterFormData.isWhatsCurrent}
                            onChange={handleFilterFormChange}
                        />
                        <label htmlFor="isWhatsCurrent" className="text-base ml-2 font-K2D cursor-pointer">What's Current</label>
                        </div>
                        <div className="flex items-center my-4">
                        <input 
                            type="checkbox"
                            id="isAffiliateActivity"
                            name="isAffiliateActivity"
                            className="w-5 aspect-square cursor-pointer"
                            checked={filterFormData.isAffiliateActivity}
                            onChange={handleFilterFormChange}
                        />
                        <label htmlFor="isAffiliateActivity" className="text-base ml-2 font-K2D cursor-pointer">Affiliate Activity</label>
                        </div>
                        <div className="flex items-center my-4">
                        <input 
                            type="checkbox"
                            id="isAllTimeGreats"
                            name="isAllTimeGreats"
                            className="w-5 aspect-square cursor-pointer"
                            checked={filterFormData.isAllTimeGreats}
                            onChange={handleFilterFormChange}
                        />
                        <label htmlFor="isAllTimeGreats" className="text-base ml-2 font-K2D cursor-pointer">All Time Greats</label>
                        </div>
                        <div className="flex items-center justify-between my-4">
                        <div className="flex items-center">
                            <input 
                                type="checkbox"
                                id="isDatePosted"
                                name="isDatePosted"
                                className="w-5 aspect-square cursor-pointer"
                                checked={filterFormData.isDatePosted}
                                onChange={handleFilterFormChange}
                            />
                            <label htmlFor="isDatePosted" className="text-base ml-2 font-K2D cursor-pointer">Date Posted</label>
                        </div>
                        {filterFormData.isDatePosted && 
                            <label className="switch">
                                <input 
                                    type="checkbox" 
                                    id="datePostedCheckBox" 
                                    name="isDatePostedSwitched" 
                                    checked={filterFormData.isDatePostedSwitched}
                                    onChange={handleFilterFormChange}
                                />
                                <span className="slider round"></span>
                                <div className="inline w-40">
                                    <div className="inline-block w-1/2 text-center">
                                        <span className="labelText newest">Newest</span>
                                    </div>
                                    <div className="inline-block w-1/2 text-center">
                                        <span className="labelText oldest">Oldest</span>
                                    </div>
                                </div>
                            </label>
                        }
                        </div>
                        <div className="flex items-center justify-between my-4">
                        <div className="flex items-center">
                            <input 
                                type="checkbox"
                                id="isPopularity"
                                name="isPopularity"
                                className="w-5 aspect-square cursor-pointer"
                                checked={filterFormData.isPopularity}
                                onChange={handleFilterFormChange}
                            />
                            <label htmlFor="isPopularity" className="text-base ml-2 font-K2D cursor-pointer">Popularity</label>
                        </div>
                        {filterFormData.isPopularity &&
                            <label className="switch">
                                <input 
                                    type="checkbox" 
                                    id="popularityCheckBox"
                                    name="isPopularitySwitched" 
                                    checked={filterFormData.isPopularitySwitched}
                                    onChange={handleFilterFormChange}
                                />
                                <span className="slider round"></span>
                                <div className="inline w-40">
                                    <div className="inline-block w-1/2 text-center">
                                        <span className="labelText upVotes">Up Votes</span>
                                    </div>
                                    <div className="inline-block w-1/2 text-center">
                                        <span className="labelText downVotes">Down Votes</span>
                                    </div>
                                </div>
                            </label>
                        }
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
                <div className="w-2/5 flex justify-center items-center">
                    {filterFormData.isAdvancedSearch ? <MiddleAdvancedSearchFilter handleFilterFormChange={handleFilterFormChange} /> : <MiddleAddAdvancedSearchFilter />}
                </div>
            </form>
        </div>
    )
}