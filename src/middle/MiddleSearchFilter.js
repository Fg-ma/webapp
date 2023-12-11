import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setFilterOption, toggleAdvancedSearch } from "../redux/middleFilter/middleFilterActions";

export default function MiddleSearchFilter() {
    const dispatch = useDispatch();
    const filterFormData = useSelector(state => state.middleFilter.filterPayload);

    const handleFilterFormChange = event => {
        const { name, type, checked, value } = event.target;
        dispatch(setFilterOption(name, type === 'checkbox' ? checked : value));
    };

    const handleAdvancedFilter = () => {
        dispatch(toggleAdvancedSearch());
    };

    return (
        <div className="w-full bg-white rounded-md mt-2">
            <form className="flex h-full">
                <div className="w-2/3 bg-white flex flex-col m-4 space-y-3">
                    <p className="text-2xl">Filter by</p>
                    <div className="flex items-center">
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
                    <div className="flex items-center">
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
                    <div className="flex items-center">
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
                    <div className="flex items-center w-4/5 justify-between">
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
                        <label class="switch">
                            <input id="datePostedCheckBox" type="checkbox" />
                            <span class="slider round"></span>
                            <div className="inline w-40">
                                <div className="inline-block w-1/2 text-center">
                                    <span class="labelText newest">Newest</span>
                                </div>
                                <div className="inline-block w-1/2 text-center">
                                    <span class="labelText oldest">Oldest</span>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className="flex items-center w-4/5 justify-between">
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
                        <label class="switch">
                            <input id="popularityCheckBox" type="checkbox" />
                            <span class="slider round"></span>
                            <div className="inline w-40">
                                <div className="inline-block w-1/2 text-center">
                                    <span class="labelText upVotes">Up Votes</span>
                                </div>
                                <div className="inline-block w-1/2 text-center">
                                    <span class="labelText downVotes">Down Votes</span>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div>
                        <input 
                            type="button" 
                            value="Apply" 
                            className="text-sm font-K2D w-20 h-8 rounded-2xl bg-fg-primary text-white cursor-pointer" 
                        />
                        <input 
                            type="button" 
                            value="Clear" 
                            className="text-sm font-K2D w-20 h-8 rounded-2xl bg-fg-secondary text-white mx-4 cursor-pointer" 
                        />
                        <input 
                            type="button" 
                            value="Cancel" 
                            className="text-sm font-K2D w-20 h-8 rounded-2xl bg-fg-black-25 text-white cursor-pointer"
                            />
                    </div>
                </div>
                <div className="w-1/3 flex justify-end items-end">
                    <div className="mb-1 mr-3 flex items-center">
                        <input
                            type="button"
                            name="isAdvancedSearch"
                            className="w-6 h-6 bg-cover bg-no-repeat mr-1 cursor-pointer"
                            style={{ backgroundImage: `url("assets/icons/addAdvancedFilters.svg")` }}
                            onClick={handleAdvancedFilter}
                        />
                        <input 
                            type="button" 
                            className="text-sm align-text-bottom cursor-pointer" 
                            value="Advanced Search..."
                            onClick={handleAdvancedFilter}
                        />
                        {filterFormData.isAdvancedSearch ? <AdvancedSearchFilter /> : null}
                    </div>
                </div>
            </form>
        </div>
    )
}

function AdvancedSearchFilter() {
    return (
        <div>
            <input
                type="button"
                name="isAdvancedSearch"
                className="w-6 h-6 bg-cover bg-no-repeat mr-1 cursor-pointer"
                style={{ backgroundImage: `url("assets/icons/addAdvancedFilters.svg")` }}
                onClick={handleAdvancedFilter}
            />
            <input 
                type="button" 
                className="text-sm align-text-bottom cursor-pointer" 
                value="Advanced Search..."
                onClick={handleAdvancedFilter}
            />
        </div>
    )
}