import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAdvancedGroupFilter, removeAdvancedGroupFilter } from "../../redux/middleFilter/middleFilterActions";

export default function ExpandedGroupFilterCard(props) {
    const dispatch = useDispatch();

    const advGrpFilters = useSelector((state) => state.middleFilter.filterPayload.groupFilters);
    const isFilterSelected = advGrpFilters.includes(props.name);

    const advHvrGrpFilters = useSelector((state) => state.middleFilter.filterPayload.groupFiltersHover);
    let visible = false;
    if (advHvrGrpFilters == props.name) {
        visible = true;
    };

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
            id={`groupPopup ${props.identify}`}
            className={`bg-fg-primary relative my-1 ml-2 mr-3 h-14 py-1 px-2 w-max overflow-visible cursor-pointer flex items-center rounded-md hover:bg-fg-secondary decoration-2 underline-offset-8 underline 
            ${isFilterSelected ? 'decoration-fg-primary' : 'decoration-transparent'}
            ${visible ? "visible" : "hidden"}
            `}
            onClick={addGrpFilter}
        >
            <div className="w-12 aspect-square bg-fg-white-85 mr-2 rounded-md grid place-items-center flex-shrink-0">
                <p className="select-none">pic</p>
            </div>
            <span className={"m-2 font-Josefin text-lg select-none"}>
                {props.name}
            </span>
        </div>
    );
};