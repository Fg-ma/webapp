import React, { useState } from "react";
import MiddleSearchFilter from "./MiddleSearchFilter";

export default function MiddleSearchBar() {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [dropFilter, setDropFilter] = useState(false)
  
    const handleInputFocus = () => {
        setIsInputFocused(true);
    };
  
    const handleInputBlur = () => {
        setIsInputFocused(false);
    };
  
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
  
    const getSearchIcon = () => {
        if (isInputFocused || inputValue.trim() !== '') {
            return 'searchArrow.svg';
        } else {
            return 'search.svg';
        }
    };

    const handleFilterDrop = () => {
        setDropFilter(!dropFilter)
    };

    // Set width of search bar to by 80% of middleSpaceContainer
    const getSearchBarWidth = () => {
        const middleSpaceContainer = document.getElementById('middleSpaceContainer');

        const middleSpaceContainerWidth = middleSpaceContainer.offsetWidth;
        const newWidth = `${middleSpaceContainerWidth * 0.8}px`;

        return newWidth;
    }
  
    return (
        <div className="flex flex-col justify-center items-center" style={{ width: getSearchBarWidth() }}>
            <form className="w-full h-10 bg-fg-white-85 rounded-md overflow-clip flex items-center">
                <input
                    id="middleSearchSubmit"
                    type="submit"
                    value=""
                    className="w-6 h-6 bg-cover bg-no-repeat ml-2 cursor-pointer"
                    style={{ backgroundImage: `url("assets/icons/${getSearchIcon()}")` }}
                />
                <input
                    id="middleSearchArea"
                    type="text"
                    placeholder="Search..."
                    className="grow h-full outline-none bg-fg-white-85 placeholder-fg-black-25 text-lg mx-1"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                    value={inputValue}
                />
                <input
                    id="middleFilterButton"
                    type="button"
                    className="w-8 h-8 bg-cover bg-no-repeat mr-2 cursor-pointer"
                    style={{ backgroundImage: `url("assets/icons/filter.svg")` }}
                    onClick={handleFilterDrop}
                />
            </form>
            {dropFilter ? <MiddleSearchFilter /> : null}
        </div>
    );
}