import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { toggleDrop } from "../../redux/filters/filterActions";
import MiddleSearchFilter from "./MiddleSearchFilter";

export default function MiddleSearchBar(props) {

    /* 
        Description:   
            Creates the MiddleSearchBar with a submit button, text input, and filter button.
        Unique Properties:
            Switches the search icon to an arrow icon as the background of the 
            submit button when the text input is hover or there is text in it.
    */

    const { middleSpaceContainerRef } = props;
    const middleSpaceContainerWidth = middleSpaceContainerRef.current.offsetWidth;
    const middleSearchWidth = `${middleSpaceContainerWidth * 0.8}px`;
    
    const dispatch = useDispatch();
    const dropFilter = useSelector(state => state.filters.middle.isDropFilter);

    const [isInputFocused, setIsInputFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
  
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
        dispatch(toggleDrop('middle', 'isDropFilter'))
    };

    return (
        <div className="flex flex-col justify-center items-center" style={{ width: middleSearchWidth }}>
            <form className="w-full h-10 bg-white rounded-md overflow-clip flex items-center">
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
                    className="grow h-full outline-none bg-white placeholder-fg-black-25 text-lg mx-1"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                    value={inputValue}
                />
                <div className="w-16 h-full bg-fg-white-90 flex justify-center items-center">
                    <input
                        type="button"
                        className="w-8 h-8 bg-cover bg-no-repeat cursor-pointer"
                        style={{ backgroundImage: `url("assets/icons/filter.svg")` }}
                        onClick={handleFilterDrop}
                    />
                </div>
            </form>
            {dropFilter ? <MiddleSearchFilter /> : null}
        </div>
    );
}