import { SET_PAGE_STATE, SET_IDS } from "./pageStateTypes"

export const setPageState = (page, newState) => ({
    type: SET_PAGE_STATE,
    payload: { page, newState },
});

export const setIds = (page, id, value) => ({
    type: SET_IDS,
    payload: { page, id, value },
});
