import { TOGGLE_DROP, SET_FILTER_OPTION, APPLY_FILTER_OPTIONS, CLEAR_FILTER_OPTIONS, CANCEL_FILTER_CHANGES, TOGGLE_ADVANCED_SEARCH, ADD_ADVANCED_AFFILIATED_FILTER, REMOVE_ADVANCED_AFFILIATED_FILTER, CLEAR_ADVANCED_AFFILIATED_FILTER } from './filterTypes';

const initialState = {
    middle: {
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
    },
    news: {
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
    },
    explore: {
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
    },
    messages: {
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
    },
    dogEars: {
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
    },
};

export default function filterReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_DROP: {
            const { filter, dropType } = action.payload;
            return {
                ...state,
                [action.payload.filter]: {
                    ...state[filter],
                    [dropType]: !state[filter][dropType],
                },
            };
        }

        case SET_FILTER_OPTION: {
            const { filter, option, value } = action.payload;
            return {
                ...state,
                [filter]: {
                    ...state[filter],
                    filterPayload: {
                        ...state[filter].filterPayload,
                        [option]: value,
                    },
                },
            };
        }

        case APPLY_FILTER_OPTIONS: {
            const { filter, filterOptions } = action.payload;
            return {
                ...state,
                [filter]: {
                    ...state[filter],
                    appliedFilterOptions: filterOptions,
                },
            };
        }

        case CLEAR_FILTER_OPTIONS: {
            const { filter } = action.payload;
            return {
                ...state,
                [filter]: {
                    ...state[filter],
                    filterPayload: {
                        ...initialState[filter].filterPayload,
                    },
                },
            };
        }

        case CANCEL_FILTER_CHANGES: {
            const { filter } = action.payload;
            return {
                ...state,
                [filter]: {
                    ...state[filter],
                    filterPayload: state[filter].appliedFilterOptions || initialState[filter].filterPayload,
                },
            };
        }

        case TOGGLE_ADVANCED_SEARCH: {
            const { filter } = action.payload;
            return {
                ...state,
                [filter]: {
                    ...state[filter],
                    filterPayload: {
                        ...state[filter].filterPayload,
                        isAdvancedSearch: !state[filter].filterPayload.isAdvancedSearch,
                    },
                },
            };
        }

        case ADD_ADVANCED_AFFILIATED_FILTER: {
            const { filter, addAdvancedAffiliateFilter, addSubcategory } = action.payload;
            return {
                ...state,
                [filter]: {
                    ...state[filter],
                    filterPayload: {
                        ...state[filter].filterPayload,
                        affiliatedFilters: {
                            ...state[filter].filterPayload.affiliatedFilters,
                            [addSubcategory]: [...state[filter].filterPayload.affiliatedFilters[addSubcategory], addAdvancedAffiliateFilter],
                        },
                    },
                },
            };
        }

        case REMOVE_ADVANCED_AFFILIATED_FILTER: {
            const { filter, removeAdvancedAffiliateFilter, removeSubcategory } = action.payload;         
            return {
                ...state,
                [filter]: {
                    ...state[filter],
                    filterPayload: {
                        ...state[filter].filterPayload,
                        affiliatedFilters: {
                            ...state[filter].filterPayload.affiliatedFilters,
                            [removeSubcategory]: state[filter].filterPayload.affiliatedFilters[removeSubcategory].filter(filter => filter !== removeAdvancedAffiliateFilter),
                        },
                    },
                },
            };
        }

        case CLEAR_ADVANCED_AFFILIATED_FILTER: {
            const { filter, clearSubcategory } = action.payload;       
            return {
                ...state,
                [filter]: {
                    ...state[filter],
                    filterPayload: {
                        ...state[filter].filterPayload,
                        affiliatedFilters: {
                            ...state[filter].filterPayload.affiliatedFilters,
                            [clearSubcategory]: [],
                        },
                    },
                },
            };
        }

        default:
          return state;
    }
};