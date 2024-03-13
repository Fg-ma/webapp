import {
  SET_PAGE_STATE,
  SET_IDS,
  SET_LOGGED_IN,
  SET_CONVERSATION,
  SET_SECONDARY_PAGE_STATE,
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

export const setConversation = (
  conversation_name: string | null,
  members: string[],
  conversation_creation_date: string,
) => ({
  type: SET_CONVERSATION,
  payload: { conversation_name, members, conversation_creation_date },
});
