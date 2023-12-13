import { SET_FILTER_OPTION, TOGGLE_ADVANCED_SEARCH, ADD_ADVANCED_INDIVIDUAL_FILTER, REMOVE_ADVANCED_INDIVIDUAL_FILTER } from './middleFilterTypes';


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

export const addAdvancedIndividualFilter = (advIndFilter) => ({
    type: ADD_ADVANCED_INDIVIDUAL_FILTER,
    payload: { advIndFilter },
});

export const removeAdvancedIndividualFilter = () => {
    return {
        type: REMOVE_ADVANCED_INDIVIDUAL_FILTER,
    };
};