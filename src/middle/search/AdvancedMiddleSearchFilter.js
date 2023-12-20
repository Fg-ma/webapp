import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import AdvancedFilterDropdown from "./AdvancedFilterDropDown";
import { toggleAdvancedSearch, clearAdvancedAffiliateFilter } from "../../redux/middleFilter/middleFilterActions";

export default function AdvancedMiddleSearchFilter(props) {
    const dispatch = useDispatch();
    const { handleFilterFormChange } = props;
    const formAuthor = useSelector(state => state.middleFilter.filterPayload.author);
    const formDateRange = useSelector(state => state.middleFilter.filterPayload.dateRange);

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
            <div className="flex items-center h-7 bg-fg-primary rounded-t-lg">
                <input
                    type="button"
                    name="isAdvancedSearch"
                    className="w-6 h-6 bg-cover bg-no-repeat mx-1 cursor-pointer"
                    style={{ backgroundImage: `url("assets/icons/whiteClose.svg")`}}
                    onClick={handleAdvancedFilter}
                />
                <input 
                    type="button" 
                    className="text-sm cursor-pointer mt-1 text-white"
                    value="Remove Advanced Search"
                    onClick={handleAdvancedFilter}
                />
            </div>
            <p className="text-lg ml-2 mt-2">Filter by</p>
            <div className="bg-fg-white-85 mx-2 p-2 rounded-md" style={{ width: `calc(100% - 1rem)` }}>
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
            <div className="w-full">
                <p className="text-base ml-2 mt-2 -mb-1">Author</p>
                <div className="h-fit flex items-center justify-center mx-2">
                    <input
                        type="text" 
                        placeholder="Author..."
                        name="author" 
                        className="grow bg-white h-8 rounded-md text-sm px-1"
                        onChange={handleFilterFormChange}                 
                        value={formAuthor}
                    >
                    </input>
                    <button
                            type="button"
                            name="author"
                            className="h-8 aspect-square bg-no-repeat bg-center ml-1"
                            style={{ backgroundImage: "url('assets/icons/trashCan.svg')"}}
                            onClick={handleFilterFormChange}
                            value=""
                    ></button>
                </div>
            </div>
            <div className="w-full mb-3">
                <p className="text-base ml-2 mt-2 -mb-1">Date Range</p>
                <div className="flex items-center justify-center mx-2">
                    <div className="grow bg-white rounded-md flex items-center justify-center">
                        <input 
                            type="text" 
                            placeholder="mm.dd.yyyy - mm.dd.yyyy" 
                            name="dateRange"
                            className="grow bg-white h-8 text-sm px-1"
                            onChange={handleFilterFormChange}                 
                            value={formDateRange}
                        >
                        </input>
                        <button
                            type="button"
                            className="h-8 aspect-square bg-no-repeat bg-center"
                            style={{ backgroundImage: "url('assets/icons/dateRangeCalendar.svg')"}}
                        ></button>
                    </div>
                    <button
                            type="button"
                            name="dateRange"
                            className="h-8 aspect-square bg-no-repeat bg-center ml-1"
                            style={{ backgroundImage: "url('assets/icons/trashCan.svg')"}}
                            onClick={handleFilterFormChange}
                            value=""
                    ></button>
                </div>
            </div>
        </div>
    );
};