import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { addAdvancedGroupFilter, removeAdvancedGroupFilter } from '../../redux/middleFilter/middleFilterActions';

const Popup = ({ name, position, dispatch, onMouseEnter, onMouseLeave, popupRef, isFilterSelected }) => {
    const handlePopupClick = () => {
        if (!isFilterSelected) {
          dispatch(addAdvancedGroupFilter(name));
        } else {
          dispatch(removeAdvancedGroupFilter(name));
        }
    };
    
    return createPortal(
        <div
            id={`groupPopup_${name}`}
            className={`bg-white my-1 ml-2 mr-3 h-14 py-1 px-2 w-max fixed z-10 overflow-visible cursor-pointer flex items-center rounded-md decoration-2 underline-offset-8 underline
            ${isFilterSelected ? 'decoration-fg-primary' : 'decoration-transparent'}
            `}
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={handlePopupClick}
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

const GroupFilterCard = (props) => {
    const dispatch = useDispatch();
    const advGrpFilters = useSelector((state) => state.middleFilter.filterPayload.groupFilters);
    const isFilterSelected = advGrpFilters.includes(props.name);

    const [popupState, setPopupState] = useState({
        visible: false,
        position: { top: 0, left: 0 },
    });

    const isMouseInsideOriginal = useRef(false);
    const isMouseInsidePopup = useRef(false);
    const hoverTimeout = useRef(null);
    const popupRef = useRef(null);

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
        const isLeavingToOriginal = toElement && toElement.id === `group ${props.identify}`;

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
        const element = document.getElementById(`group ${props.identify}`);
    
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
    }, [dispatch, props.identify, props.name]);

    function addGrpFilter() {
        if (!isFilterSelected) {
            dispatch(addAdvancedGroupFilter(props.name));
        } else {
            dispatch(removeAdvancedGroupFilter(props.name));
        }
    }

    return (
        <div
            id={`group ${props.identify}`}
            className={`bg-white my-1 ml-2 mr-3 h-14 py-1 px-2 cursor-pointer flex items-center rounded-md hover:bg-fg-secondary decoration-2 underline-offset-8 underline 
                ${isFilterSelected ? 'decoration-fg-primary' : 'decoration-transparent'}
                `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={addGrpFilter}
        >
            <div className="w-12 aspect-square bg-fg-white-85 mr-2 rounded-md grid place-items-center flex-shrink-0">
                <p className="select-none">pic</p>
            </div>
            <span className={'m-2 font-Josefin text-lg select-none truncate'}>{props.name}</span>
            {popupState.visible && (
                <Popup
                    name={props.name}
                    position={popupState.position}
                    dispatch={dispatch}
                    onMouseEnter={handlePopupMouseEnter}
                    onMouseLeave={handlePopupMouseLeave}
                    popupRef={popupRef}
                    isFilterSelected={isFilterSelected}
                />
            )}
        </div>
    );
};

export default GroupFilterCard;
