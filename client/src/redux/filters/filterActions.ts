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

export const toggleDrop = (filter: string, dropType: string) => ({
  type: TOGGLE_DROP,
  payload: { filter, dropType },
});

export const closeDrop = (filter: string, dropType: string) => ({
  type: CLOSE_DROP,
  payload: { filter, dropType },
});

export const setFilterOption = (
  filter: string,
  option: string,
  value: boolean | string,
) => ({
  type: SET_FILTER_OPTION,
  payload: { filter, option, value },
});

export const applyFilterOptions = (filter: string, filterOptions: any) => ({
  type: APPLY_FILTER_OPTIONS,
  payload: { filter, filterOptions },
});

export const clearFilterOptions = (filter: string) => ({
  type: CLEAR_FILTER_OPTIONS,
  payload: { filter },
});

export const cancelFilterChanges = (filter: string) => ({
  type: CANCEL_FILTER_CHANGES,
  payload: { filter },
});

export const toggleAdvancedSearch = (filter: string) => ({
  type: TOGGLE_ADVANCED_SEARCH,
  payload: { filter },
});

export const addAdvancedAffiliateFilter = (
  filter: string,
  addAdvancedAffiliateFilter: string,
  addSubcategory: string,
) => ({
  type: ADD_ADVANCED_AFFILIATED_FILTER,
  payload: { filter, addAdvancedAffiliateFilter, addSubcategory },
});

export const removeAdvancedAffiliateFilter = (
  filter: string,
  removeAdvancedAffiliateFilter: string,
  removeSubcategory: string,
) => ({
  type: REMOVE_ADVANCED_AFFILIATED_FILTER,
  payload: { filter, removeAdvancedAffiliateFilter, removeSubcategory },
});

export const clearAdvancedAffiliateFilter = (
  filter: string,
  clearSubcategory: string,
) => ({
  type: CLEAR_ADVANCED_AFFILIATED_FILTER,
  payload: { filter, clearSubcategory },
});

export const setDateRange = (filter: string, from: string, to: string) => ({
  type: SET_DATE_RANGE,
  payload: { filter, from, to },
});
