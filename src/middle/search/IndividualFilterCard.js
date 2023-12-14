import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAdvancedIndividualFilter } from "../../redux/middleFilter/middleFilterActions";

export default function IndividualFilterCard(props) {
    const dispatch = useDispatch();
    const advIndFilters = useSelector((state) => state.middleFilter.filterPayload.individualFilters);

    const isFilterSelected = advIndFilters.includes(props.name);

    function addIndFilter() {
        dispatch(addAdvancedIndividualFilter(props.name))
    }

    return (
        <div 
            className={`bg-white w-fill my-1 ml-2 mr-3 h-14 py-1 px-2 cursor-pointer flex items-center rounded-md hover:bg-fg-secondary decoration-2 underline-offset-8 underline ${isFilterSelected ? 'decoration-fg-primary' : 'decoration-transparent'}`}
            onClick={addIndFilter}
        >
            <div className="w-10 aspect-square bg-fg-white-85 mr-2 rounded-full grid place-items-center flex-shrink-0">
                <p className="select-none">pic</p>
            </div>
            <span className="m-2 truncate font-Josefin text-lg select-none">
                {props.name}
            </span>
        </div>
    )
}