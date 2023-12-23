import React, { useState, useEffect, useRef } from "react";
import RightSearchFilter from "./RightSearchFilter";
import { useDispatch, useSelector } from 'react-redux'
import { toggleDrop } from "../../redux/filters/filterActions";

export default function RightSearchBar() {

    /* 
        Description:   
            Creates the RightSearchBar with a submit button, text input, and filter button.
        Unique Properties:
            Switches the search icon to an arrow icon as the background of the 
            submit button when the text input is hover or there is text in it.
    */

    const [isInputFocused, setIsInputFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const dropFilter = useSelector(state => state.filters.news.isDropFilter);
    const rightSpaceSearchBarRef = useRef(null);
    const rightSpaceFilterRef = useRef(null);
    const [rightSpaceFilterGeometry, setRightSpaceFilterGeometry] = useState({
        width: null,
        position: {
            top: null,
            left: null,
        },
    });

    const calculateRightSpaceFilterGeometry = () => {
        if (rightSpaceSearchBarRef.current && rightSpaceFilterRef.current) {
            const rightSpaceSearchBarBoundingBox = rightSpaceSearchBarRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const rightSpaceWidth = rightSpaceSearchBarBoundingBox.width * 0.85;

            setRightSpaceFilterGeometry({
                width: rightSpaceWidth,
                position: {
                    bottom: windowHeight - rightSpaceSearchBarBoundingBox.top + 10,
                    left: rightSpaceSearchBarBoundingBox.left + (Math.abs(rightSpaceSearchBarBoundingBox.width - rightSpaceWidth) / 2),
                },
            });
        }
    };

    useEffect(() => {
        calculateRightSpaceFilterGeometry();
    }, [dropFilter]);
  
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
        dispatch(toggleDrop('news', 'isDropFilter'))
    };
  
    return (
        <div ref={rightSpaceSearchBarRef} className="h-16 w-full bg-fg-white-90 flex justify-center items-center">
            <form className="w-4/5 h-10 bg-white rounded-md overflow-clip flex items-center">
                <input
                    id="rightSearchSubmit"
                    type="submit"
                    value=""
                    className="w-6 h-6 bg-cover bg-no-repeat ml-2 cursor-pointer"
                    style={{ backgroundImage: `url("assets/icons/${getSearchIcon()}")` }}
                />
                <input
                    id="rightSearchArea"
                    type="text"
                    placeholder="Search..."
                    className="grow h-full outline-none bg-white placeholder-fg-black-25 text-lg mx-1"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                    value={inputValue}
                />
                <div className="w-16 h-full bg-fg-white-95 flex justify-center items-center">
                    <input
                        id="rightFilterButton"
                        type="button"
                        className="h-8 aspect-square bg-cover bg-no-repeat cursor-pointer"
                        style={{ backgroundImage: `url("assets/icons/filter.svg")` }}
                        onClick={handleFilterDrop}
                    />
                </div>
            </form>
            {dropFilter ? <RightSearchFilter rightSpaceFilterRef={rightSpaceFilterRef} rightSpaceFilterGeometry={rightSpaceFilterGeometry} /> : null}
        </div>
    );
}