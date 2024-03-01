import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { toggleDrop, cancelFilterChanges } from "@redux/filters/filterActions";
import { MiddleSearchBarProps, MiddleFilterState } from "@FgTypes/middleTypes";
import MiddleSearchFilter from "./MiddleSearchFilter";

const middleSearchFilterVar: Variants = {
  init: {
    opacity: 0,
    y: "-2vh",
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const transition: Transition = {
  transition: {
    duration: 0.25,
    ease: "easeOut",
  },
};

export default function MiddleSearchBar({
  middleSpaceContainerRef,
  middleSpaceRef,
}: MiddleSearchBarProps) {
  /* 
    Description:   
      Creates the MiddleSearchBar with a submit button, text input, and filter button.
    Unique Properties:
      Switches the search icon to an arrow icon as the background of the 
      submit button when the text input is hover or there is text in it.
  */

  const dispatch = useDispatch();
  const dropFilter = useSelector(
    (state: MiddleFilterState) => state.filters.middle.isDropFilter,
  );
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const refs = {
    middleSpaceContainer: middleSpaceContainerRef,
    middleSpace: middleSpaceRef,
    middleAddAdvancedSearchFilter: useRef<HTMLDivElement>(null),
    middleAdvancedSearchFilter: useRef<HTMLDivElement>(null),
    middleDateRange: useRef<HTMLDivElement>(null),
    middleDateRangeCaptionDropdown: useRef<HTMLDivElement>(null),
    middleSpaceFilter: useRef<HTMLDivElement>(null),
    middleSpaceSearchBar: useRef<HTMLDivElement>(null),
    middleAdvancedFilterDropdownDropRef: useRef<HTMLDivElement>(null),
  };
  const middleSpaceContainerWidth =
    refs.middleSpaceContainer.current?.offsetWidth;
  const middleSearchWidth = middleSpaceContainerWidth
    ? `${middleSpaceContainerWidth * 0.8}px`
    : "0px";

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
    dispatch(toggleDrop("middle", "isDropFilter"));
    dispatch(cancelFilterChanges("middle"));
  };

  // Handles logic for outside clicks and when to close the filter
  const handleClickOutside = (event: MouseEvent) => {
    if (!dropFilter) {
      return;
    }

    const isOutsideElement = (elementRef: React.RefObject<HTMLElement>) =>
      elementRef.current && !elementRef.current.contains(event.target as Node);

    const isOutsideFilter = isOutsideElement(refs.middleSpaceFilter);
    const isOutsideSearchBar = isOutsideElement(refs.middleSpaceSearchBar);
    const isOutsideDateRange =
      isOutsideElement(refs.middleDateRange) &&
      isOutsideElement(refs.middleDateRangeCaptionDropdown);

    const shouldToggleDrop =
      (refs.middleSpace.current &&
        refs.middleSpace.current.contains(event.target as Node) &&
        refs.middleAddAdvancedSearchFilter.current &&
        !refs.middleAddAdvancedSearchFilter.current.contains(
          event.target as Node,
        ) &&
        !refs.middleAdvancedFilterDropdownDropRef.current &&
        isOutsideFilter &&
        isOutsideSearchBar) ||
      (refs.middleSpace.current &&
        refs.middleSpace.current.contains(event.target as Node) &&
        refs.middleAdvancedSearchFilter.current &&
        !refs.middleAdvancedSearchFilter.current.contains(
          event.target as Node,
        ) &&
        !refs.middleDateRange.current &&
        !refs.middleAdvancedFilterDropdownDropRef.current &&
        isOutsideFilter &&
        isOutsideSearchBar) ||
      (refs.middleSpace.current &&
        refs.middleSpace.current.contains(event.target as Node) &&
        refs.middleAdvancedSearchFilter.current &&
        !refs.middleAdvancedSearchFilter.current.contains(
          event.target as Node,
        ) &&
        refs.middleDateRange.current &&
        !refs.middleAdvancedFilterDropdownDropRef.current &&
        isOutsideFilter &&
        isOutsideSearchBar &&
        isOutsideDateRange);

    if (shouldToggleDrop) {
      dispatch(toggleDrop("middle", "isDropFilter"));
      dispatch(cancelFilterChanges("middle"));
    }
  };

  // Handles closing the dropdown when the mouse clicks out of it
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropFilter]);

  return (
    <div
      ref={refs.middleSpaceSearchBar}
      className="flex flex-col justify-center items-center"
      style={{ width: middleSearchWidth }}
    >
      <form className="w-full h-10 bg-white rounded-md overflow-clip flex items-center shadow-md">
        <input
          id="middleSearchSubmit"
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
          id="middleSearchArea"
          type="text"
          placeholder="Search..."
          className="grow h-full outline-none bg-white placeholder-fg-black-25 text-lg mx-1"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          value={inputValue}
        />
        <div className="w-16 h-full bg-fg-white-90 flex justify-center items-center">
          <input
            type="button"
            className="w-8 h-8 bg-cover bg-no-repeat cursor-pointer"
            style={{
              backgroundImage: `url("assets/icons/filter.svg")`,
            }}
            onClick={handleFilterDrop}
          />
        </div>
      </form>
      <AnimatePresence>
        {dropFilter && (
          <motion.div
            className="w-full"
            variants={middleSearchFilterVar}
            initial="init"
            animate="animate"
            exit="init"
            transition={transition}
          >
            <MiddleSearchFilter
              refs={{
                middleSpaceFilter: refs.middleSpaceFilter,
                middleAddAdvancedSearchFilter:
                  refs.middleAddAdvancedSearchFilter,
                middleAdvancedSearchFilter: refs.middleAdvancedSearchFilter,
                middleDateRange: refs.middleDateRange,
                middleDateRangeCaptionDropdown:
                  refs.middleDateRangeCaptionDropdown,
                middleAdvancedFilterDropdownDropRef:
                  refs.middleAdvancedFilterDropdownDropRef,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
