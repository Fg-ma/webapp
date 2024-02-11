import { SET_PAGE_STATE, SET_IDS, SET_LOGGED_IN } from "./pageStateTypes";

export const setPageState = (page, newState) => ({
  type: SET_PAGE_STATE,
  payload: { page, newState },
});

export const setIds = (page, id, value) => ({
  type: SET_IDS,
  payload: { page, id, value },
});

export const setLoggedIn = (isLoggedIn) => ({
  type: SET_LOGGED_IN,
  payload: { isLoggedIn },
});
