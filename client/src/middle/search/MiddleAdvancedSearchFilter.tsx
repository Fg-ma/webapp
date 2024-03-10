import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
  toggleAdvancedSearch,
  clearAdvancedAffiliateFilter,
  setDateRange,
} from "@redux/filters/filterActions";
import {
  MiddleAdvancedSearchFilterProps,
  MiddleFilterState,
} from "@FgTypes/middleTypes";
import AdvancedFilterDropdown from "@components/advancedFilterDropdown/AdvancedFilterDropdown";
import DateRangePicker from "@components/dateRangePicker/DateRangePicker";

export default function MiddleAdvancedSearchFilter({
  handleFilterFormChange,
  refs,
}: MiddleAdvancedSearchFilterProps) {
  /* 
    Description:   
      Creates the card for the advanced middle search filter.
    Unique Properties:
      Creates date range portal and calculates the portal position to be centered 
      below the dateRangeContainer.
  */

  const dispatch = useDispatch();
  const formAuthor = useSelector(
    (state: MiddleFilterState) => state.filters.middle.filterPayload.author,
  );
  const formDateRange = useSelector(
    (state: MiddleFilterState) => state.filters.middle.filterPayload.dateRange,
  );
  const [isDateRange, setIsDateRange] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [selectedRange, setSelectedRange] = useState<{
    from: string | object;
    to: string | object;
  }>({ from: "", to: "" });
  const [typed, setTyped] = useState(false);
  refs.middleDateRangeContainer = useRef<HTMLDivElement>(null);

  // Handles closeing the advanced search filter
  const handleAdvancedFilter = () => {
    setTimeout(() => {
      dispatch(toggleAdvancedSearch("middle"));
      dispatch(clearAdvancedAffiliateFilter("middle", "ind"));
      dispatch(clearAdvancedAffiliateFilter("middle", "grp"));
      dispatch(clearAdvancedAffiliateFilter("middle", "org"));
    });
  };

  // Handles clearing the values of the dropdowns depending on what subcategory is passed in
  const emptyAdvAffFilter = (subcategory: string) => {
    dispatch(clearAdvancedAffiliateFilter("middle", subcategory));
  };

  /* 
    Calculates what position the date range create portal should appear in and sets the position 
    state which is then passed down to the date range component. And sets selectedRange equal
    to formDateRange if selectedRange has an empty value where formDtaeRange doesn't.
  */
  useEffect(() => {
    if (
      formDateRange.from &&
      formDateRange.to &&
      !selectedRange.from &&
      !selectedRange.to
    ) {
      setSelectedRange({ from: formDateRange.from, to: formDateRange.to });
    } else if (formDateRange.from && !formDateRange.to && !selectedRange.from) {
      setSelectedRange((prev) => ({ from: formDateRange.from, to: prev.to }));
    } else if (!formDateRange.from && formDateRange.to && !selectedRange.to) {
      setSelectedRange((prev) => ({ from: prev.from, to: formDateRange.to }));
    }

    if (
      refs.middleDateRangeContainer?.current &&
      refs.middleDateRange.current
    ) {
      const containerBoundingBox =
        refs.middleDateRangeContainer.current.getBoundingClientRect();
      const dateRangeBoundingBox =
        refs.middleDateRange.current.getBoundingClientRect();

      setPosition({
        top: containerBoundingBox.top + 40,
        left:
          containerBoundingBox.left -
          Math.abs(containerBoundingBox.width - dateRangeBoundingBox.width) / 2,
      });
    }
  }, [isDateRange]);

  const toggleDateRange = () => {
    setIsDateRange((prev) => !prev);
  };

  // Handles any typed changes to the date range and dispatches as necessary to the local state
  const updateFormDateRange = () => {
    const regex = /^(0[1-9]|1[0-2])\.(0[1-9]|[12][0-9]|3[01])\.\d{4}$/;
    let validFrom = regex.test(formDateRange.from);
    let validTo = regex.test(formDateRange.to);
    if (validFrom && validTo) {
      setSelectedRange({
        from: formDateRange.from,
        to: formDateRange.to,
      });
    } else if (validFrom && !validTo) {
      setSelectedRange({ ...selectedRange, from: formDateRange.from });
    } else if (!validFrom && validTo) {
      setSelectedRange({ ...selectedRange, to: formDateRange.to });
    }
  };

  // Handles any typed changes to the date range and dispatches as necessary to the redux state
  const handleDateRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name == "from") {
      dispatch(setDateRange("middle", value, formDateRange.to));
    } else if (name == "to") {
      dispatch(setDateRange("middle", formDateRange.from, value));
    } else if (name == "clearDateRange") {
      dispatch(setDateRange("middle", "", ""));
    }

    setTyped(true);
    updateRangeStyles();
  };

  /* 
    If a valid range is in state then it will ensure that the correct classes are applied to 
    the correct elements it is also passed down to elements in the drop down
  */
  const updateRangeStyles = () => {
    setTimeout(() => {
      const regex = /^(0[1-9]|1[0-2])\.(0[1-9]|[12][0-9]|3[01])\.\d{4}$/;
      let validFrom = regex.test(formDateRange.from);
      let validTo = regex.test(formDateRange.to);

      if (validFrom && validTo) {
        setTimeout(() => {
          if (refs.middleDateRange.current) {
            const buttons = refs.middleDateRange.current.querySelectorAll(
              'button[name="day"].selected',
            );

            if (buttons.length) {
              const buttonArray = Array.from(buttons);

              buttonArray.forEach((button) => {
                button.classList.remove(
                  "rdp-day_range_start",
                  "rdp-day_range_end",
                  "rdp-day_range_middle",
                );
              });
              buttonArray[0].classList.add("rdp-day_range_start");
              buttonArray[buttons.length - 1].classList.add(
                "rdp-day_range_end",
              );

              const middleButtons = Array.from(buttons).slice(
                1,
                buttons.length - 1,
              );

              middleButtons.forEach((button) => {
                button.classList.add("rdp-day_range_middle");
              });
            }
          }
        }, 0);
      }
      if (!formDateRange.from && !formDateRange.to) {
        if (refs.middleDateRange.current) {
          const buttons = refs.middleDateRange.current.querySelectorAll(
            'button[name="day"].selected',
          );

          if (buttons.length) {
            const buttonArray = Array.from(buttons);

            buttonArray.forEach((button) => {
              button.classList.remove(
                "rdp-day_range_start",
                "rdp-day_range_end",
                "rdp-day_range_middle",
                "selected",
              );
            });
          }
        }
      } else if (formDateRange.from && !formDateRange.to) {
        if (refs.middleDateRange.current) {
          const buttons = refs.middleDateRange.current.querySelectorAll(
            'button[name="day"].selected',
          );

          if (buttons.length) {
            const buttonArray = Array.from(buttons);

            buttonArray.forEach((button) => {
              if (!button.classList.contains("rdp-day_range_start")) {
                button.classList.remove(
                  "rdp-day_range_start",
                  "rdp-day_range_end",
                  "rdp-day_range_middle",
                  "selected",
                );
              } else if (button.classList.contains("rdp-day_range_start")) {
                button.classList.remove(
                  "rdp-day_range_start",
                  "rdp-day_range_end",
                  "rdp-day_range_middle",
                );
              }
            });
          }
        }
      } else if (!formDateRange.from && formDateRange.to) {
        if (refs.middleDateRange.current) {
          const buttons = refs.middleDateRange.current.querySelectorAll(
            'button[name="day"].selected',
          );

          if (buttons.length) {
            const buttonArray = Array.from(buttons);

            buttonArray.forEach((button) => {
              if (!button.classList.contains("rdp-day_range_end")) {
                button.classList.remove(
                  "rdp-day_range_start",
                  "rdp-day_range_end",
                  "rdp-day_range_middle",
                  "selected",
                );
              } else if (button.classList.contains("rdp-day_range_end")) {
                button.classList.remove(
                  "rdp-day_range_start",
                  "rdp-day_range_end",
                  "rdp-day_range_middle",
                );
              }
            });
          }
        }
      }
    }, 0);
  };

  useEffect(() => {
    updateRangeStyles();
    if (typed) {
      setTyped(false);
      updateFormDateRange();
    }
  }, [formDateRange, isDateRange]);

  // Handles logic for outside clicks and when to close the date range picker
  const handleClickOutside = (event: MouseEvent) => {
    if (!isDateRange) {
      return;
    }

    const isOutsideDateRange =
      !refs.middleDateRange.current ||
      !refs.middleDateRange.current.contains(event.target as Node);
    const isOutsideDateRangeContainer =
      !refs.middleDateRangeContainer?.current ||
      !refs.middleDateRangeContainer.current.contains(event.target as Node);
    const isOutsideCaptionDropdown =
      !refs.middleDateRangeCaptionDropdown.current ||
      !refs.middleDateRangeCaptionDropdown.current.contains(
        event.target as Node,
      );

    if (
      isOutsideDateRange &&
      isOutsideDateRangeContainer &&
      (isOutsideCaptionDropdown || !refs.middleDateRangeCaptionDropdown.current)
    ) {
      setIsDateRange(false);
    }
  };

  // Handles closing the date range dropdown when the mouse clicks out of it
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDateRange]);

  return (
    <div
      ref={refs.middleAdvancedSearchFilter}
      className="h-full w-full bg-fg-white-95 rounded-lg"
    >
      <div className="flex items-center h-7 bg-fg-primary rounded-t-lg">
        <input
          type="button"
          name="isAdvancedSearch"
          className="w-6 h-6 bg-cover bg-no-repeat mx-1 cursor-pointer"
          style={{
            backgroundImage: `url("assets/icons/whiteClose.svg")`,
          }}
          onClick={handleAdvancedFilter}
        />
        <input
          type="button"
          className="text-base cursor-pointer mt-1 text-white"
          value="Remove Advanced Search"
          onClick={handleAdvancedFilter}
        />
      </div>
      <div className="p-2">
        <p className="text-lg">Filter by</p>
        <div className="bg-fg-white-85 p-2 rounded-md w-full">
          <p className="text-base">Affiliated...</p>
          <div className="w-full flex items-center justify-start mb-2">
            <AdvancedFilterDropdown
              filter={"middle"}
              subcategory={"ind"}
              advancedFilterDropdownDropRef={
                refs.middleAdvancedFilterDropdownDropRef
              }
              searchFilterRef={refs.middleAdvancedSearchFilterContainer}
            />
            <motion.button
              type="button"
              onClick={() => emptyAdvAffFilter("ind")}
              className="h-8 aspect-square bg-no-repeat bg-center"
              style={{
                backgroundImage: "url('assets/icons/trashCan.svg')",
              }}
              whileTap={{ scale: 1.075 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            ></motion.button>
          </div>
          <div className="w-full flex items-center justify-start my-2">
            <AdvancedFilterDropdown
              filter={"middle"}
              subcategory={"grp"}
              advancedFilterDropdownDropRef={
                refs.middleAdvancedFilterDropdownDropRef
              }
              searchFilterRef={refs.middleAdvancedSearchFilterContainer}
            />
            <motion.button
              type="button"
              onClick={() => emptyAdvAffFilter("grp")}
              className="h-8 aspect-square bg-no-repeat bg-center"
              style={{
                backgroundImage: "url('assets/icons/trashCan.svg')",
              }}
              whileTap={{ scale: 1.075 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            ></motion.button>
          </div>
          <div className="w-full flex items-center justify-start mt-2">
            <AdvancedFilterDropdown
              filter={"middle"}
              subcategory={"org"}
              advancedFilterDropdownDropRef={
                refs.middleAdvancedFilterDropdownDropRef
              }
              searchFilterRef={refs.middleAdvancedSearchFilterContainer}
            />
            <motion.button
              type="button"
              onClick={() => emptyAdvAffFilter("org")}
              className="h-8 aspect-square bg-no-repeat bg-center"
              style={{
                backgroundImage: "url('assets/icons/trashCan.svg')",
              }}
              whileTap={{ scale: 1.075 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            ></motion.button>
          </div>
        </div>
        <div className="w-full mt-2">
          <label
            htmlFor="middleAuthor"
            className="text-base ml-1 cursor-pointer"
          >
            Author
          </label>
          <div className="h-fit flex items-center justify-center -mt-1">
            <input
              type="text"
              placeholder="Author..."
              name="author"
              id="middleAuthor"
              className="grow bg-white h-8 rounded-md text-sm px-1 font-K2D focus:outline-none focus:border-2 focus:border-fg-secondary border border-fg-white-85"
              onChange={handleFilterFormChange}
              value={formAuthor}
            ></input>
            <motion.button
              type="button"
              name="author"
              className="h-8 aspect-square bg-no-repeat bg-center ml-1"
              style={{
                backgroundImage: "url('assets/icons/trashCan.svg')",
              }}
              onClick={() =>
                handleFilterFormChange({
                  target: { name: "author", value: "" },
                } as ChangeEvent<HTMLInputElement>)
              }
              value=""
              whileTap={{ scale: 1.075 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            ></motion.button>
          </div>
        </div>
        <div className="w-full mt-2">
          <label
            htmlFor="middleDateRange"
            className="text-base ml-1 cursor-pointer"
          >
            Date Range
          </label>
          <div
            ref={refs.middleDateRangeContainer}
            className="w-full flex items-center justify-start -mt-1"
          >
            <div className="grow bg-white rounded-md flex items-center justify-start border border-fg-white-85">
              <input
                type="text"
                placeholder="mm.dd.yyyy"
                name="from"
                id="middleDateRange"
                className="w-2/5 bg-white text-center h-8 text-sm px-1 rounded-md font-K2D focus:outline-none focus:border-2 focus:border-fg-secondary"
                onChange={handleDateRangeChange}
                value={formDateRange.from}
              ></input>
              <p className="grow text-center text-sm font-K2D">to</p>
              <input
                type="text"
                placeholder="mm.dd.yyyy"
                name="to"
                id="dateRange"
                className="w-2/5 bg-white text-center h-8 text-sm px-1 rounded-md font-K2D focus:outline-none focus:border-2 focus:border-fg-secondary"
                onChange={handleDateRangeChange}
                value={formDateRange.to}
              ></input>
              <button
                type="button"
                className="h-8 aspect-square bg-no-repeat bg-center"
                style={{
                  backgroundImage: "url('assets/icons/dateRangeCalendar.svg')",
                }}
                onClick={toggleDateRange}
              ></button>
            </div>
            <motion.button
              type="button"
              name="clearDateRange"
              className="h-8 aspect-square bg-no-repeat bg-center ml-1"
              style={{
                backgroundImage: "url('assets/icons/trashCan.svg')",
              }}
              onClick={() =>
                handleDateRangeChange({
                  target: { name: "clearDateRange" },
                } as ChangeEvent<HTMLInputElement>)
              }
              value=""
              whileTap={{ scale: 1.075 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            ></motion.button>
          </div>
          <AnimatePresence>
            {isDateRange && (
              <DateRangePicker
                filter={"middle"}
                position={position}
                selectedRange={selectedRange}
                setSelectedRange={setSelectedRange}
                updateRangeStyles={updateRangeStyles}
                refs={{
                  dateRange: refs.middleDateRange,
                  dateRangeCaptionDropdown: refs.middleDateRangeCaptionDropdown,
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
