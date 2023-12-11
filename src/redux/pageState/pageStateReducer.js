import { LEFT_NAV, RIGHT_NAV } from "./pageStateTypes";

const intialState = { 
    leftPagePayload: {
        leftPageState: "individuals",
    },
    rightPagePayload: {
        rightPageState: "news"
    }
}

export default function pageStateReducer(state = intialState, action) {
    switch (action.type) {
        case LEFT_NAV:
            return {
                ...state,
                leftPagePayload: {
                    leftPageState: action.leftPagePayload.leftPageState,
                }
            };
        case RIGHT_NAV:
            return {
                ...state,
                rightPagePayload: {
                    rightPageState: action.rightPagePayload.rightPageState,
                }
            };
        default:
            return state;
    }
}