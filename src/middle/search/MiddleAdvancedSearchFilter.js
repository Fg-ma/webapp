import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleAdvancedSearch, clearAdvancedAffiliateFilter, setDateRange } from "../../redux/filters/filterActions";
import MiddleAdvancedFilterDropdown from "./MiddleAdvancedFilterDropDown";
import MiddleAdvancedDateRange from "./dateRange/MiddleAdvancedDateRange";

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

    
    const [selectedRange, setSelectedRange] = useState({ from: '', to: '' });
    const [typed, setTyped] = useState(false);

    const handleDateRangeChange = (event) => {
        const { name, value } = event.target;  
        if (name == 'from') {
            dispatch(setDateRange('middle', value, formDateRange.to));
        } else if (name == 'to') {
            dispatch(setDateRange('middle', formDateRange.from, value));
        }
        setTyped(true);
    };

    useEffect(() => {
        if (typed) {
            setTyped(false);
            updateFormDateRange();
            findDateRangeButton();
        }
    }, [formDateRange]);

    const findDateRangeButton = () => {
        if (dateRangeRef.current) {
            const buttons = dateRangeRef.current.querySelectorAll('button[name="day"]');
    
            const from = parseInt(formDateRange.from.substring(3, 5), 10).toString();
            const to = parseInt(formDateRange.to.substring(3, 5), 10).toString();
            console.log(from, to);
            console.log(buttons);
            buttons.forEach(button => {
                console.log(button.innerText, from, to);
                if (String(button.innerText) === from) {
                    console.log("start");
                    button.classList.add("rdp-day_range_start");
                } else if (String(button.innerText) === to) {
                    console.log("end");
                    button.classList.add("rdp-day_range_end");
                }
            });
        }
    };

    const updateFormDateRange = () => {
        // Check if formDateRange.from && formDateRange.To is a valid date
        const regex = /^(0[1-9]|1[0-2])\.(0[1-9]|[12][0-9]|3[01])\.\d{4}$/;
        let validFrom = regex.test(formDateRange.from);
        let validTo = regex.test(formDateRange.to);

        if (validFrom && validTo) {
            setSelectedRange({ from: formDateRange.from, to: formDateRange.to });
        } else if (validFrom && !validTo) {
            setSelectedRange({ ...selectedRange, from: formDateRange.from });
        } else if (!validFrom && validTo) {
            setSelectedRange({ ...selectedRange, to: formDateRange.to });
        }
    };

    const handleClickOutside = (event) => {
        if (dateRangeRef.current && !dateRangeRef.current.contains(event.target) && dateRangeContainerRef.current && !dateRangeContainerRef.current.contains(event.target)) {
            setIsDateRange(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

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
                            className="grow bg-white h-8 rounded-md text-sm px-1 font-K2D focus:outline-none focus:border-2 focus:border-fg-secondary"
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
                                placeholder="mm.dd.yyyy" 
                                name="from"
                                id="dateRange"
                                className="w-2/5 bg-white text-center h-8 text-sm px-1 cursor-pointer rounded-md font-K2D focus:outline-none focus:border-2 focus:border-fg-secondary"
                                onChange={handleDateRangeChange}                 
                                value={formDateRange.from}
                            >
                            </input>
                            <p className="grow text-center text-sm font-K2D">to</p>
                            <input 
                                type="text" 
                                placeholder="mm.dd.yyyy" 
                                name="to"
                                id="dateRange"
                                className="w-2/5 bg-white text-center h-8 text-sm px-1 cursor-pointer rounded-md font-K2D focus:outline-none focus:border-2 focus:border-fg-secondary"
                                onChange={handleDateRangeChange}                 
                                value={formDateRange.to}
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
                    {isDateRange && <MiddleAdvancedDateRange position={position} dateRangeRef={dateRangeRef} selectedRange={selectedRange} setSelectedRange={setSelectedRange} setIsDateRange={setIsDateRange} />}
                </div>
            </div>
        </div>
    );
}