import { SET_FILTER_OPTION, TOGGLE_ADVANCED_SEARCH } from './middleFilterTypes';

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