import { SET_MIDDLE_SPACE_CONTAINER_WIDTH, TOGGLE_DROP, SET_FILTER_OPTION, APPLY_FILTER_OPTIONS, CLEAR_FILTER_OPTIONS, CANCEL_FILTER_CHANGES, TOGGLE_ADVANCED_SEARCH, ADD_ADVANCED_AFFILIATED_FILTER, REMOVE_ADVANCED_AFFILIATED_FILTER, CLEAR_ADVANCED_AFFILIATED_FILTER } from './rightFilterTypes';

export const setMiddleSpaceContainerWidth = (width) => ({
    type: SET_MIDDLE_SPACE_CONTAINER_WIDTH,
    payload: { width }
});

export const toggleDrop = (dropType) => ({
    type: TOGGLE_DROP,
    payload: { dropType },
});

export const setFilterOption = (option, value) => ({
    type: SET_FILTER_OPTION,
    payload: { option, value },
});

export const applyFilterOptions = (filterOptions) => ({
    type: APPLY_FILTER_OPTIONS,
    payload: { filterOptions },
});

export const clearFilterOptions = () => ({
    type: CLEAR_FILTER_OPTIONS,
});

export const cancelFilterChanges = () => ({
    type: CANCEL_FILTER_CHANGES,
});

export const toggleAdvancedSearch = () => ({
    type: TOGGLE_ADVANCED_SEARCH,
});

export const addAdvancedAffiliateFilter = (addAdvancedAffiliateFilter, addSubcategory) => ({
    type: ADD_ADVANCED_AFFILIATED_FILTER,
    payload: { addAdvancedAffiliateFilter, addSubcategory },
});

export const removeAdvancedAffiliateFilter = (removeAdvancedAffiliateFilter, removeSubcategory) => ({
    type: REMOVE_ADVANCED_AFFILIATED_FILTER,
    payload: { removeAdvancedAffiliateFilter, removeSubcategory },
});

export const clearAdvancedAffiliateFilter = ( clearSubcategory ) => ({
    type: CLEAR_ADVANCED_AFFILIATED_FILTER,
    payload: { clearSubcategory },
});