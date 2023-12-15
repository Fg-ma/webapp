import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAdvancedGroupFilter, removeAdvancedGroupFilter, addHoverGroupFilter, clearHoverGroupFilter } from "../../redux/middleFilter/middleFilterActions";

export default function GroupFilterCard(props) {
    const dispatch = useDispatch();
    const advGrpFilters = useSelector((state) => state.middleFilter.filterPayload.groupFilters);

    const isFilterSelected = advGrpFilters.includes(props.name);

    useEffect(() => {
        let timeout;
        
        const handleMouseEnter = () => {
            timeout = setTimeout(() => {
                dispatch(addHoverGroupFilter(props.name))
            }, 1500); 
        };
      
        const handleMouseLeave = () => {
            clearTimeout(timeout);
            dispatch(clearHoverGroupFilter())
        };
      
        // Attach event listeners
        const element = document.getElementById(`group ${props.identify}`);
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      
        // Clean up event listeners
        return () => {
            clearTimeout(timeout);
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    function addGrpFilter() {
        if (!isFilterSelected) {
            dispatch(addAdvancedGroupFilter(props.name))
        } else {
            console.log(props.name)
            dispatch(removeAdvancedGroupFilter(props.name))
        }
    }

    return (
        <div
            id={`group ${props.identify}`}
            className={`bg-white my-1 ml-2 mr-3 h-14 py-1 px-2 cursor-pointer flex items-center rounded-md hover:bg-fg-secondary decoration-2 underline-offset-8 underline 
            ${isFilterSelected ? 'decoration-fg-primary' : 'decoration-transparent'}
            `}
            onClick={addGrpFilter}
        >
            <div className="w-12 aspect-square bg-fg-white-85 mr-2 rounded-md grid place-items-center flex-shrink-0">
                <p className="select-none">pic</p>
            </div>
            <span className={"m-2 font-Josefin text-lg select-none truncate"}>
                {props.name}
            </span>
        </div>
    );
};