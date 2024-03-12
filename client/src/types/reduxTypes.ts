import {
  TOGGLE_DROP,
  CLOSE_DROP,
  SET_FILTER_OPTION,
  APPLY_FILTER_OPTIONS,
  CLEAR_FILTER_OPTIONS,
  CANCEL_FILTER_CHANGES,
  TOGGLE_ADVANCED_SEARCH,
  ADD_ADVANCED_AFFILIATED_FILTER,
  REMOVE_ADVANCED_AFFILIATED_FILTER,
  CLEAR_ADVANCED_AFFILIATED_FILTER,
  SET_DATE_RANGE,
} from "../redux/filters/filterTypes";
import {
  SET_PAGE_STATE,
  SET_IDS,
  SET_LOGGED_IN,
  SET_CONVERSATION,
} from "@redux/pageState/pageStateTypes";

// Global

/*
  filterReducer.ts
*/

export interface FilterPayload {
  isWhatsCurrent?: boolean;
  isAffiliateActivity?: boolean;
  isAllTimeGreats?: boolean;
  isDatePosted?: boolean;
  isDatePostedSwitched?: boolean;
  isPopularity?: boolean;
  isPopularitySwitched?: boolean;
  isAdvancedSearch?: boolean;
  isIndividuals?: boolean;
  isGroups?: boolean;
  isOrganizations?: boolean;
  isNewestMessages?: boolean;
  isOldestMessages?: boolean;
  isNewestAffiliate?: boolean;
  isOldestAffiliate?: boolean;
  affiliatedFilters?: {
    [key: string]: string[];
    ind: string[];
    grp: string[];
    org: string[];
  };
  author?: string;
  dateRange: {
    from: string;
    to: string;
  };
}

export interface FilterState {
  [key: string]: {
    [key: string]: boolean | FilterPayload | any;
    isDrop?: boolean;
    isDropFilter: boolean;
    filterPayload: FilterPayload;
    appliedFilterOptions: any;
  };
}

export type FilterAction =
  | { type: typeof TOGGLE_DROP; payload: { filter: string; dropType: string } }
  | { type: typeof CLOSE_DROP; payload: { filter: string; dropType: string } }
  | {
      type: typeof SET_FILTER_OPTION;
      payload: { filter: string; option: string; value: boolean };
    }
  | {
      type: typeof APPLY_FILTER_OPTIONS;
      payload: { filter: string; filterOptions: FilterState };
    }
  | { type: typeof CLEAR_FILTER_OPTIONS; payload: { filter: string } }
  | { type: typeof CANCEL_FILTER_CHANGES; payload: { filter: string } }
  | { type: typeof TOGGLE_ADVANCED_SEARCH; payload: { filter: string } }
  | {
      type: typeof ADD_ADVANCED_AFFILIATED_FILTER;
      payload: {
        filter: string;
        addAdvancedAffiliateFilter: string;
        addSubcategory: string;
      };
    }
  | {
      type: typeof REMOVE_ADVANCED_AFFILIATED_FILTER;
      payload: {
        filter: string;
        removeAdvancedAffiliateFilter: string;
        removeSubcategory: string;
      };
    }
  | {
      type: typeof CLEAR_ADVANCED_AFFILIATED_FILTER;
      payload: { filter: string; clearSubcategory: string };
    }
  | {
      type: typeof SET_DATE_RANGE;
      payload: { filter: string; from: string; to: string };
    };

/*
  pageStateReducer.ts
*/

export interface PageState {
  [key: string]: {
    pagePayload: {
      pageState: string;
      isLoggedIn?: boolean;
      ids?: {
        individual_id?: string | null;
        group_id?: string | null;
        organization_id?: string | null;
        paper_id?: string | null;
        sheet_id?: string | null;
        video_id?: string | null;
        image_id?: string | null;
        collection_id?: string | null;
        conversation_id?: string | null;
      };
      conversation?: {
        conversation_name: string | null;
        members: string[] | null;
        conversation_creation_date: string | null;
      };
    };
  };
}

export type PageStateAction =
  | { type: typeof SET_PAGE_STATE; payload: { page: string; newState: string } }
  | {
      type: typeof SET_IDS;
      payload: { page: string; id: string; value: string | null };
    }
  | { type: typeof SET_LOGGED_IN; payload: { isLoggedIn: boolean } }
  | {
      type: typeof SET_CONVERSATION;
      payload: {
        conversation_name: string;
        members: string[];
        conversation_creation_date: string;
      };
    };
