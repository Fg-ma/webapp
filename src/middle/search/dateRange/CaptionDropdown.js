import React, { useState, useEffect, useRef } from "react";

export default function CaptionDropdown({ options, value, onChange, type }) {
    const [isCaptionDropOpen, setIsCaptionDropOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggle = () => {
        setIsCaptionDropOpen(!isCaptionDropOpen);
    };

    const handleSelect = (option) => {
        onChange(option);
        setIsCaptionDropOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsCaptionDropOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={handleToggle}
                className="h-8 px-1.5 bg-125 text-black font-Josefin text-xl leading-5"
            >
                {type === 'month' ? options[value] : value}
            </button>
            {isCaptionDropOpen && (
                <div className="absolute top-full mt-1 pr-2 bg-white rounded shadow-md z-50 left-1/2 transform -translate-x-1/2">
                    <div className="h-48 overflow-scroll">
                        <ul className="py-1">
                            {options.map((option, index) => (
                                <li
                                    key={index}
                                    className="px-3 py-1 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleSelect(index)}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};
