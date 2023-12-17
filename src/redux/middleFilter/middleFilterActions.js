import { SET_FILTER_OPTION, TOGGLE_ADVANCED_SEARCH, ADD_ADVANCED_INDIVIDUAL_FILTER, REMOVE_ADVANCED_INDIVIDUAL_FILTER, CLEAR_ADVANCED_INDIVIDUAL_FILTER, ADD_ADVANCED_GROUP_FILTER, REMOVE_ADVANCED_GROUP_FILTER, CLEAR_ADVANCED_GROUP_FILTER } from './middleFilterTypes';


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

export const removeAdvancedIndividualFilter = (advIndFilter) => ({
    type: REMOVE_ADVANCED_INDIVIDUAL_FILTER,
    payload: { advIndFilter },
});

export const clearAdvancedIndividualFilter = () => {
    return {
        type: CLEAR_ADVANCED_INDIVIDUAL_FILTER,
    };
};

export const addAdvancedGroupFilter = (advGrpFilter) => ({
    type: ADD_ADVANCED_GROUP_FILTER,
    payload: { advGrpFilter },
});

export const removeAdvancedGroupFilter = (advGrpFilter) => ({
    type: REMOVE_ADVANCED_GROUP_FILTER,
    payload: { advGrpFilter },
});

export const clearAdvancedGroupFilter = () => ({
        type: CLEAR_ADVANCED_GROUP_FILTER,
});