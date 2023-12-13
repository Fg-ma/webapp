import { SET_FILTER_OPTION, TOGGLE_ADVANCED_SEARCH, ADD_ADVANCED_INDIVIDUAL_FILTER, REMOVE_ADVANCED_INDIVIDUAL_FILTER } from './middleFilterTypes';

const initialState = {
    filterPayload: {
        isWhatsCurrent: false,
        isAffiliateActivity: false,
        isAllTimeGreats: false,
        isDatePosted: false,
        isPopularity: false,
        isAdvancedSearch: false,
        individualFilters: [],
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

        case ADD_ADVANCED_INDIVIDUAL_FILTER:
            const { advIndFilter } = action.payload;
            const updatedIndividualFilters = [...state.filterPayload.individualFilters];
            const filterIndex = updatedIndividualFilters.indexOf(advIndFilter);
        
            if (filterIndex === -1) {
                updatedIndividualFilters.push(advIndFilter);
            } else {
                updatedIndividualFilters.splice(filterIndex, 1);
            }
        
            return {
                ...state,
                filterPayload: {
                    ...state.filterPayload,
                    individualFilters: updatedIndividualFilters,
                },
            };

        case REMOVE_ADVANCED_INDIVIDUAL_FILTER:        
            return {
                ...state,
                filterPayload: {
                    ...state.filterPayload,
                    individualFilters: [],
                },
            };
    
        default:
          return state;
    }
};