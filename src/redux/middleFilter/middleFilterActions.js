import { SET_FILTER_OPTION, TOGGLE_ADVANCED_SEARCH, ADD_ADVANCED_AFFILIATED_FILTER, REMOVE_ADVANCED_AFFILIATED_FILTER, CLEAR_ADVANCED_AFFILIATED_FILTER } from './middleFilterTypes';


export const setFilterOption = (option, value) => {
    return {
        type: SET_FILTER_OPTION,
        payload: { option, value },
    };
};

export const toggleAdvancedSearch = () => {
    return {
        type: TOGGLE_ADVANCED_SEARCH,
    };
};

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