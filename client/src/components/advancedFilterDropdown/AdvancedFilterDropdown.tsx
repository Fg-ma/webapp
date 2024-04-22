import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import config from "@config";
import FilterCard from "./FilterCard";
import {
  AdvancedFilterDropdownProps,
  FilterState,
} from "@FgTypes/componentTypes";
import { Group, Individual, Organization } from "@FgTypes/leftTypes";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

const dropIconVar: Variants = {
  init: {
    rotateX: 0,
  },
  animate: {
    rotateX: 180,
  },
};

const dropIconTransition: Transition = {
  transition: {
    duration: 0.75,
    ease: "easeOut",
  },
};

const dropdownVar: Variants = {
  init: {
    opacity: 0,
    y: "-1vh",
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const dropdownTransition: Transition = {
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
}: AdvancedFilterDropdownProps) {
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
  const [data, setData] = useState<(Individual | Group | Organization)[]>([]);
  const [placeholder, setPlaceholder] = useState("");
  const [expandedFilter, setExpandedFilter] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const advFilters = useSelector(
    (state: FilterState) =>
      state.filters[filter].filterPayload.affiliatedFilters[subcategory],
  );
  const uniqueId = useRef(
    `advanced-filter-${Math.random().toString(36).substring(7)}`,
  );

  const sortData = (data: (Individual | Group | Organization)[]) => {
    const parseDate = (dateString: string | null) =>
      dateString
        ? new Date(dateString).getTime()
        : new Date("2000-01-01T01:01:01.000Z").getTime();

    data.sort(
      (a, b) =>
        parseDate(b.affiliate_relation_date) -
        parseDate(a.affiliate_relation_date),
    );

    return [...data];
  };

  // Gets the data for the filter cards
  useEffect(() => {
    const fetchFilterCardData = async () => {
      if (subcategory == "ind") {
        const response = await Axios.get(
          `${serverUrl}/affiliateRelations/get_affiliated_individuals`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setData(sortData(response.data));
        setPlaceholder("--Individuals--");
        setExpandedFilter("individual");
      } else if (subcategory == "grp") {
        const response = await Axios.get(
          `${serverUrl}/affiliateRelations/get_affiliated_groups`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setData(sortData(response.data));
        setPlaceholder("--Groups--");
        setExpandedFilter("group");
      } else if (subcategory == "org") {
        const response = await Axios.get(
          `${serverUrl}/affiliateRelations/get_affiliated_organizations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setData(sortData(response.data));
        setPlaceholder("--Organizations--");
        setExpandedFilter("organization");
      }
    };

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in local storage");
      return;
    }

    fetchFilterCardData();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const filterCards = data.map((filterInfo) => {
    return (
      <FilterCard
        key={
          subcategory === "ind"
            ? (filterInfo[
                "individual_username" as keyof (
                  | Individual
                  | Group
                  | Organization
                )
              ] as string)
            : subcategory === "grp"
              ? (filterInfo[
                  "group_handle" as keyof (Individual | Group | Organization)
                ] as string)
              : (filterInfo[
                  "organization_handle" as keyof (
                    | Individual
                    | Group
                    | Organization
                  )
                ] as string)
        }
        entity_username={
          subcategory === "ind"
            ? (filterInfo[
                "individual_username" as keyof (
                  | Individual
                  | Group
                  | Organization
                )
              ] as string)
            : subcategory === "grp"
              ? (filterInfo[
                  "group_handle" as keyof (Individual | Group | Organization)
                ] as string)
              : (filterInfo[
                  "organization_handle" as keyof (
                    | Individual
                    | Group
                    | Organization
                  )
                ] as string)
        }
        filter={filter}
        entity_name={
          (filterInfo[
            `${expandedFilter}_name` as keyof (
              | Individual
              | Group
              | Organization
            )
          ] as string)
            ? (filterInfo[
                `${expandedFilter}_name` as keyof (
                  | Individual
                  | Group
                  | Organization
                )
              ] as string)
            : subcategory === "ind"
              ? (filterInfo[
                  "individual_username" as keyof (
                    | Individual
                    | Group
                    | Organization
                  )
                ] as string)
              : subcategory === "grp"
                ? (filterInfo[
                    "group_handle" as keyof (Individual | Group | Organization)
                  ] as string)
                : (filterInfo[
                    "organization_handle" as keyof (
                      | Individual
                      | Group
                      | Organization
                    )
                  ] as string)
        }
        subcategory={subcategory}
        popupRef={popupRef}
      />
    );
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      (!popupRef.current || !popupRef.current.contains(event.target as Node))
    ) {
      setIsOpen(false);
    }
  };

  // Set up event listeners and set width of dropdown button span
  useEffect(() => {
    const updateMaxWidth = () => {
      const dropdownSpanWidth =
        searchFilterRef.current?.getBoundingClientRect().width;

      if (!dropdownSpanWidth) {
        return;
      }

      let maxWidth: number;
      if (filter === "middle") {
        maxWidth = dropdownSpanWidth - 100;
      } else {
        maxWidth = dropdownSpanWidth - 120;
      }

      document.documentElement.style.setProperty(
        `--max-width-${uniqueId.current}`,
        `${maxWidth}px`,
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
          className={`flex-grow overflow-hidden pl-2 select-none`}
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
            transition={dropIconTransition}
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
              className="bg-white rounded-md shadow-md max-h-80 max-w-xs w-80 h-max flex flex-col overflow-hidden"
              variants={dropdownVar}
              initial="init"
              animate="animate"
              exit="init"
              transition={dropdownTransition}
            >
              <div
                className="h-1 bg-white mx-7 z-10 mb-2 w-full"
                style={{
                  boxShadow: "0 2px 6px 8px rgba(255, 255, 255, 1)",
                }}
              ></div>
              <div
                className="pl-7 overflow-y-auto grow smallScrollbar flex flex-col w-full"
                style={{ scrollbarGutter: "stable" }}
              >
                {filterCards}
              </div>
              <div
                className="h-1 bg-white mx-7 mt-2 w-full"
                style={{
                  boxShadow: "0 -2px 6px 8px rgba(255, 255, 255, 1)",
                }}
              ></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
