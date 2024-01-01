import { SET_PAGE_STATE } from "./pageStateTypes"

export const setPageState = (page, newState) => ({
    type: SET_PAGE_STATE,
    payload: { page, newState },
});
