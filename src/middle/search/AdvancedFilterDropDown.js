import React, { useState } from "react";
import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import { individuals, groups, organizations } from "../../data";

export default function AdvancedFilterDropdown(props) {
    const subcategory = props.subcategory;
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    
    let data;
    let placeholder;

    if (subcategory == "ind") {
        data = individuals;
        placeholder = "--Individuals--";
    } else if (subcategory == "grp") {
        data = groups;
        placeholder = "--Groups--"
    } else if (subcategory == "org") {
        data = organizations;
        placeholder = "--Organizations--"
    }

    const filterCards = data.map(filterInfo => {
        return <FilterCard key={filterInfo.id} identify={filterInfo.id} name={filterInfo.name} subcategory={subcategory}/>
    })

    const advFilters = useSelector((state) => state.middleFilter.filterPayload.affiliatedFilters[subcategory]);

    return (
        <div className="relative inline-block text-left w-5/6">
            <button
                onClick={toggleDropdown}
                type="button"
                className="w-full h-8 border border-fg-white-70 bg-white rounded-md inline-flex items-center justify-between"
            >
                <span
                    className="flex-grow overflow-hidden pl-2"
                    style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >
                    {advFilters[0] ? advFilters.join(', ') : placeholder}
                </span>
                <span className="w-4 aspect-square mr-1">
                    <svg
                        className={`w-4 aspect-square min-w-full transition-transform transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </span>
            </button>
            {isOpen && (
                <div className="py-1 px-3 origin-top-right absolute left-1/2 transform -translate-x-1/2 mt-2 rounded-md shadow-md bg-white z-10">
                    <div className="overflow-y-scroll overflow-x-visible max-h-80 max-w-xs w-80 h-80">
                        {filterCards}
                    </div>
                </div>
            )}
        </div>
    );
};