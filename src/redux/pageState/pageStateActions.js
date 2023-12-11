import { LEFT_NAV, RIGHT_NAV } from "./pageStateTypes"

export const setLeftNav = (state) => {
    return {
        type: LEFT_NAV,
        leftPagePayload: {
            leftPageState: state,
        },
    }
}

export const setRightNav = (state) => {
    return {
        type: RIGHT_NAV,
        rightPagePayload: {
            rightPageState: state,
        },
    }
}