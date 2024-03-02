import { SET_PAGE_STATE, SET_IDS, SET_LOGGED_IN } from "./pageStateTypes";
import { PageState, PageStateAction } from "@FgTypes/reduxTypes";

const initialState: PageState = {
  login: {
    pagePayload: {
      pageState: "login",
      isLoggedIn: false,
    },
  },
  main: {
    pagePayload: {
      pageState: "home",
      ids: {
        individual_id: null,
        group_id: null,
        organization_id: null,
        paper_id: null,
        sheet_id: null,
        video_id: null,
        image_id: null,
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
      pageState: "papers",
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
  groups: {
    pagePayload: {
      pageState: "articles",
      ids: {
        collection_id: null,
      },
    },
  },
  organizations: {
    pagePayload: {
      pageState: "articles",
      ids: {
        collection_id: null,
      },
    },
  },
};

export default function pageStateReducer(
  state = initialState,
  action: PageStateAction,
): PageState {
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
      const { page, id, value } = action.payload;

      return {
        ...state,
        [page]: {
          ...state[page],
          pagePayload: {
            ...state[page].pagePayload,
            ids: {
              ...initialState[page].pagePayload.ids,
              [id]: value,
            },
          },
        },
      };
    }

    case SET_LOGGED_IN: {
      const { isLoggedIn } = action.payload;

      return {
        ...state,
        login: {
          ...state.login,
          pagePayload: {
            ...state.login.pagePayload,
            isLoggedIn: isLoggedIn,
          },
        },
      };
    }

    default:
      return state;
  }
}
