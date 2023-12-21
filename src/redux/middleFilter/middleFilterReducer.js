import { SET_MIDDLE_SPACE_CONTAINER_WIDTH, TOGGLE_DROP, SET_FILTER_OPTION, APPLY_FILTER_OPTIONS, CLEAR_FILTER_OPTIONS, CANCEL_FILTER_CHANGES, TOGGLE_ADVANCED_SEARCH, ADD_ADVANCED_AFFILIATED_FILTER, REMOVE_ADVANCED_AFFILIATED_FILTER, CLEAR_ADVANCED_AFFILIATED_FILTER } from './middleFilterTypes';

const initialState = {
    middleSpaceContainerWidth: 0,
    isDrop: false,
    isDropFilter: false,
    filterPayload: {
        isWhatsCurrent: false,
        isAffiliateActivity: false,
        isAllTimeGreats: false,
        isDatePosted: false,
        isDatePostedSwitched: false,
        isPopularity: false,
        isPopularitySwitched: false,
        isAdvancedSearch: false,
        affiliatedFilters: {
            ind: [],
            grp: [],
            org: [],
        },
        author: '',
        dateRange: '',
    },
    appliedFilterOptions: null,
};

export default function middleFilterReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MIDDLE_SPACE_CONTAINER_WIDTH:
            return {
                ...state,
                middleSpaceContainerWidth: action.payload.width,
            }

        case TOGGLE_DROP:
            const { dropType } = action.payload;
            return {
                ...state,
                [dropType]: !state[dropType],
            };

        case SET_FILTER_OPTION:
            return {
                ...state,
                filterPayload: {
                    ...state.filterPayload,
                    [action.payload.option]: action.payload.value,
                },
            };

        case APPLY_FILTER_OPTIONS:
            return {
                ...state,
                appliedFilterOptions: action.payload.filterOptions,
            };

        case CLEAR_FILTER_OPTIONS:
            return {
                ...state,
                filterPayload: {
                    ...initialState.filterPayload,
                },
            };

        case CANCEL_FILTER_CHANGES:
            return {
                ...state,
                filterPayload: state.appliedFilterOptions || initialState.filterPayload,
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