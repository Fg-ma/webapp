import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { addAdvancedAffiliateFilter, removeAdvancedAffiliateFilter } from '../../redux/filters/filterActions';

function Popup(props) {
    
    /* 
        Description:   
            The popup is the portal that is created when the mouse hovers over a FilterCard that has 
            text overflowing.
        Unique Properties:
            Acts the same as a filter card except that it can go beyond the boundaries of the container 
            and doesn't switch to fg-secondary as the background when hovered over.
    */

    const { name, position, onMouseEnter, onMouseLeave, popupRef, isFilterSelected, subcategory } = props;
    console.log(popupRef)

    return createPortal(
        <div
            id={`${subcategory}Popup_${name}`}
            className={`bg-white my-1 ml-2 mr-3 h-14 py-1 px-2 w-max fixed z-10 overflow-visible cursor-pointer flex items-center rounded-md decoration-2 underline-offset-8 underline
                ${isFilterSelected ? 'decoration-fg-primary' : 'decoration-transparent'}
                `}
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            ref={popupRef}
        >
            <div className="w-12 aspect-square bg-fg-white-85 mr-2 rounded-md grid place-items-center flex-shrink-0">
                <p className="select-none">pic</p>
            </div>
            <span className={'m-2 font-Josefin text-lg select-none'}>{name}</span>
        </div>,
        document.body
    );
};

export default function MiddleFilterCard(props) {

    /* 
        Description:   
            Creates the cards that appear in the AdvancedFilterDropDowns.
        Unique Properties:
            Determines when, how, and where to display popups(portals).
    */
    
    const { identify, name, subcategory, popupRef } = props;
    const dispatch = useDispatch();
    const advFilters = useSelector((state) => state.filters.middle.filterPayload.affiliatedFilters[subcategory]);
    const isFilterSelected = advFilters.includes(name);

    const [popupState, setPopupState] = useState({
        visible: false,
        position: { top: 0, left: 0 },
    });

    const isMouseInsideOriginal = useRef(false);
    const isMouseInsidePopup = useRef(false);
    const hoverTimeout = useRef(null);
    const nameSpanRef = useRef(null);

    const isOverflowing = nameSpanRef.current && nameSpanRef.current.scrollWidth > nameSpanRef.current.offsetWidth;

    const calculatePopupPosition = (event) => {
        const boundingBox = event.target.getBoundingClientRect();
        return {
            top: boundingBox.top + window.scrollY - 4,
            left: boundingBox.left + window.scrollX - 8,
        };
    };

    const handleMouseEnter = (event) => {
        isMouseInsideOriginal.current = true;

        // Clear the previous timeout (if any)
        clearTimeout(hoverTimeout.current);
        if (!isMouseInsidePopup.current) {
            hoverTimeout.current = setTimeout(() => {
                if (isMouseInsideOriginal.current) {
                    setPopupState({
                        visible: true,
                        position: calculatePopupPosition(event),
                    });
                }
            }, 1500);
        } else {
            if (isMouseInsideOriginal.current) {
                setPopupState({
                    visible: true,
                    position: calculatePopupPosition(event),
                });
            }
        }
    };

    const handleMouseLeave = (event) => {
        const toElement = event.toElement || event.relatedTarget;
    
        isMouseInsideOriginal.current = false;
        clearTimeout(hoverTimeout.current);
    
        // Check if toElement is a valid Node and popupRef.current exists and toElement is not null
        if (toElement instanceof Node && popupRef.current && !isMouseInsidePopup.current && !popupRef.current.contains(toElement)) {
            setPopupState({
                visible: false,
                position: { top: 0, left: 0 },
            });
        }
    };

    const handlePopupMouseEnter = () => {
        isMouseInsidePopup.current = true;
        clearTimeout(hoverTimeout.current);
    };

    const handlePopupMouseLeave = (event) => {
        const toElement = event.toElement || event.relatedTarget;
        const isLeavingToOriginal = toElement && toElement.id === `${subcategory}_${identify}`;

        isMouseInsidePopup.current = false;

        clearTimeout(hoverTimeout.current);

        if (!isMouseInsideOriginal.current && !isMouseInsidePopup.current && !isLeavingToOriginal) {
            setPopupState({
                visible: false,
                position: { top: 0, left: 0 },
            });
        }
    };
  
    useEffect(() => {
        const element = document.getElementById(`${subcategory}_${identify}`);
    
        if (element) {
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
    
            return () => {
                clearTimeout(hoverTimeout.current);
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    
        // Return a cleanup function that does nothing if the element is not found
        return () => {};
    }, [dispatch, identify, name]);

    function handleFilterClick() {
        if (!isFilterSelected) {
            dispatch(addAdvancedAffiliateFilter('middle', name, subcategory));
        } else {
            dispatch(removeAdvancedAffiliateFilter('middle', name, subcategory));
        }
    }

    return (
        <div
            id={`${subcategory}_${identify}`}
            className={`bg-white my-1 ml-2 mr-3 h-14 py-1 px-2 cursor-pointer flex items-center rounded-md hover:bg-fg-secondary decoration-2 underline-offset-8 underline 
                ${isFilterSelected ? 'decoration-fg-primary' : 'decoration-transparent'}
                `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleFilterClick}
        >   
            
            <div className={`w-12 aspect-square bg-fg-white-85 mr-2 grid place-items-center flex-shrink-0
                ${subcategory === "ind" ? 'rounded-full' : 'rounded-md'}
                `}>
                <p className="select-none">pic</p>
            </div>
            <span
                ref={nameSpanRef}
                className={'m-2 font-Josefin text-lg select-none truncate'}
            >
                {name}
            </span>
            {popupState.visible && isOverflowing && (
                <Popup
                    name={name}
                    position={popupState.position}
                    onMouseEnter={handlePopupMouseEnter}
                    onMouseLeave={handlePopupMouseLeave}
                    popupRef={popupRef}
                    isFilterSelected={isFilterSelected}
                    subcategory={subcategory}
                />
            )}
        </div>
    );
};
