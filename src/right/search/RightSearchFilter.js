import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrop, setFilterOption, applyFilterOptions, clearFilterOptions, cancelFilterChanges } from "../../redux/filters/filterActions";
import RightAddAdvancedSearchFilter from "./RightAddAdvancedSearchFilter";
import RightAdvancedSearchFilter from "./RightAdvancedSearchFilter";
import { createPortal } from "react-dom";

export default function RightSearchFilter({ page, rightSpaceFilterGeometry, refs }) {

    /* 
        Description:   
            Creates the right search filter form and sets the state using redux.
        Unique Properties:
            Only applied filters will save.
    */

    const dispatch = useDispatch();
    const filterFormData = useSelector(state => state.filters[page].filterPayload);

    function handleFilterFormChange(event) {
        const { name, type, checked, value } = event.target;
        const inverseOptions = {
            isNewestMessages: 'isOldestMessages',
            isOldestMessages: 'isNewestMessages',
            isNewestAffiliate: 'isOldestAffiliate',
            isOldestAffiliate: 'isNewestAffiliate',
        };
      
        if (inverseOptions[name] && checked) {
            dispatch(setFilterOption(page, name, checked));
            dispatch(setFilterOption(page, inverseOptions[name], false));
        } else {
            dispatch(setFilterOption(page, name, type === 'checkbox' ? checked : value));
        }
    }

    function handleApplyFilterOptions () {
        dispatch(applyFilterOptions(page, filterFormData));
    };

    function handleClearFilterForm () {
        dispatch(clearFilterOptions(page));
    };

    function handleCancelFilterChanges () {
        dispatch(cancelFilterChanges(page));
    };

    function handleDrop () {
        dispatch(toggleDrop(page, 'isDropFilter'));
    };

    return createPortal(
        <div 
            className="fixed bg-white rounded-md shadow-md"
            style={rightSpaceFilterGeometry.position !== null && rightSpaceFilterGeometry.width !== null ? { 
                bottom: `${rightSpaceFilterGeometry.position.bottom}px`, 
                left: `${rightSpaceFilterGeometry.position.left}px`,
                width: `${rightSpaceFilterGeometry.width}px`
            } : null}
            ref={refs.rightSpaceFilter}
        >
            <form className="flex flex-col h-full m-4">
                <div className="bg-white flex flex-col justify-between">
                    <p className="text-2xl leading-6 mb-2">Filter by</p>
                    {page !== 'messages' ? (
                        <div>
                            <div className="flex flex-col space-y-2">
                                {page === 'news' || page === 'explore' ? (
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
                                ) : null}
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
                                {page === 'news' || page === 'explore' ? (
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
                                ) : null}
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
                                {filterFormData.isAdvancedSearch ? (
                                    <RightAdvancedSearchFilter
                                        page={page}
                                        handleFilterFormChange={handleFilterFormChange}
                                        refs={{
                                            rightAdvancedSearchFilter: refs.rightAdvancedSearchFilter,
                                            rightDateRange: refs.rightDateRange,
                                            rightDateRangeCaptionDropdown: refs.rightDateRangeCaptionDropdown,
                                            rightAdvancedFilterDropdownDrop: refs.rightAdvancedFilterDropdownDrop,
                                        }}
                                    />
                                ) : (
                                    <RightAddAdvancedSearchFilter
                                        page={page}
                                        rightAddAdvancedSearchFilterRef={refs.rightAddAdvancedSearchFilter}
                                    />
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="mt-2">
                            <div className="flex flex-col space-y-3 mb-5">
                                <div className="flex justify-between">
                                    <label className="flex items-center" style={{ width: "35%" }}>
                                        <input 
                                            type="checkbox" 
                                            name="isIndividuals" 
                                            checked={filterFormData.isIndividuals}
                                            onChange={handleFilterFormChange}
                                            className="hidden" 
                                        />
                                        <span
                                            className={
                                                `w-full font-K2D text-base rounded-md p-1 flex justify-center cursor-pointer
                                                ${filterFormData.isIndividuals ? 'bg-fg-black-25 text-white' : 'bg-fg-white-95 text-black'}`
                                            }
                                        >
                                            Individuals
                                        </span>
                                    </label>
                                    <label className="flex items-center" style={{ width: "26%" }}>
                                        <input 
                                            type="checkbox" 
                                            name="isGroups" 
                                            checked={filterFormData.isGroups}
                                            onChange={handleFilterFormChange} 
                                            className="hidden" 
                                        />
                                        <span 
                                            className={
                                                `w-full font-K2D text-base rounded-md p-1 flex justify-center cursor-pointer
                                                ${filterFormData.isGroups ? 'bg-fg-black-25 text-white' : 'bg-fg-white-95 text-black'}`
                                            }
                                        >
                                            Groups
                                        </span>
                                    </label>
                                    <label className="flex items-center" style={{ width: "35%" }}>
                                        <input 
                                            type="checkbox" 
                                            name="isOrganizations" 
                                            checked={filterFormData.isOrganizations}
                                            onChange={handleFilterFormChange} 
                                            className="hidden" 
                                        />
                                        <span 
                                            className={
                                                `w-full font-K2D text-base rounded-md p-1 flex justify-center cursor-pointer
                                                ${filterFormData.isOrganizations ? 'bg-fg-black-25 text-white' : 'bg-fg-white-95 text-black'}`
                                            }
                                        >
                                            Organizations
                                        </span>
                                    </label>
                                </div>
                                <div className="flex justify-between">
                                    <label className="flex items-center" style={{ width: "48%" }}>
                                        <input 
                                            type="checkbox" 
                                            name="isNewestMessages" 
                                            checked={filterFormData.isNewestMessages}
                                            onChange={handleFilterFormChange} 
                                            className="hidden" 
                                        />
                                        <span 
                                            className={
                                                `w-full font-K2D text-base rounded-md p-1 flex justify-center cursor-pointer
                                                ${filterFormData.isNewestMessages ? 'bg-fg-black-25 text-white' : 'bg-fg-white-95 text-black'}`
                                            }
                                        >
                                            Newest Messages
                                        </span>
                                    </label>
                                    <label className="flex items-center" style={{ width: "48%" }}>
                                        <input 
                                            type="checkbox" 
                                            name="isOldestMessages" 
                                            checked={filterFormData.isOldestMessages}
                                            onChange={handleFilterFormChange} 
                                            className="hidden" 
                                        />
                                        <span 
                                            className={
                                                `w-full font-K2D text-base rounded-md p-1 flex justify-center cursor-pointer
                                                ${filterFormData.isOldestMessages ? 'bg-fg-black-25 text-white' : 'bg-fg-white-95 text-black'}`
                                            }
                                        >
                                            Oldest Messages
                                        </span>
                                    </label>
                                </div>
                                <div className="flex justify-between">
                                    <label className="flex items-center" style={{ width: "48%" }}>
                                        <input 
                                            type="checkbox" 
                                            name="isNewestAffiliate" 
                                            checked={filterFormData.isNewestAffiliate}
                                            onChange={handleFilterFormChange} 
                                            className="hidden" 
                                        />
                                        <span 
                                            className={
                                                `w-full font-K2D text-base rounded-md p-1 flex justify-center cursor-pointer
                                                ${filterFormData.isNewestAffiliate ? 'bg-fg-black-25 text-white' : 'bg-fg-white-95 text-black'}`
                                            }
                                        >
                                            Newest Affiliate
                                        </span>
                                    </label>
                                    <label className="flex items-center" style={{ width: "48%" }}>
                                        <input 
                                            type="checkbox" 
                                            name="isOldestAffiliate" 
                                            checked={filterFormData.isOldestAffiliate}
                                            onChange={handleFilterFormChange} 
                                            className="hidden" 
                                        />
                                        <span 
                                            className={
                                                `w-full font-K2D text-base rounded-md p-1 flex justify-center cursor-pointer
                                                ${filterFormData.isOldestAffiliate ? 'bg-fg-black-25 text-white' : 'bg-fg-white-95 text-black'}`
                                            }
                                        >
                                            Oldest Affiliate
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <RightAdvancedSearchFilter
                                page={page}
                                handleFilterFormChange={handleFilterFormChange}
                                refs={{
                                    rightAdvancedSearchFilter: refs.rightAdvancedSearchFilter,
                                    rightDateRange: refs.rightDateRange,
                                    rightDateRangeCaptionDropdown: refs.rightDateRangeCaptionDropdown,
                                    rightAdvancedFilterDropdownDrop: refs.rightAdvancedFilterDropdownDrop,
                                }}
                            />
                        </div>
                    )}
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