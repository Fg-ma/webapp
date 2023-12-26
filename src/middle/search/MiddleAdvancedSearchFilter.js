import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleAdvancedSearch, clearAdvancedAffiliateFilter, setDateRange } from "../../redux/filters/filterActions";
import AdvancedFilterDropdown from "../../components/advancedFilterDropdown/AdvancedFilterDropdown";
import AdvancedDateRange from "../../components/dateRange/AdvancedDateRange";

export default function MiddleAdvancedSearchFilter({ handleFilterFormChange }) {

    /* 
        Description:   
            Creates the card for the advanced middle search filter.
        Unique Properties:
            Creates date range portal and calculates the portal position to be centered 
            below the dateRangeContainer.
    */

    const dispatch = useDispatch();
    const formAuthor = useSelector(state => state.filters.middle.filterPayload.author);
    const formDateRange = useSelector(state => state.filters.middle.filterPayload.dateRange);
    const [isDateRange, setIsDateRange] = useState(false);
    const dateRangeContainerRef = useRef(null);
    const dateRangeRef = useRef(null);
    const [position, setPosition] = useState(null);
    const [selectedRange, setSelectedRange] = useState({ from: '', to: '' });
    const [typed, setTyped] = useState(false);

    // Handles closeing the advanced search filter
    const handleAdvancedFilter = () => {
        dispatch(toggleAdvancedSearch('middle'));
        dispatch(clearAdvancedAffiliateFilter('middle', 'ind'));
        dispatch(clearAdvancedAffiliateFilter('middle', 'grp'));
        dispatch(clearAdvancedAffiliateFilter('middle', 'org'));
    };

    // Handles clearing the values of the dropdowns depending on what subcategory is passed in
    const emptyAdvAffFilter = (subcategory) => {
        dispatch(clearAdvancedAffiliateFilter('middle', subcategory));
    };

    /* 
        Calculates what position the date range create portal should appear in and sets the position 
        state which is then passed down to the date range component
    */
    useEffect(() => {
        if (dateRangeContainerRef.current && dateRangeRef.current) {
            const containerBoundingBox = dateRangeContainerRef.current.getBoundingClientRect();
            const dateRangeBoundingBox = dateRangeRef.current.getBoundingClientRect();

            setPosition({
                top: containerBoundingBox.top + 40,
                left: containerBoundingBox.left - (Math.abs(containerBoundingBox.width - dateRangeBoundingBox.width) / 2),
            });
        }
    }, [isDateRange]);

    const toggleDateRange = () => {
        setIsDateRange(prev => !prev);
    };

    // Handles any typed changes to the date range and dispatches as necessary to the local state
    const updateFormDateRange = () => {
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

    // Handles any typed changes to the date range and dispatches as necessary to the redux state
    const handleDateRangeChange = (event) => {
        const { name, value } = event.target;  
        if (name == 'from') {
            dispatch(setDateRange('middle', value, formDateRange.to));
        } else if (name == 'to') {
            dispatch(setDateRange('middle', formDateRange.from, value));
        } else if (name == "clearDateRange") {
            dispatch(setDateRange('middle', '', ''));
        }
        setTyped(true);
    };

    /* 
        If a valid range is in state then it will ensure that the correct classes are applied to 
        the correct elements it is also passed down to elements in the drop down
    */
    const updateRangeStyles = () => {
        const regex = /^(0[1-9]|1[0-2])\.(0[1-9]|[12][0-9]|3[01])\.\d{4}$/;
        let validFrom = regex.test(formDateRange.from);
        let validTo = regex.test(formDateRange.to);
        if (validFrom && validTo) {
            if (dateRangeRef.current) {
                setTimeout(() => {
                    const buttons = dateRangeRef.current.querySelectorAll('button[name="day"].selected');
                    
                    if (buttons.length) {
                        const buttonArray = Array.from(buttons);

                        buttonArray.forEach((button) => {
                            button.classList.remove("rdp-day_range_start", "rdp-day_range_end", "rdp-day_range_middle");
                        });
                        buttonArray[0].classList.add("rdp-day_range_start");
                        buttonArray[buttons.length - 1].classList.add("rdp-day_range_end");

                        const middleButtons = Array.from(buttons).slice(1, buttons.length - 1);

                        middleButtons.forEach((button) => {
                            button.classList.add("rdp-day_range_middle")
                        });
                    }
                }, 0);
            }
        };
        if (!formDateRange.from && !formDateRange.to) {
        
            if (dateRangeRef.current) {
                const buttons = dateRangeRef.current.querySelectorAll('button[name="day"].selected');

                if (buttons.length) {
                    const buttonArray = Array.from(buttons);

                    buttonArray.forEach((button) => {
                        button.classList.remove("rdp-day_range_start", "rdp-day_range_end", "rdp-day_range_middle", "selected");
                    });
                };
            };
        } 
    };   
    
    useEffect(() => {
        updateRangeStyles();
        if (typed) {
            setTyped(false);
            updateFormDateRange();
        };
    }, [formDateRange, isDateRange]);

    // Handles closing the date range dropdown when the mouse clicks out of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDateRange) {
                const parentElement = dateRangeRef.current;
                
                if (
                    parentElement &&
                    !parentElement.contains(event.target) &&
                    !isDescendantOf(parentElement, event.target) &&
                    dateRangeContainerRef.current &&
                    !dateRangeContainerRef.current.contains(event.target)
                ) {
                    setIsDateRange(false);
                }
            }
        };
      
        const isDescendantOf = (parent, child) => {
            let node = child;
            while (node !== null) {
                if (node === parent) {
                    return true;
                }
                node = node.parentElement;
            }
            return false;
        };
      
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDateRange]);
  
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
                        <AdvancedFilterDropdown filter={"middle"} subcategory={"ind"} />
                        <button
                            type="button"
                            onClick={() => emptyAdvAffFilter("ind")}
                            className="h-8 aspect-square bg-no-repeat bg-center"
                            style={{ backgroundImage: "url('assets/icons/trashCan.svg')"}}
                        ></button>
                    </div>
                    <div className="w-full flex items-center justify-start my-2">
                        <AdvancedFilterDropdown filter={"middle"} subcategory={"grp"} />
                        <button
                            type="button"
                            onClick={() => emptyAdvAffFilter('grp')}
                            className="h-8 aspect-square bg-no-repeat bg-center"
                            style={{ backgroundImage: "url('assets/icons/trashCan.svg')"}}
                        ></button>
                    </div>
                    <div className="w-full flex items-center justify-start mt-2">
                        <AdvancedFilterDropdown filter={"middle"} subcategory={"org"} />
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
                                onClick={toggleDateRange}
                            >
                            </button>
                        </div>
                        <button
                                type="button"
                                name="clearDateRange"
                                className="h-8 aspect-square bg-no-repeat bg-center ml-1"
                                style={{ backgroundImage: "url('assets/icons/trashCan.svg')"}}
                                onClick={handleDateRangeChange}
                                value=""
                        >
                        </button>
                    </div>
                    {isDateRange && <AdvancedDateRange 
                                        filter={'middle'}
                                        position={position} 
                                        dateRangeRef={dateRangeRef} 
                                        selectedRange={selectedRange} 
                                        setSelectedRange={setSelectedRange} 
                                        updateRangeStyles={updateRangeStyles}
                                    />
                    }
                </div>
            </div>
        </div>
    );
}