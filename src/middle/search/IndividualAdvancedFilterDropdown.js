import React, { useState } from "react";
import IndividualFilterCard from "./IndividualFilterCard";
import { individuals } from "../../data";

export default function IndividualAdvancedFilterDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const indFilterCards = individuals.map(indFilterInfo => {
        return <IndividualFilterCard key={indFilterInfo.id} name={indFilterInfo.name} />
    })

    return (
        <div className="relative inline-block text-left w-5/6">
            <button
                onClick={toggleDropdown}
                type="button"
                className="w-full h-8 border border-fg-white-70 bg-white rounded-md inline-flex items-center justify-between"
            >
                --Individuals--
                <svg
                    className={`w-4 h-4 mr-1 transition-transform transform ${isOpen ? 'rotate-180' : ''}`}
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
            </button>
            {isOpen && (
                <div className="py-1 px-3 origin-top-right absolute left-1/2 transform -translate-x-1/2 mt-2 w-max rounded-md shadow-md bg-white ">
                    <div className="overflow-scroll max-h-80">
                        {indFilterCards}
                    </div>
                </div>
            )}
        </div>
    );
};