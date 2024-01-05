import { SET_PAGE_STATE, SET_IDS } from "./pageStateTypes";

const intialState = {
    main: {
        pagePayload: {
            pageState: "home",
            ids: {
                individual_id: null,
                group_id: null,
                organization_id: null,
            },
        },
    },
    left: {
        pagePayload: {
            pageState: "individuals",
        },
    },
    right: {
        pagePayload: {
            pageState: "news",
        },
    },
    individuals: {
        pagePayload: {
            pageState: "articles",
            ids: {
                collection_id: null,
            },
        },
    },
}

export default function pageStateReducer(state = intialState, action) {
    switch (action.type) {
        case SET_PAGE_STATE: {
            const { page, newState } = action.payload;
            return {
                ...state,
                [page]: {
                    ...state[page],
                    pagePayload: {
                        ...state[page].pagePayload,
                        pageState: newState,
                    },
                },
            };
        }

        case SET_IDS: {
            const { page, id, value} = action.payload;
            return {
                ...state,
                [page]: {
                    ...state[page],
                    pagePayload: {
                        ...state[page].pagePayload,
                        ids: {
                            ...intialState[page].pagePayload.ids,
                            [id]: value,
                        },
                    },
                },
            };
        }

        default:
            return state;
    };
};