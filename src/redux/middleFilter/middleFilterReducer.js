import { SET_FILTER_OPTION, TOGGLE_ADVANCED_SEARCH, ADD_ADVANCED_INDIVIDUAL_FILTER, REMOVE_ADVANCED_INDIVIDUAL_FILTER, CLEAR_ADVANCED_INDIVIDUAL_FILTER, ADD_ADVANCED_GROUP_FILTER, REMOVE_ADVANCED_GROUP_FILTER, CLEAR_ADVANCED_GROUP_FILTER } from './middleFilterTypes';

const initialState = {
    filterPayload: {
        isWhatsCurrent: false,
        isAffiliateActivity: false,
        isAllTimeGreats: false,
        isDatePosted: false,
        isPopularity: false,
        isAdvancedSearch: false,
        individualFilters: [],
        groupFilters: [],
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
            const indFilterIndex = updatedIndividualFilters.indexOf(advIndFilter);
        
            if (indFilterIndex === -1) {
                updatedIndividualFilters.push(advIndFilter);
            } else {
                updatedIndividualFilters.splice(indFilterIndex, 1);
            }
        
            return {
                ...state,
                filterPayload: {
                    ...state.filterPayload,
                    individualFilters: updatedIndividualFilters,
                },
            };

        case REMOVE_ADVANCED_INDIVIDUAL_FILTER:
            const removeAdvIndFilter = action.payload.advIndFilter;
            const removeUpdatedIndividualFilters = [...state.filterPayload.individualFilters];
            const newRemoveUpdatedIndividualFilters = removeUpdatedIndividualFilters.filter(
                filter => filter !== removeAdvIndFilter
            );
            
            return {
                ...state,
                filterPayload: {
                    ...state.filterPayload,
                    groupFilters: newRemoveUpdatedIndividualFilters,
                },
            };

        case CLEAR_ADVANCED_INDIVIDUAL_FILTER:        
            return {
                ...state,
                filterPayload: {
                    ...state.filterPayload,
                    individualFilters: [],
                },
            };

        case ADD_ADVANCED_GROUP_FILTER:
            const { advGrpFilter } = action.payload;
            const updatedGroupFilters = [...state.filterPayload.groupFilters];
            const grpFilterIndex = updatedGroupFilters.indexOf(advGrpFilter);
        
            if (grpFilterIndex === -1) {
                updatedGroupFilters.push(advGrpFilter);
            } else {
                updatedGroupFilters.splice(advGrpFilter, 1);
            }
        
            return {
                ...state,
                filterPayload: {
                    ...state.filterPayload,
                    groupFilters: updatedGroupFilters,
                },
            };

        case REMOVE_ADVANCED_GROUP_FILTER:
            const removeAdvGrpFilter = action.payload.advGrpFilter;
            const removeUpdatedGroupFilters = [...state.filterPayload.groupFilters];
            const newRemoveUpdatedGroupFilters = removeUpdatedGroupFilters.filter(
                filter => filter !== removeAdvGrpFilter
            );
            
            return {
                ...state,
                filterPayload: {
                    ...state.filterPayload,
                    groupFilters: newRemoveUpdatedGroupFilters,
                },
            };
        
        case CLEAR_ADVANCED_GROUP_FILTER:        
            return {
                ...state,
                filterPayload: {
                    ...state.filterPayload,
                    groupFilters: [],
                },
            };

        default:
          return state;
    }
};