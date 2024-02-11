import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  toggleDrop,
  setFilterOption,
  applyFilterOptions,
  clearFilterOptions,
  cancelFilterChanges,
} from "@redux/filters/filterActions";
import RightAddAdvancedSearchFilter from "./RightAddAdvancedSearchFilter";
import RightAdvancedSearchFilter from "./RightAdvancedSearchFilter";
import Checkbox from "../../components/checkbox/Checkbox";

const rightSearchFilterVar = {
  init: {
    opacity: 0,
    y: "1vh",
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.25,
    ease: "easeOut",
  },
};

const rightAdvancedSearchFilterVar = {
  init: {
    y: "25%",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  transition: {
    duration: 0.85,
    ease: "easeOut",
  },
};

export default function RightSearchFilter({
  page,
  rightSpaceFilterGeometry,
  refs,
}) {
  /* 
    Description:   
      Creates the right search filter form and sets the state using redux.
    Unique Properties:
      Only applied filters will save.
  */

  const dispatch = useDispatch();
  const filterFormData = useSelector(
    (state) => state.filters[page].filterPayload,
  );
  const [
    rightAdvancedSearchFilterVisible,
    setRightAdvancedSearchFilterVisible,
  ] = useState(false);

  // Used to stop RightAddAdvancedSearchFilter from rendering before RightAdvancedSearchFilter has had a chance to exit
  useEffect(() => {
    if (filterFormData.isAdvancedSearch) {
      setRightAdvancedSearchFilterVisible(filterFormData.isAdvancedSearch);
    }
  }, [filterFormData.isAdvancedSearch]);

  function handleFilterFormChange(event) {
    const { name, type, checked, value } = event.target;
    const inverseOptions = {
      isNewestMessages: "isOldestMessages",
      isOldestMessages: "isNewestMessages",
      isNewestAffiliate: "isOldestAffiliate",
      isOldestAffiliate: "isNewestAffiliate",
    };

    if (inverseOptions[name] && checked) {
      dispatch(setFilterOption(page, name, checked));
      dispatch(setFilterOption(page, inverseOptions[name], false));
    } else {
      dispatch(
        setFilterOption(page, name, type === "checkbox" ? checked : value),
      );
    }
  }

  function handleApplyFilterOptions() {
    dispatch(applyFilterOptions(page, filterFormData));
  }

  function handleClearFilterForm() {
    dispatch(clearFilterOptions(page));
  }

  function handleCancelFilterChanges() {
    dispatch(cancelFilterChanges(page));
  }

  function handleDrop() {
    dispatch(toggleDrop(page, "isDropFilter"));
  }

  const [hovering, setHovering] = useState({
    rightIsWhatsCurrent: false,
    rightIsAffiliateActivity: false,
    rightIsAllTimeGreats: false,
    rightIsDatePosted: false,
    rightIsPopularity: false,
  });

  const handleCheckboxStartHover = (event) => {
    const { id } = event.target;
    setHovering((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const handleCheckboxEndHover = (event) => {
    const { id } = event.target;
    setHovering((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  return createPortal(
    <motion.div
      ref={refs.rightSpaceFilter}
      className="fixed bg-white rounded-md shadow-md"
      style={
        rightSpaceFilterGeometry.position !== null &&
        rightSpaceFilterGeometry.width !== null
          ? {
              bottom: `${rightSpaceFilterGeometry.position.bottom}px`,
              left: `${rightSpaceFilterGeometry.position.left}px`,
              width: `${rightSpaceFilterGeometry.width}px`,
            }
          : null
      }
      variants={rightSearchFilterVar}
      initial="init"
      animate="animate"
      exit="init"
    >
      <form className="flex flex-col h-full m-4">
        <div className="bg-white flex flex-col justify-between">
          <p className="text-2xl leading-6 mb-2">Filter by</p>
          {page !== "messages" ? (
            <div>
              <div className="flex flex-col space-y-2">
                {page === "news" || page === "explore" || page === "papers" ? (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rightIsWhatsCurrentInput"
                      name="isWhatsCurrent"
                      className="hidden"
                      checked={filterFormData.isWhatsCurrent}
                      onChange={handleFilterFormChange}
                    />
                    <motion.label
                      id="rightIsWhatsCurrent"
                      htmlFor="rightIsWhatsCurrentInput"
                      className="relative flex items-center cursor-pointer"
                      onHoverStart={handleCheckboxStartHover}
                      onHoverEnd={handleCheckboxEndHover}
                    >
                      <Checkbox
                        checked={filterFormData.isWhatsCurrent}
                        hovering={hovering.rightIsWhatsCurrent}
                      />
                      <span className="text-base ml-2 font-K2D">
                        What's Current
                      </span>
                    </motion.label>
                  </div>
                ) : null}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rightIsAffiliateActivityInput"
                    name="isAffiliateActivity"
                    className="hidden"
                    checked={filterFormData.isAffiliateActivity}
                    onChange={handleFilterFormChange}
                  />
                  <motion.label
                    id="rightIsAffiliateActivity"
                    htmlFor="rightIsAffiliateActivityInput"
                    className="relative flex items-center cursor-pointer"
                    onHoverStart={handleCheckboxStartHover}
                    onHoverEnd={handleCheckboxEndHover}
                  >
                    <Checkbox
                      checked={filterFormData.isAffiliateActivity}
                      hovering={hovering.rightIsAffiliateActivity}
                    />
                    <span className="text-base ml-2 font-K2D">
                      Affiliate Activity
                    </span>
                  </motion.label>
                </div>
                {page === "news" || page === "explore" || page === "papers" ? (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rightIsAllTimeGreatsInput"
                      name="isAllTimeGreats"
                      className="hidden"
                      checked={filterFormData.isAllTimeGreats}
                      onChange={handleFilterFormChange}
                    />
                    <motion.label
                      id="rightIsAllTimeGreats"
                      htmlFor="rightIsAllTimeGreatsInput"
                      className="relative flex items-center cursor-pointer"
                      onHoverStart={handleCheckboxStartHover}
                      onHoverEnd={handleCheckboxEndHover}
                    >
                      <Checkbox
                        checked={filterFormData.isAllTimeGreats}
                        hovering={hovering.rightIsAllTimeGreats}
                      />
                      <span className="text-base ml-2 font-K2D">
                        All Time Greats
                      </span>
                    </motion.label>
                  </div>
                ) : null}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rightIsDatePostedInput"
                      name="isDatePosted"
                      className="hidden"
                      checked={filterFormData.isDatePosted}
                      onChange={handleFilterFormChange}
                    />
                    <motion.label
                      id="rightIsDatePosted"
                      htmlFor="rightIsDatePostedInput"
                      className="relative flex items-center cursor-pointer"
                      onHoverStart={handleCheckboxStartHover}
                      onHoverEnd={handleCheckboxEndHover}
                    >
                      <Checkbox
                        checked={filterFormData.isDatePosted}
                        hovering={hovering.rightIsDatePosted}
                      />
                      <span className="text-base ml-2 font-K2D">
                        Date Posted
                      </span>
                    </motion.label>
                  </div>
                  {filterFormData.isDatePosted && (
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="datePostedCheckBox"
                        name="isDatePostedSwitched"
                        checked={filterFormData.isDatePostedSwitched}
                        onChange={handleFilterFormChange}
                      />
                      <span className="slider round"></span>
                      <div className="inline w-40">
                        <div className="inline-block w-1/2 text-center">
                          <span className="rightLabelText newest">Newest</span>
                        </div>
                        <div className="inline-block w-1/2 text-center">
                          <span className="rightLabelText oldest">Oldest</span>
                        </div>
                      </div>
                    </label>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rightIsPopularityInput"
                      name="isPopularity"
                      className="hidden"
                      checked={filterFormData.isPopularity}
                      onChange={handleFilterFormChange}
                    />
                    <motion.label
                      id="rightIsPopularity"
                      htmlFor="rightIsPopularityInput"
                      className="relative flex items-center cursor-pointer"
                      onHoverStart={handleCheckboxStartHover}
                      onHoverEnd={handleCheckboxEndHover}
                    >
                      <Checkbox
                        checked={filterFormData.isPopularity}
                        hovering={hovering.rightIsPopularity}
                      />
                      <span className="text-base ml-2 font-K2D">
                        Popularity
                      </span>
                    </motion.label>
                  </div>
                  {filterFormData.isPopularity && (
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="popularityCheckBox"
                        name="isPopularitySwitched"
                        checked={filterFormData.isPopularitySwitched}
                        onChange={handleFilterFormChange}
                      />
                      <span className="slider round"></span>
                      <div className="inline w-40">
                        <div className="inline-block w-1/2 text-center">
                          <span className="rightLabelText upVotes">
                            Up Votes
                          </span>
                        </div>
                        <div className="inline-block w-1/2 text-center">
                          <span className="rightLabelText downVotes">
                            Down Votes
                          </span>
                        </div>
                      </div>
                    </label>
                  )}
                </div>
              </div>
              <div className="flex justify-center items-center mt-3">
                <AnimatePresence
                  onExitComplete={() => {
                    setRightAdvancedSearchFilterVisible(false);
                  }}
                >
                  {filterFormData.isAdvancedSearch && (
                    <motion.div
                      variants={rightAdvancedSearchFilterVar}
                      initial="init"
                      animate="animate"
                      transition="transition"
                      exit="init"
                    >
                      <RightAdvancedSearchFilter
                        page={page}
                        handleFilterFormChange={handleFilterFormChange}
                        refs={{
                          rightSpaceFilter: refs.rightSpaceFilter,
                          rightAdvancedSearchFilter:
                            refs.rightAdvancedSearchFilter,
                          rightDateRange: refs.rightDateRange,
                          rightDateRangeCaptionDropdown:
                            refs.rightDateRangeCaptionDropdown,
                          rightAdvancedFilterDropdownDrop:
                            refs.rightAdvancedFilterDropdownDrop,
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                {!filterFormData.isAdvancedSearch &&
                  !rightAdvancedSearchFilterVisible && (
                    <RightAddAdvancedSearchFilter
                      page={page}
                      rightAddAdvancedSearchFilterRef={
                        refs.rightAddAdvancedSearchFilter
                      }
                    />
                  )}
              </div>
            </div>
          ) : (
            <div className="mt-2">
              <div className="flex flex-col space-y-3 mb-5">
                <div className="flex justify-between">
                  <label className="flex items-center" style={{ width: "35%" }}>
                    <input
                      type="checkbox"
                      name="isIndividuals"
                      checked={filterFormData.isIndividuals}
                      onChange={handleFilterFormChange}
                      className="hidden"
                    />
                    <span
                      className={`w-full font-K2D text-base rounded-md p-1 flex justify-center cursor-pointer
                                                ${
                                                  filterFormData.isIndividuals
                                                    ? "bg-fg-black-25 text-white"
                                                    : "bg-fg-white-95 text-black"
                                                }`}
                    >
                      Individuals
                    </span>
                  </label>
                  <label className="flex items-center" style={{ width: "26%" }}>
                    <input
                      type="checkbox"
                      name="isGroups"
                      checked={filterFormData.isGroups}
                      onChange={handleFilterFormChange}
                      className="hidden"
                    />
                    <span
                      className={`w-full font-K2D text-base rounded-md p-1 flex justify-center cursor-pointer
                                                ${
                                                  filterFormData.isGroups
                                                    ? "bg-fg-black-25 text-white"
                                                    : "bg-fg-white-95 text-black"
                                                }`}
                    >
                      Groups
                    </span>
                  </label>
                  <label className="flex items-center" style={{ width: "35%" }}>
                    <input
                      type="checkbox"
                      name="isOrganizations"
                      checked={filterFormData.isOrganizations}
                      onChange={handleFilterFormChange}
                      className="hidden"
                    />
                    <span
                      className={`w-full font-K2D text-base rounded-md p-1 flex justify-center cursor-pointer
                                                ${
                                                  filterFormData.isOrganizations
                                                    ? "bg-fg-black-25 text-white"
                                                    : "bg-fg-white-95 text-black"
                                                }`}
                    >
                      Organizations
                    </span>
                  </label>
                </div>
                <div className="flex justify-between">
                  <label className="flex items-center" style={{ width: "48%" }}>
                    <input
                      type="checkbox"
                      name="isNewestMessages"
                      checked={filterFormData.isNewestMessages}
                      onChange={handleFilterFormChange}
                      className="hidden"
                    />
                    <span
                      className={`w-full font-K2D text-base rounded-md p-1 flex justify-center cursor-pointer
                                                ${
                                                  filterFormData.isNewestMessages
                                                    ? "bg-fg-black-25 text-white"
                                                    : "bg-fg-white-95 text-black"
                                                }`}
                    >
                      Newest Messages
                    </span>
                  </label>
                  <label className="flex items-center" style={{ width: "48%" }}>
                    <input
                      type="checkbox"
                      name="isOldestMessages"
                      checked={filterFormData.isOldestMessages}
                      onChange={handleFilterFormChange}
                      className="hidden"
                    />
                    <span
                      className={`w-full font-K2D text-base rounded-md p-1 flex justify-center cursor-pointer
                                                ${
                                                  filterFormData.isOldestMessages
                                                    ? "bg-fg-black-25 text-white"
                                                    : "bg-fg-white-95 text-black"
                                                }`}
                    >
                      Oldest Messages
                    </span>
                  </label>
                </div>
                <div className="flex justify-between">
                  <label className="flex items-center" style={{ width: "48%" }}>
                    <input
                      type="checkbox"
                      name="isNewestAffiliate"
                      checked={filterFormData.isNewestAffiliate}
                      onChange={handleFilterFormChange}
                      className="hidden"
                    />
                    <span
                      className={`w-full font-K2D text-base rounded-md p-1 flex justify-center cursor-pointer
                                                ${
                                                  filterFormData.isNewestAffiliate
                                                    ? "bg-fg-black-25 text-white"
                                                    : "bg-fg-white-95 text-black"
                                                }`}
                    >
                      Newest Affiliate
                    </span>
                  </label>
                  <label className="flex items-center" style={{ width: "48%" }}>
                    <input
                      type="checkbox"
                      name="isOldestAffiliate"
                      checked={filterFormData.isOldestAffiliate}
                      onChange={handleFilterFormChange}
                      className="hidden"
                    />
                    <span
                      className={`w-full font-K2D text-base rounded-md p-1 flex justify-center cursor-pointer
                                                ${
                                                  filterFormData.isOldestAffiliate
                                                    ? "bg-fg-black-25 text-white"
                                                    : "bg-fg-white-95 text-black"
                                                }`}
                    >
                      Oldest Affiliate
                    </span>
                  </label>
                </div>
              </div>
              <RightAdvancedSearchFilter
                page={page}
                handleFilterFormChange={handleFilterFormChange}
                refs={{
                  rightAdvancedSearchFilter: refs.rightAdvancedSearchFilter,
                  rightDateRange: refs.rightDateRange,
                  rightDateRangeCaptionDropdown:
                    refs.rightDateRangeCaptionDropdown,
                  rightAdvancedFilterDropdownDrop:
                    refs.rightAdvancedFilterDropdownDrop,
                }}
              />
            </div>
          )}
          <div className="mt-3 flex space-x-3">
            <div
              className="flex justify-center items-center"
              style={{ width: "5.25rem", height: "2.25rem" }}
            >
              <motion.input
                type="button"
                value="Apply"
                className="text-sm font-K2D w-20 h-8 rounded-full bg-fg-primary text-white cursor-pointer"
                onClick={() => {
                  handleApplyFilterOptions();
                  handleDrop();
                }}
                whileHover={{
                  width: "5.25rem",
                  height: "2.25rem",
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div
              className="flex justify-center items-center"
              style={{ width: "5.25rem", height: "2.25rem" }}
            >
              <motion.input
                type="button"
                value="Clear"
                className="text-sm font-K2D w-20 h-8 rounded-full bg-fg-secondary text-white cursor-pointer"
                onClick={handleClearFilterForm}
                whileHover={{
                  width: "5.25rem",
                  height: "2.25rem",
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div
              className="flex justify-center items-center"
              style={{ width: "5.25rem", height: "2.25rem" }}
            >
              <motion.input
                type="button"
                value="Cancel"
                className="text-sm font-K2D w-20 h-8 rounded-full bg-fg-black-25 text-white cursor-pointer"
                onClick={() => {
                  handleCancelFilterChanges();
                  handleDrop();
                }}
                whileHover={{
                  width: "5.25rem",
                  height: "2.25rem",
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </div>
      </form>
    </motion.div>,
    document.body,
  );
}
