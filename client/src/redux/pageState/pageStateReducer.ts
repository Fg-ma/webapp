import { SET_PAGE_STATE, SET_IDS, SET_LOGGED_IN } from "./pageStateTypes";

interface State {
  [key: string]: {
    pagePayload: {
      pageState: string;
      isLoggedIn?: boolean;
      ids?: {
        individual_id?: number | null;
        group_id?: number | null;
        organization_id?: number | null;
        paper_id?: number | null;
        sheet_id?: number | null;
        video_id?: number | null;
        image_id?: number | null;
        collection_id?: number | null;
      };
    };
  };
}

type Action =
  | { type: typeof SET_PAGE_STATE; payload: { page: string; newState: string } }
  | {
      type: typeof SET_IDS;
      payload: { page: string; id: string; value: string | null };
    }
  | { type: typeof SET_LOGGED_IN; payload: { isLoggedIn: boolean } };

const initialState: State = {
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
  action: Action,
): State {
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
