import React from "react";
import { useDispatch } from "react-redux";
import { toggleAdvancedSearch } from "@redux/filters/filterActions";

interface MiddleAddAdvancedSearchFilterProps {
  middleAddAdvancedSearchFilterRef: React.RefObject<HTMLDivElement>;
}

export default function MiddleAddAdvancedSearchFilter({
  middleAddAdvancedSearchFilterRef,
}: MiddleAddAdvancedSearchFilterProps) {
  /* 
    Description:   
      Creates the button for adding an advanced search filter.
    Unique Properties:
      N/A
  */

  const dispatch = useDispatch();

  const handleAdvancedFilter = () => {
    setTimeout(() => {
      dispatch(toggleAdvancedSearch("middle"));
    });
  };

  return (
    <div
      ref={middleAddAdvancedSearchFilterRef}
      className="w-full h-full flex justify-end items-end"
    >
      <div className="flex items-center">
        <input
          type="button"
          name="isAdvancedSearch"
          className="w-6 h-6 bg-cover bg-no-repeat mr-1 cursor-pointer"
          style={{
            backgroundImage: `url("assets/icons/addAdvancedFilters.svg")`,
          }}
          onClick={handleAdvancedFilter}
        />
        <input
          type="button"
          className="text-sm cursor-pointer mt-1"
          value="Advanced Search..."
          onClick={handleAdvancedFilter}
        />
      </div>
    </div>
  );
}
