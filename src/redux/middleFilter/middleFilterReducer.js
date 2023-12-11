import { SET_FILTER_OPTION, TOGGLE_ADVANCED_SEARCH } from './middleFilterTypes';

const initialState = {
    filterPayload: {
        isWhatsCurrent: false,
        isAffiliateActivity: false,
        isAllTimeGreats: false,
        isDatePosted: false,
        isPopularity: false,
        isAdvancedSearch: false,
    },
};

export default function middleFilterReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FILTER_OPTION:
            return {
                ...state,
                filterPayload: {
                    ...state.filterPayload,
                    [action.payload.option]: action.payload.value,
                },
          };
        
        case TOGGLE_ADVANCED_SEARCH:
            return {
                ...state,
                filterPayload: {
                    ...state.filterPayload,
                    isAdvancedSearch: !state.filterPayload.isAdvancedSearch,
                },
            };
        
        default:
          return state;
    }
};