import React, { useState } from "react";

export default function MiddleSearchFilter() {
    const [filterFormData, setFilterFormData] = useState(
        {
            isWhatsCurrent: false,
            isAffiliateActivity: false,
            isAllTimeGreats: false,
            isDatePosted: false,
            isPopularity: false,
        }
    )

    function handleFilterFormChange(event) {
        setFilterFormData(prevFilterFormData => {
            const {name, type, checked} = event.target
            return {
                ...prevFilterFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

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
                            className="w-5 aspect-square"
                            checked={filterFormData.isWhatsCurrent}
                            onChange={handleFilterFormChange}
                        />
                        <label htmlFor="isWhatsCurrent" className="text-base ml-2 font-K2D">What's Current</label>
                    </div>
                    <div className="flex items-center">
                        <input 
                            type="checkbox"
                            id="isAffiliateActivity"
                            name="isAffiliateActivity"
                            className="w-5 aspect-square"
                            checked={filterFormData.isAffiliateActivity}
                            onChange={handleFilterFormChange}
                        />
                        <label htmlFor="isAffiliateActivity" className="text-base ml-2 font-K2D">Affiliate Activity</label>
                    </div>
                    <div className="flex items-center">
                        <input 
                            type="checkbox"
                            id="isAllTimeGreats"
                            name="isAllTimeGreats"
                            className="w-5 aspect-square"
                            checked={filterFormData.isAllTimeGreats}
                            onChange={handleFilterFormChange}
                        />
                        <label htmlFor="isAllTimeGreats" className="text-base ml-2 font-K2D">All Time Greats</label>
                    </div>
                    <div className="flex items-center w-4/5 justify-between">
                        <div className="flex items-center">
                            <input 
                                type="checkbox"
                                id="isDatePosted"
                                name="isDatePosted"
                                className="w-5 aspect-square"
                                checked={filterFormData.isDatePosted}
                                onChange={handleFilterFormChange}
                            />
                            <label htmlFor="isDatePosted" className="text-base ml-2 font-K2D">Date Posted</label>
                        </div>
                        <label class="switch">
                            <input type="checkbox" />
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="flex items-center w-4/5 justify-between">
                        <div className="flex items-center">
                            <input 
                                type="checkbox"
                                id="isPopularity"
                                name="isPopularity"
                                className="w-5 aspect-square"
                                checked={filterFormData.isPopularity}
                                onChange={handleFilterFormChange}
                            />
                            <label htmlFor="isPopularity" className="text-base ml-2 font-K2D">Popularity</label>
                        </div>
                        <label class="switch">
                            <input type="checkbox" />
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div>
                        <input 
                            type="button" 
                            value="Apply" 
                            className="text-sm font-K2D w-20 h-8 rounded-2xl bg-fg-primary text-white" 
                        />
                        <input 
                            type="button" 
                            value="Clear" 
                            className="text-sm font-K2D w-20 h-8 rounded-2xl bg-fg-secondary text-white mx-4" 
                        />
                        <input 
                            type="button" 
                            value="Cancel" 
                            className="text-sm font-K2D w-20 h-8 rounded-2xl bg-fg-black-25 text-white"
                            />
                    </div>
                </div>
                <div className="w-1/3 flex flex-col justify-end items-end">
                    <input type="button" value="Advanced Search..." />
                </div>
            </form>
        </div>
    )
}