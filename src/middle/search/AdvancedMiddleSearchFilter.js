import React from "react";
import { useDispatch } from 'react-redux';
import IndividualAdvancedFilterDropdown from "./IndividualAdvancedFilterDropdown";
import { removeAdvancedIndividualFilter } from "../../redux/middleFilter/middleFilterActions";

export default function AdvancedMiddleSearchFilter() {
    const dispatch = useDispatch();

    function emptyAdvIndFilter() {
        dispatch(removeAdvancedIndividualFilter());
    };

    return (
        <div className="h-full w-full bg-fg-white-95 rounded-lg">
            <p className="text-lg ml-2 mt-2">Filter by</p>
            <div className="bg-fg-white-85 m-2 p-2 rounded-md">
                <p className="text-base">Affiliated...</p>
                <div className="flex items-center justify-center">
                    <IndividualAdvancedFilterDropdown />
                    <button
                        type="button"
                        onClick={emptyAdvIndFilter}
                        className="w-1/6 aspect-square bg-no-repeat bg-center"
                        style={{ backgroundImage: "url('assets/icons/trashCan.svg')"}}
                    ></button>
                </div>
            </div>
        </div>
    );
}