import { SET_PAGE_STATE } from "./pageStateTypes";

const intialState = {
    main: {
        pagePayload: {
            pageState: "home",
        },
    },
    middle: {
        pagePayload: {
            pageState: "home",
        },
    },
    left: {
        pagePayload: {
            pageState: "individuals",
        },
    },
    right: {
        pagePayload: {
            pageState: "news"
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
        default:
            return state;
    }
}