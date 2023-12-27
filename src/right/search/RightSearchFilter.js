import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrop, setFilterOption, applyFilterOptions, clearFilterOptions, cancelFilterChanges } from "../../redux/filters/filterActions";
import RightAddAdvancedSearchFilter from "./RightAddAdvancedSearchFilter";
import RightAdvancedSearchFilter from "./RightAdvancedSearchFilter";
import { createPortal } from "react-dom";

export default function RightSearchFilter({ rightSpaceFilterRef, rightSpaceFilterGeometry, rightAddAdvancedSearchFilterRef, rightAdvancedSearchFilterRef }) {

    /* 
        Description:   
            Creates the right search filter form and sets the state using redux.
        Unique Properties:
            Only applied filters will save.
    */

    const dispatch = useDispatch();
    const filterFormData = useSelector(state => state.filters.news.filterPayload);

    function handleFilterFormChange (event) {
        const { name, type, checked, value } = event.target;
        dispatch(setFilterOption('news', name, type === 'checkbox' ? checked : value));
    };

    function handleApplyFilterOptions () {
        dispatch(applyFilterOptions('news', filterFormData));
    };

    function handleClearFilterForm () {
        dispatch(clearFilterOptions('news'));
    };

    function handleCancelFilterChanges () {
        dispatch(cancelFilterChanges('news'));
    };

    function handleDrop () {
        dispatch(toggleDrop('news', 'isDropFilter'));
    };

    return createPortal(
        <div 
            className="fixed bg-white rounded-md shadow-md"
            style={rightSpaceFilterGeometry.position !== null && rightSpaceFilterGeometry.width !== null ? { 
                bottom: `${rightSpaceFilterGeometry.position.bottom}px`, 
                left: `${rightSpaceFilterGeometry.position.left}px`,
                width: `${rightSpaceFilterGeometry.width}px`
            } : null}
            ref={rightSpaceFilterRef}
        >
            <form className="flex flex-col h-full m-4">
                <div className="bg-white flex flex-col justify-between">
                    <div className="flex flex-col space-y-2">
                        <p className="text-2xl leading-6">Filter by</p>
                        <div className="flex items-center">
                        <input 
                            type="checkbox"
                            id="rightIsWhatsCurrent"
                            name="isWhatsCurrent"
                            className="w-5 aspect-square cursor-pointer"
                            checked={filterFormData.isWhatsCurrent}
                            onChange={handleFilterFormChange}
                        />
                        <label htmlFor="rightIsWhatsCurrent" className="text-base ml-2 font-K2D cursor-pointer">What's Current</label>
                        </div>
                        <div className="flex items-center">
                        <input 
                            type="checkbox"
                            id="rightIsAffiliateActivity"
                            name="isAffiliateActivity"
                            className="w-5 aspect-square cursor-pointer"
                            checked={filterFormData.isAffiliateActivity}
                            onChange={handleFilterFormChange}
                        />
                        <label htmlFor="rightIsAffiliateActivity" className="text-base ml-2 font-K2D cursor-pointer">Affiliate Activity</label>
                        </div>
                        <div className="flex items-center">
                        <input 
                            type="checkbox"
                            id="rightIsAllTimeGreats"
                            name="isAllTimeGreats"
                            className="w-5 aspect-square cursor-pointer"
                            checked={filterFormData.isAllTimeGreats}
                            onChange={handleFilterFormChange}
                        />
                        <label htmlFor="rightIsAllTimeGreats" className="text-base ml-2 font-K2D cursor-pointer">All Time Greats</label>
                        </div>
                        <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input 
                                type="checkbox"
                                id="rightIsDatePosted"
                                name="isDatePosted"
                                className="w-5 aspect-square cursor-pointer"
                                checked={filterFormData.isDatePosted}
                                onChange={handleFilterFormChange}
                            />
                            <label htmlFor="rightIsDatePosted" className="text-base ml-2 font-K2D cursor-pointer">Date Posted</label>
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
                                        <span className="rightLabelText newest">Newest</span>
                                    </div>
                                    <div className="inline-block w-1/2 text-center">
                                        <span className="rightLabelText oldest">Oldest</span>
                                    </div>
                                </div>
                            </label>
                        }
                        </div>
                        <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input 
                                type="checkbox"
                                id="rightIsPopularity"
                                name="isPopularity"
                                className="w-5 aspect-square cursor-pointer"
                                checked={filterFormData.isPopularity}
                                onChange={handleFilterFormChange}
                            />
                            <label htmlFor="rightIsPopularity" className="text-base ml-2 font-K2D cursor-pointer">Popularity</label>
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
                                        <span className="rightLabelText upVotes">Up Votes</span>
                                    </div>
                                    <div className="inline-block w-1/2 text-center">
                                        <span className="rightLabelText downVotes">Down Votes</span>
                                    </div>
                                </div>
                            </label>
                        }
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-3">
                        {filterFormData.isAdvancedSearch ? <RightAdvancedSearchFilter handleFilterFormChange={handleFilterFormChange} rightAdvancedSearchFilterRef={rightAdvancedSearchFilterRef} /> : <RightAddAdvancedSearchFilter rightAddAdvancedSearchFilterRef={rightAddAdvancedSearchFilterRef} />}
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
            </form>
        </div>,
        document.body
    )
}