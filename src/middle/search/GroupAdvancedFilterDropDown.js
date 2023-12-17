import React, { useState } from "react";
import { useSelector } from "react-redux";
import GroupFilterCard from "./GroupFilterCard";
import ExpandedGroupFilterCard from "./ExpandedGroupFilterCard";
import { groups } from "../../data";

export default function GroupAdvancedFilterDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const groupFilterCards = groups.map(groupFilterInfo => {
        return <GroupFilterCard key={groupFilterInfo.id} identify={groupFilterInfo.id} name={groupFilterInfo.name} />
    })

    const expandedGroupFilterCards = groups.map(expandedGroupFilterInfo => {
        return <ExpandedGroupFilterCard key={expandedGroupFilterInfo.id} identify={expandedGroupFilterInfo.id} name={expandedGroupFilterInfo.name} />
    })

    const advGrpFilters = useSelector((state) => state.middleFilter.filterPayload.groupFilters);

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
                    {advGrpFilters[0] ? advGrpFilters.join(', ') : "--Groups--"}
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
                    <div id="groupFilterCardsContainer" className="overflow-y-scroll overflow-x-visible max-h-80 max-w-xs w-80 h-80">
                        {groupFilterCards}
                    </div>
                </div>
            )}
        </div>
    );
};