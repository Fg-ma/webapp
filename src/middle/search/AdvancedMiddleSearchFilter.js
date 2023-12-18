import React from "react";
import { useDispatch } from 'react-redux';
import AdvancedFilterDropdown from "./AdvancedFilterDropDown";
import { toggleAdvancedSearch, clearAdvancedAffiliateFilter } from "../../redux/middleFilter/middleFilterActions";

export default function AdvancedMiddleSearchFilter() {
    const dispatch = useDispatch();

    const handleAdvancedFilter = () => {
        dispatch(toggleAdvancedSearch());
        dispatch(clearAdvancedAffiliateFilter('ind'));
        dispatch(clearAdvancedAffiliateFilter('grp'));
        dispatch(clearAdvancedAffiliateFilter('org'));
    };

    function emptyAdvAffFilter(subcategory) {
        dispatch(clearAdvancedAffiliateFilter(subcategory));
    };

    return (
        <div className="h-full w-full bg-fg-white-95 rounded-lg">
            <div className="flex items-center h-7 bg-fg-white-90 rounded-t-lg">
                <input
                    type="button"
                    name="isAdvancedSearch"
                    className="w-6 h-6 bg-cover bg-no-repeat mr-1 cursor-pointer"
                    style={{ backgroundImage: `url("assets/icons/close.svg")` }}
                    onClick={handleAdvancedFilter}
                />
                <input 
                    type="button" 
                    className="text-sm cursor-pointer mt-1"
                    value="Remove Advanced Search"
                    onClick={handleAdvancedFilter}
                />
            </div>
            <p className="text-lg ml-2 mt-2">Filter by</p>
            <div className="bg-fg-white-85 m-2 p-2 rounded-md" style={{ width: `calc(100% - 1rem)` }}>
                <p className="text-base">Affiliated...</p>
                <div className="w-full flex items-center justify-center">
                    <AdvancedFilterDropdown subcategory={"ind"} />
                    <button
                        type="button"
                        onClick={() => emptyAdvAffFilter("ind")}
                        className="w-1/6 aspect-square bg-no-repeat bg-center"
                        style={{ backgroundImage: "url('assets/icons/trashCan.svg')"}}
                    ></button>
                </div>
                <div className="w-full flex items-center justify-center">
                    <AdvancedFilterDropdown subcategory={"grp"} />
                    <button
                        type="button"
                        onClick={() => emptyAdvAffFilter('grp')}
                        className="w-1/6 aspect-square bg-no-repeat bg-center"
                        style={{ backgroundImage: "url('assets/icons/trashCan.svg')"}}
                    ></button>
                </div>
                <div className="w-full flex items-center justify-center">
                    <AdvancedFilterDropdown subcategory={"org"} />
                    <button
                        type="button"
                        onClick={() => emptyAdvAffFilter('org')}
                        className="w-1/6 aspect-square bg-no-repeat bg-center"
                        style={{ backgroundImage: "url('assets/icons/trashCan.svg')"}}
                    ></button>
                </div>
            </div>
        </div>
    );
};