import { SET_PAGE_STATE, SET_IDS, SET_LOGGED_IN } from "./pageStateTypes";

export const setPageState = (page: string, newState: string) => ({
  type: SET_PAGE_STATE,
  payload: { page, newState },
});

export const setIds = (page: string, id: string, value: string | null) => ({
  type: SET_IDS,
  payload: { page, id, value },
});

export const setLoggedIn = (isLoggedIn: boolean) => ({
  type: SET_LOGGED_IN,
  payload: { isLoggedIn },
});
