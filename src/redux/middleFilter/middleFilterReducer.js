import { SET_FILTER_OPTION, TOGGLE_ADVANCED_SEARCH, ADD_ADVANCED_AFFILIATED_FILTER, REMOVE_ADVANCED_AFFILIATED_FILTER, CLEAR_ADVANCED_AFFILIATED_FILTER } from './middleFilterTypes';

const initialState = {
    filterPayload: {
        isWhatsCurrent: false,
        isAffiliateActivity: false,
        isAllTimeGreats: false,
        isDatePosted: false,
        isPopularity: false,
        isAdvancedSearch: false,
        individualFilters: [],
        affiliatedFilters: {
            ind: [],
            grp: [],
            org: [],
        },
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

        case ADD_ADVANCED_AFFILIATED_FILTER:
            const { addAdvancedAffiliateFilter, addSubcategory } = action.payload;
            return {
                ...state,
                filterPayload: {
                    ...state.filterPayload,
                    affiliatedFilters: {
                        ...state.filterPayload.affiliatedFilters,
                        [addSubcategory]: [...state.filterPayload.affiliatedFilters[addSubcategory], addAdvancedAffiliateFilter],
                    },
                },
            };

        case REMOVE_ADVANCED_AFFILIATED_FILTER:
            const { removeAdvancedAffiliateFilter, removeSubcategory } = action.payload;         
            return {
                ...state,
                filterPayload: {
                    ...state.filterPayload,
                    affiliatedFilters: {
                        ...state.filterPayload.affiliatedFilters,
                        [removeSubcategory]: state.filterPayload.affiliatedFilters[removeSubcategory].filter(filter => filter !== removeAdvancedAffiliateFilter),
                    },
                },
            };
        
        case CLEAR_ADVANCED_AFFILIATED_FILTER:
            const { clearSubcategory } = action.payload;       
            return {
                ...state,
                filterPayload: {
                    ...state.filterPayload,
                    affiliatedFilters: {
                        ...state.filterPayload.affiliatedFilters,
                        [clearSubcategory]: [],
                    },
                },
            };

        default:
          return state;
    }
};