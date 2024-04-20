import {
  SET_PAGE_STATE,
  SET_IDS,
  SET_LOGGED_IN,
  SET_CONVERSATION,
  SET_TABLE,
  SET_SECONDARY_PAGE_STATE,
  SET_USERNAME,
} from "./pageStateTypes";

export const setPageState = (page: string, newState: string) => ({
  type: SET_PAGE_STATE,
  payload: { page, newState },
});

export const setSecondaryPageState = (
  page: string,
  newState: string | null,
) => ({
  type: SET_SECONDARY_PAGE_STATE,
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

export const setUsernameState = (username: string) => ({
  type: SET_USERNAME,
  payload: { username },
});

export const setConversation = (
  conversation_name: string | null,
  members: string[],
  conversation_creation_date: string,
) => ({
  type: SET_CONVERSATION,
  payload: { conversation_name, members, conversation_creation_date },
});

export const setTable = (
  table_name: string | null,
  members: string[],
  table_creation_date: string,
) => ({
  type: SET_TABLE,
  payload: { table_name, members, table_creation_date },
});
