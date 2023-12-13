import React from "react";
import { useDispatch } from 'react-redux';
import { toggleAdvancedSearch } from "../../redux/middleFilter/middleFilterActions";

export default function AddAdvancedSearchFilter() {
    const dispatch = useDispatch();

    const handleAdvancedFilter = () => {
        dispatch(toggleAdvancedSearch());
    };

    return (
        <div className="w-full h-full flex justify-end items-end">
            <div className="flex items-center">
                <input
                    type="button"
                    name="isAdvancedSearch"
                    className="w-6 h-6 bg-cover bg-no-repeat mr-1 cursor-pointer"
                    style={{ backgroundImage: `url("assets/icons/addAdvancedFilters.svg")` }}
                    onClick={handleAdvancedFilter}
                />
                <input 
                    type="button" 
                    className="text-sm align-text-bottom cursor-pointer" 
                    value="Advanced Search..."
                    onClick={handleAdvancedFilter}
                />
            </div>
        </div>
    )
}