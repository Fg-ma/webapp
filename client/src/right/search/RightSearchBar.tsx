import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import RightSearchFilter from "./RightSearchFilter";
import {
  toggleDrop,
  cancelFilterChanges,
  setFilterValue,
} from "@redux/filters/filterActions";
import { RightSearchBarProps, RightPageState } from "@FgTypes/rightTypes";

export default function RightSearchBar({
  page,
  isFilter,
}: RightSearchBarProps) {
  /* 
    Description:   
      Creates the RightSearchBar with a submit button, text input, and filter button.
    Unique Properties:
      Switches the search icon to an arrow icon as the background of the 
      submit button when the text input is hover or there is text in it.
  */

  const dispatch = useDispatch();
  const dropFilter = useSelector(
    (state: RightPageState) => state.filters[page].isDropFilter,
  );
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [rightSpaceFilterGeometry, setRightSpaceFilterGeometry] = useState({
    width: 0,
    position: {
      bottom: 0,
      left: 0,
    },
  });
  const refs = {
    rightAddAdvancedSearchFilter: useRef<HTMLDivElement>(null),
    rightAdvancedSearchFilter: useRef<HTMLDivElement>(null),
    rightDateRange: useRef<HTMLDivElement>(null),
    rightDateRangeCaptionDropdown: useRef<HTMLDivElement>(null),
    rightSpaceFilter: useRef<HTMLDivElement>(null),
    rightSpaceSearchBar: useRef<HTMLDivElement>(null),
    rightAdvancedFilterDropdownDrop: useRef<HTMLDivElement>(null),
  };

  const calculateRightSpaceFilterGeometry = () => {
    if (refs.rightSpaceSearchBar.current && refs.rightSpaceFilter.current) {
      const rightSpaceSearchBarBoundingBox =
        refs.rightSpaceSearchBar.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const rightSpaceWidth = rightSpaceSearchBarBoundingBox.width * 0.85;

      setRightSpaceFilterGeometry({
        width: rightSpaceWidth,
        position: {
          bottom: windowHeight - rightSpaceSearchBarBoundingBox.top + 10,
          left:
            rightSpaceSearchBarBoundingBox.left +
            Math.abs(rightSpaceSearchBarBoundingBox.width - rightSpaceWidth) /
              2,
        },
      });
    }
  };

  // Reset the searchbar when page changes
  useEffect(() => {
    dispatch(setFilterValue(page, ""));
    setInputValue("");
  }, [page]);

  // Handles geometry calcutions and closing the dropdown when the mouse clicks out of it
  useEffect(() => {
    calculateRightSpaceFilterGeometry();

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropFilter]);

  useEffect(() => {
    const handleResize = () => {
      calculateRightSpaceFilterGeometry();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFilterDrop = () => {
    dispatch(toggleDrop(page, "isDropFilter"));
    dispatch(cancelFilterChanges(page));
  };

  // Handles logic for outside clicks and when to close the filter
  const handleClickOutside = (event: MouseEvent) => {
    if (!dropFilter) {
      return;
    }

    const isOutsideElement = (elementRef: React.RefObject<HTMLElement>) =>
      elementRef.current && !elementRef.current.contains(event.target as Node);

    const isOutsideFilter = isOutsideElement(refs.rightSpaceFilter);
    const isOutsideSearchBar = isOutsideElement(refs.rightSpaceSearchBar);
    const isOutsideDateRange =
      isOutsideElement(refs.rightDateRange) &&
      isOutsideElement(refs.rightDateRangeCaptionDropdown);

    const shouldToggleDrop =
      (refs.rightAddAdvancedSearchFilter.current &&
        !refs.rightAddAdvancedSearchFilter.current.contains(
          event.target as Node,
        ) &&
        !refs.rightAdvancedFilterDropdownDrop.current &&
        isOutsideFilter &&
        isOutsideSearchBar) ||
      (refs.rightAdvancedSearchFilter.current &&
        !refs.rightAdvancedSearchFilter.current.contains(
          event.target as Node,
        ) &&
        !refs.rightDateRange.current &&
        !refs.rightAdvancedFilterDropdownDrop.current &&
        isOutsideFilter &&
        isOutsideSearchBar) ||
      (refs.rightAdvancedSearchFilter.current &&
        !refs.rightAdvancedSearchFilter.current.contains(
          event.target as Node,
        ) &&
        refs.rightDateRange.current &&
        !refs.rightAdvancedFilterDropdownDrop.current &&
        isOutsideFilter &&
        isOutsideSearchBar &&
        isOutsideDateRange);

    if (shouldToggleDrop) {
      dispatch(toggleDrop(page, "isDropFilter"));
      dispatch(cancelFilterChanges(page));
    }
  };

  const handleRightSearchBarSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setFilterValue(page, inputValue));
  };

  return (
    <div
      ref={refs.rightSpaceSearchBar}
      className="h-16 w-full bg-fg-white-90 flex justify-center items-center"
    >
      <form
        className="w-4/5 h-10 bg-white rounded-md overflow-clip flex items-center border border-fg-white-85"
        onSubmit={handleRightSearchBarSubmit}
      >
        <button
          key="searchArrow"
          type="submit"
          value=""
          className="w-6 h-6 bg-cover bg-no-repeat ml-2 cursor-pointer"
          style={{
            backgroundImage:
              isInputFocused || inputValue.trim() !== ""
                ? 'url("assets/icons/searchArrow.svg")'
                : 'url("assets/icons/search.svg")',
          }}
        />
        <input
          id="rightSearchBarInput"
          type="text"
          placeholder="Search..."
          className="grow h-full outline-none bg-white placeholder-fg-black-25 text-lg mx-1 mt-0.5"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          value={inputValue}
        />
        {isFilter && (
          <div className="w-16 h-full bg-fg-white-95 flex justify-center items-center border-l border-fg-white-85">
            <input
              type="button"
              className="h-8 aspect-square bg-cover bg-no-repeat cursor-pointer"
              style={{
                backgroundImage: `url("assets/icons/filter.svg")`,
              }}
              onClick={handleFilterDrop}
            />
          </div>
        )}
      </form>
      <AnimatePresence>
        {dropFilter && (
          <RightSearchFilter
            page={page}
            rightSpaceFilterGeometry={rightSpaceFilterGeometry}
            refs={{
              rightSpaceFilter: refs.rightSpaceFilter,
              rightAddAdvancedSearchFilter: refs.rightAddAdvancedSearchFilter,
              rightAdvancedSearchFilter: refs.rightAdvancedSearchFilter,
              rightDateRange: refs.rightDateRange,
              rightDateRangeCaptionDropdown: refs.rightDateRangeCaptionDropdown,
              rightSpaceSearchBar: refs.rightSpaceSearchBar,
              rightAdvancedFilterDropdownDrop:
                refs.rightAdvancedFilterDropdownDrop,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
