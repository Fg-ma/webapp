import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
  toggleAdvancedSearch,
  clearAdvancedAffiliateFilter,
  setDateRange,
} from "@redux/filters/filterActions";
import {
  RightAdvancedSearchFilterProps,
  RightFilterState,
} from "@FgTypes/rightTypes";
import AdvancedFilterDropdown from "@components/advancedFilterDropdown/AdvancedFilterDropdown";
import DateRangePicker from "@components/dateRangePicker/DateRangePicker";

export default function RightAdvancedSearchFilter({
  page,
  handleFilterFormChange,
  refs,
}: RightAdvancedSearchFilterProps) {
  /* 
    Description:   
      Creates the card for the advanced right search filter.
    Unique Properties:
      Creates date range portal and calculates the portal position to be centered 
      below the dateRangeContainer.
  */

  const dispatch = useDispatch();
  const formAuthor = useSelector(
    (state: RightFilterState) => state.filters[page].filterPayload.author,
  );
  const formDateRange = useSelector(
    (state: RightFilterState) => state.filters[page].filterPayload.dateRange,
  );
  const [isDateRange, setIsDateRange] = useState(false);
  const [position, setPosition] = useState({ bottom: 0, left: 0 });
  const [selectedRange, setSelectedRange] = useState<{
    from: string | object;
    to: string | object;
  }>({ from: "", to: "" });
  const [typed, setTyped] = useState(false);
  refs.rightDateRangeContainer = useRef<HTMLDivElement>(null);

  const handleAdvancedFilter = () => {
    setTimeout(() => {
      dispatch(toggleAdvancedSearch(page));
      dispatch(clearAdvancedAffiliateFilter(page, "ind"));
      dispatch(clearAdvancedAffiliateFilter(page, "grp"));
      dispatch(clearAdvancedAffiliateFilter(page, "org"));
    }, 0);
  };

  function emptyAdvAffFilter(subcategory: string) {
    dispatch(clearAdvancedAffiliateFilter(page, subcategory));
  }

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

    if (refs.rightDateRangeContainer?.current && refs.rightDateRange.current) {
      const containerBoundingBox =
        refs.rightDateRangeContainer.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const dateRangeBoundingBox =
        refs.rightDateRange.current.getBoundingClientRect();

      setPosition({
        bottom: windowHeight - containerBoundingBox.top + 10,
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
      dispatch(setDateRange(page, value, formDateRange.to));
    } else if (name == "to") {
      dispatch(setDateRange(page, formDateRange.from, value));
    } else if (name == "clearDateRange") {
      dispatch(setDateRange(page, "", ""));
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
          if (refs.rightDateRange.current) {
            const buttons = refs.rightDateRange.current.querySelectorAll(
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
        if (refs.rightDateRange.current) {
          const buttons = refs.rightDateRange.current.querySelectorAll(
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
        if (refs.rightDateRange.current) {
          const buttons = refs.rightDateRange.current.querySelectorAll(
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
        if (refs.rightDateRange.current) {
          const buttons = refs.rightDateRange.current.querySelectorAll(
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
      !refs.rightDateRange.current ||
      !refs.rightDateRange.current.contains(event.target as Node);
    const isOutsideDateRangeContainer =
      !refs.rightDateRangeContainer?.current ||
      !refs.rightDateRangeContainer.current.contains(event.target as Node);
    const isOutsideCaptionDropdown =
      !refs.rightDateRangeCaptionDropdown.current ||
      !refs.rightDateRangeCaptionDropdown.current.contains(
        event.target as Node,
      );

    if (
      isOutsideDateRange &&
      isOutsideDateRangeContainer &&
      (isOutsideCaptionDropdown || !refs.rightDateRangeCaptionDropdown.current)
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
      ref={refs.rightAdvancedSearchFilter}
      className="h-full w-full bg-fg-white-95 rounded-lg"
    >
      {page !== "messages" && (
        <div>
          <div className="flex items-center justify-between h-7 bg-fg-primary rounded-t-lg drop-shadow-md">
            <input
              type="button"
              className="text-base cursor-pointer text-white pl-2"
              value="Advanced Search"
              onClick={handleAdvancedFilter}
            />
            <input
              type="button"
              name="isAdvancedSearch"
              className="w-6 h-6 bg-cover bg-no-repeat mx-1 cursor-pointer"
              style={{
                backgroundImage: `url("assets/icons/whiteClose.svg")`,
              }}
              onClick={handleAdvancedFilter}
            />
          </div>
          <p className="text-lg ml-2 my-1">Filter by</p>
          <div
            className="bg-fg-white-85 mx-2 p-2 rounded-md"
            style={{ width: `calc(100% - 1rem)` }}
          >
            <p className="text-base">Affiliated...</p>
            <div className="w-full flex items-center justify-start mb-2">
              <AdvancedFilterDropdown
                filter={page}
                subcategory={"ind"}
                advancedFilterDropdownDropRef={
                  refs.rightAdvancedFilterDropdownDrop
                }
                searchFilterRef={refs.rightSpaceFilter}
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
                filter={page}
                subcategory={"grp"}
                advancedFilterDropdownDropRef={
                  refs.rightAdvancedFilterDropdownDrop
                }
                searchFilterRef={refs.rightSpaceFilter}
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
                filter={page}
                subcategory={"org"}
                advancedFilterDropdownDropRef={
                  refs.rightAdvancedFilterDropdownDrop
                }
                searchFilterRef={refs.rightSpaceFilter}
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
              htmlFor="rightAuthor"
              className="text-base ml-3 cursor-pointer"
            >
              Author
            </label>
            <div className="h-fit flex items-center justify-center mx-2">
              <input
                type="text"
                placeholder="Author..."
                name="author"
                id="rightAuthor"
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
        </div>
      )}
      <div className="w-full pt-2 pb-3">
        <label
          htmlFor="rightDateRange"
          className="text-base ml-3 cursor-pointer"
        >
          Date Range
        </label>
        <div
          ref={refs.rightDateRangeContainer}
          className="flex items-center justify-center mx-2"
        >
          <div className="grow bg-white rounded-md flex items-center justify-start border border-fg-white-85">
            <input
              type="text"
              placeholder="mm.dd.yyyy"
              name="from"
              id="rightDateRange"
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
            name="dateRange"
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
              filter={page}
              position={position}
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
              updateRangeStyles={updateRangeStyles}
              refs={{
                dateRange: refs.rightDateRange,
                dateRangeCaptionDropdown: refs.rightDateRangeCaptionDropdown,
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
