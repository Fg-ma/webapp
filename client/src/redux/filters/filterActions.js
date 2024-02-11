import {
  TOGGLE_DROP,
  CLOSE_DROP,
  SET_FILTER_OPTION,
  APPLY_FILTER_OPTIONS,
  CLEAR_FILTER_OPTIONS,
  CANCEL_FILTER_CHANGES,
  TOGGLE_ADVANCED_SEARCH,
  ADD_ADVANCED_AFFILIATED_FILTER,
  REMOVE_ADVANCED_AFFILIATED_FILTER,
  CLEAR_ADVANCED_AFFILIATED_FILTER,
  SET_DATE_RANGE,
} from "./filterTypes";

export const toggleDrop = (filter, dropType) => ({
  type: TOGGLE_DROP,
  payload: { filter, dropType },
});

export const closeDrop = (filter, dropType) => ({
  type: CLOSE_DROP,
  payload: { filter, dropType },
});

export const setFilterOption = (filter, option, value) => ({
  type: SET_FILTER_OPTION,
  payload: { filter, option, value },
});

export const applyFilterOptions = (filter, filterOptions) => ({
  type: APPLY_FILTER_OPTIONS,
  payload: { filter, filterOptions },
});

export const clearFilterOptions = (filter) => ({
  type: CLEAR_FILTER_OPTIONS,
  payload: { filter },
});

export const cancelFilterChanges = (filter) => ({
  type: CANCEL_FILTER_CHANGES,
  payload: { filter },
});

export const toggleAdvancedSearch = (filter) => ({
  type: TOGGLE_ADVANCED_SEARCH,
  payload: { filter },
});

export const addAdvancedAffiliateFilter = (
  filter,
  addAdvancedAffiliateFilter,
  addSubcategory,
) => ({
  type: ADD_ADVANCED_AFFILIATED_FILTER,
  payload: { filter, addAdvancedAffiliateFilter, addSubcategory },
});

export const removeAdvancedAffiliateFilter = (
  filter,
  removeAdvancedAffiliateFilter,
  removeSubcategory,
) => ({
  type: REMOVE_ADVANCED_AFFILIATED_FILTER,
  payload: { filter, removeAdvancedAffiliateFilter, removeSubcategory },
});

export const clearAdvancedAffiliateFilter = (filter, clearSubcategory) => ({
  type: CLEAR_ADVANCED_AFFILIATED_FILTER,
  payload: { filter, clearSubcategory },
});

export const setDateRange = (filter, from, to) => ({
  type: SET_DATE_RANGE,
  payload: { filter, from, to },
});
