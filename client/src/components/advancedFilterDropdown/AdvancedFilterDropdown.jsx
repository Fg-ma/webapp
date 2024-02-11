import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Axios from "axios";
import config from "@config";
import FilterCard from "./FilterCard";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

const dropIconVar = {
  init: {
    rotateX: 0,
  },
  animate: {
    rotateX: 180,
  },
  transition: {
    duration: 0.75,
    ease: "easeOut",
  },
};

const dropdownVar = {
  init: {
    opacity: 0,
    y: "-1vh",
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.25,
    ease: "easeOut",
    delay: 0.275,
  },
};

export default function AdvancedFilterDropdown({
  filter,
  subcategory,
  advancedFilterDropdownDropRef,
  searchFilterRef,
}) {
  /* 
    Description:   
      Creates the dropdown for adding affiliates filters, by querying a database
      and gets the need values based on the type of dropdown it is(ind, grp, org).
    Unique Properties:
      If the text of a card in the dropdown is overflowing it can be hovered over 
      for a short duration in order to creat a portal that appears over top the 
      original card. The portal expands as necessary to show the full text of a car. 
      The portal functions excatly the same as a regular card except that the background 
      doesn't turn fg-secondary when hovered over. A unique id is generated to set 
      different max widths depending on the instance of the component.
  */

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [placeholder, setPlaceholder] = useState("");
  const [expandedFilter, setExpandedFilter] = useState("");
  const dropdownRef = useRef(null);
  const popupRef = useRef(null);
  const advFilters = useSelector(
    (state) =>
      state.filters[filter].filterPayload.affiliatedFilters[subcategory],
  );
  const uniqueId = useRef(
    `advanced-filter-${Math.random().toString(36).substring(7)}`,
  );

  // Gets the data for the filter cards
  useEffect(() => {
    const fetchFilterCardData = async () => {
      if (subcategory == "ind") {
        const response = await Axios.get(`${serverUrl}/individuals`);
        setData(response.data);
        setPlaceholder("--Individuals--");
        setExpandedFilter("individual");
      } else if (subcategory == "grp") {
        const response = await Axios.get(`${serverUrl}/groups`);
        setData(response.data);
        setPlaceholder("--Groups--");
        setExpandedFilter("group");
      } else if (subcategory == "org") {
        const response = await Axios.get(`${serverUrl}/organizations`);
        setData(response.data);
        setPlaceholder("--Organizations--");
        setExpandedFilter("organization");
      }
    };

    fetchFilterCardData();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const filterCards = data.map((filterInfo) => {
    return (
      <FilterCard
        key={filterInfo[`${expandedFilter}_id`]}
        filter={filter}
        identify={filterInfo[`${expandedFilter}_id`]}
        name={filterInfo[`${expandedFilter}_name`]}
        subcategory={subcategory}
        popupRef={popupRef}
      />
    );
  });

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      (!popupRef.current || !popupRef.current.contains(event.target))
    ) {
      setIsOpen(false);
    }
  };

  // Set up event listeners and set width of dropdown button span
  useEffect(() => {
    const updateMaxWidth = () => {
      const dropdownSpanWidth =
        searchFilterRef.current.getBoundingClientRect().width;

      let maxWidth;
      if (filter === "middle") {
        maxWidth = dropdownSpanWidth - 100;
      } else {
        maxWidth = dropdownSpanWidth - 120;
      }

      document.documentElement.style.setProperty(
        `--max-width-${uniqueId.current}`,
        `${parseInt(maxWidth)}px`,
      );
    };

    window.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", updateMaxWidth);

    updateMaxWidth();

    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", updateMaxWidth);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left w-5/6">
      <button
        onClick={toggleDropdown}
        type="button"
        className="w-full h-8 border border-fg-white-70 bg-white rounded-md inline-flex items-center justify-between"
      >
        <span
          className={`flex-grow overflow-hidden pl-2`}
          style={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: `var(--max-width-${uniqueId.current})`,
          }}
        >
          {advFilters[0] ? advFilters.join(", ") : placeholder}
        </span>
        <span className="w-4 aspect-square mr-1">
          <motion.svg
            className="w-4 aspect-square min-w-full"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            variants={dropIconVar}
            initial="init"
            animate={isOpen ? "animate" : "init"}
            transition="transition"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </span>
      </button>
      <div className="origin-top-right absolute left-1/2 transform -translate-x-1/2 mt-2 z-10">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={advancedFilterDropdownDropRef}
              className="py-1 px-3 bg-white rounded-md shadow-md"
              variants={dropdownVar}
              initial="init"
              animate="animate"
              exit="init"
              transition="transition"
            >
              <div className="overflow-y-scroll overflow-x-visible max-h-80 max-w-xs w-80 h-80">
                {filterCards}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
