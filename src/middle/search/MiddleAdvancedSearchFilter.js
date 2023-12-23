import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import MiddleAdvancedFilterDropdown from "./MiddleAdvancedFilterDropDown";
import { toggleAdvancedSearch, clearAdvancedAffiliateFilter } from "../../redux/filters/filterActions";
import MiddleAdvancedDateRange from "./MiddleAdvancedDateRange";

export default function MiddleAdvancedSearchFilter(props) {

    /* 
        Description:   
            Creates the card for the advanced middle search filter.
        Unique Properties:
            Creates date range portal and calculates the portal position to be centered 
            below the dateRangeContainer.
    */

    const dispatch = useDispatch();
    const { handleFilterFormChange } = props;
    const formAuthor = useSelector(state => state.filters.middle.filterPayload.author);
    const formDateRange = useSelector(state => state.filters.middle.filterPayload.dateRange);
    const [isDateRange, setIsDateRange] = useState(false);
    const dateRangeContainerRef = useRef(null);
    const dateRangeRef = useRef(null);
    const [position, setPosition] = useState(null);

    const handleAdvancedFilter = () => {
        dispatch(toggleAdvancedSearch('middle'));
        dispatch(clearAdvancedAffiliateFilter('middle', 'ind'));
        dispatch(clearAdvancedAffiliateFilter('middle', 'grp'));
        dispatch(clearAdvancedAffiliateFilter('middle', 'org'));
    };

    function emptyAdvAffFilter(subcategory) {
        dispatch(clearAdvancedAffiliateFilter('middle', subcategory));
    };

    const handleDateRange = () => {
        setIsDateRange(prev => !prev);
    };

    useEffect(() => {
        calculateDateRangePosition();
    }, [isDateRange]);
    
    const calculateDateRangePosition = () => {
        if (dateRangeContainerRef.current && dateRangeRef.current) {
            const containerBoundingBox = dateRangeContainerRef.current.getBoundingClientRect();
            const dateRangeBoundingBox = dateRangeRef.current.getBoundingClientRect();

            setPosition({
                top: containerBoundingBox.top + 40,
                left: containerBoundingBox.left - (Math.abs(containerBoundingBox.width - dateRangeBoundingBox.width) / 2),
            });
        }
    };

    return (
        <div className="h-full w-full bg-fg-white-95 rounded-lg">
            <div className="flex items-center h-7 bg-fg-primary rounded-t-lg">
                <input
                    type="button"
                    name="isAdvancedSearch"
                    className="w-6 h-6 bg-cover bg-no-repeat mx-1 cursor-pointer"
                    style={{ backgroundImage: `url("assets/icons/whiteClose.svg")`}}
                    onClick={handleAdvancedFilter}
                />
                <input 
                    type="button" 
                    className="text-base cursor-pointer mt-1 text-white"
                    value="Remove Advanced Search"
                    onClick={handleAdvancedFilter}
                />
            </div>
            <div className="m-2">
                <p className="text-lg">Filter by</p>
                <div className="bg-fg-white-85 p-2 rounded-md w-full">
                    <p className="text-base">Affiliated...</p>
                    <div className="w-full flex items-center justify-start mb-2">
                        <MiddleAdvancedFilterDropdown subcategory={"ind"} />
                        <button
                            type="button"
                            onClick={() => emptyAdvAffFilter("ind")}
                            className="h-8 aspect-square bg-no-repeat bg-center"
                            style={{ backgroundImage: "url('assets/icons/trashCan.svg')"}}
                        ></button>
                    </div>
                    <div className="w-full flex items-center justify-start my-2">
                        <MiddleAdvancedFilterDropdown subcategory={"grp"} />
                        <button
                            type="button"
                            onClick={() => emptyAdvAffFilter('grp')}
                            className="h-8 aspect-square bg-no-repeat bg-center"
                            style={{ backgroundImage: "url('assets/icons/trashCan.svg')"}}
                        ></button>
                    </div>
                    <div className="w-full flex items-center justify-start mt-2">
                        <MiddleAdvancedFilterDropdown subcategory={"org"} />
                        <button
                            type="button"
                            onClick={() => emptyAdvAffFilter('org')}
                            className="h-8 aspect-square bg-no-repeat bg-center"
                            style={{ backgroundImage: "url('assets/icons/trashCan.svg')"}}
                        ></button>
                    </div>
                </div>
                <div className="w-full mt-2">
                    <label htmlFor="author" className="text-base ml-1 cursor-pointer">Author</label>
                    <div className="h-fit flex items-center justify-center -mt-1">
                        <input
                            type="text" 
                            placeholder="Author..."
                            name="author" 
                            id="author"
                            className="grow bg-white h-8 rounded-md text-sm px-1 font-K2D"
                            onChange={handleFilterFormChange}                 
                            value={formAuthor}
                        >
                        </input>
                        <button
                                type="button"
                                name="author"
                                className="h-8 aspect-square bg-no-repeat bg-center ml-1"
                                style={{ backgroundImage: "url('assets/icons/trashCan.svg')"}}
                                onClick={handleFilterFormChange}
                                value=""
                        ></button>
                    </div>
                </div>
                <div className="w-full mt-2">
                    <label htmlFor="dateRange" className="text-base ml-1 cursor-pointer">Date Range</label>
                    <div ref={dateRangeContainerRef} className="w-full flex items-center justify-start -mt-1">
                        <div className="grow bg-white rounded-md flex items-center justify-start">
                            <input 
                                type="text" 
                                placeholder="mm.dd.yyyy - mm.dd.yyyy" 
                                name="dateRange"
                                id="dateRange"
                                className="grow bg-white h-8 text-sm px-1 cursor-pointer rounded-md font-K2D"
                                onChange={handleFilterFormChange}                 
                                value={formDateRange}
                            >
                            </input>
                            <button
                                type="button"
                                className="h-8 aspect-square bg-no-repeat bg-center"
                                style={{ backgroundImage: "url('assets/icons/dateRangeCalendar.svg')"}}
                                onClick={handleDateRange}
                            >
                            </button>
                        </div>
                        <button
                                type="button"
                                name="dateRange"
                                className="h-8 aspect-square bg-no-repeat bg-center ml-1"
                                style={{ backgroundImage: "url('assets/icons/trashCan.svg')"}}
                                onClick={handleFilterFormChange}
                                value=""
                        >
                        </button>
                    </div>
                    {isDateRange && <MiddleAdvancedDateRange position={position} dateRangeRef={dateRangeRef} />}
                </div>
            </div>
        </div>
    );
}