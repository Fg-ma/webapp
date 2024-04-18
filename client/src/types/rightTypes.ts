import { ChangeEvent } from "react";

// Global
export interface RightState {
  page: {
    right: {
      pagePayload: {
        pageState: string;
      };
    };
  };
}

export interface Sheet {
  sheet_id: string;
  sheet_data_id: string;
  sheet_author_id: string;
  sheet_filename: string;
  sheet_title: string;
  sheet_subject: string;
}

export interface RightFilterState {
  filters: {
    [filter: string]: {
      filterPayload: {
        value: string;
        isWhatsCurrent: boolean;
        isAffiliateActivity: boolean;
        isAllTimeGreats: boolean;
        isDatePosted: boolean;
        isDatePostedSwitched: boolean;
        isPopularity: boolean;
        isPopularitySwitched: boolean;
        isAdvancedSearch: boolean;
        isIndividuals?: boolean;
        isGroups?: boolean;
        isOrganizations?: boolean;
        isNewestMessages?: boolean;
        isOldestMessages?: boolean;
        isNewestAffiliate?: boolean;
        isOldestAffiliate?: boolean;
        affiliatedFilters: {
          ind: string[];
          grp: string[];
          org: string[];
        };
        author: string;
        dateRange: {
          from: string;
          to: string;
        };
      };
    };
  };
}

/* 
  RightNav.tsx
  Global RightState
*/

export interface RightNavProps {
  mainPageState: string;
}

export interface MessagesState {
  page: {
    messages: {
      pagePayload: {
        pageState: string;
      };
    };
  };
}

/* 
RightSpace.tsx
Global RightState
*/

export interface MainState {
  page: {
    main: {
      pagePayload: {
        pageState: string;
      };
    };
  };
}

export interface MainSecondaryState {
  page: {
    main: {
      pagePayload: {
        secondaryPageState: string;
      };
    };
  };
}

/* 
  DogEarCards.tsx
*/

export interface CoverSheet {
  sheet_id: string;
  sheet_data_id: string;
  sheet_author_id: string;
  sheet_filename: string;
  sheet_title: string;
  sheet_subject: string;
}

/* 
  NewsCards.tsx
  Global Sheet
*/

/* 
  PapersCards.tsx
  Global Sheet
*/

/* 
  PapersCard.tsx
*/

export interface PapersCardProps {
  paper_id: string;
  title: string;
  subject: string;
}

/* 
  NewsCard.tsx
*/

export interface NewsCardProps {
  sheet_id: string;
  title: string;
  subject: string;
  affResponses?: string | null;
}

/* 
  DogEarCard.tsx
*/

export interface DogEarCardProps {
  sheet_id: string;
  title: string;
  subject: string;
  affResponses?: string | null;
}

/* 
  ConversationCard.tsx
*/

export interface ConversationCardProps {
  animate?: boolean;
  conversation_id: string;
  conversation_name: string | null;
  last_message: string | null;
  members: Members[];
  conversation_creation_date: string;
  conversations_pictures_id: string | null;
  filter?: string;
}

/* 
  ContactCard.tsx
*/

export interface ContactCardProps {
  entity_username: string;
  entity_type: number;
  animate?: boolean;
  conversation_id: string;
  conversation_name: string | null;
  contact_name: string | null;
  last_message: string | null;
  contact_creation_date: string;
  contacts_pictures_id: string | null;
  filter?: string;
}

/* 
  RightAddAdvancedSearchFilter.tsx
*/

export interface RightAddAdvancedSearchFilterProps {
  page: string;
  rightAddAdvancedSearchFilterRef: React.RefObject<HTMLDivElement>;
}

/* 
  RightAdvancedSearchFilter.tsx
  Global RightFilterState
*/

export interface RightAdvancedSearchFilterProps {
  page: string;
  handleFilterFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
  refs: {
    rightSpaceFilter: React.RefObject<HTMLDivElement>;
    rightAdvancedSearchFilter: React.RefObject<HTMLDivElement>;
    rightDateRange: React.RefObject<HTMLDivElement>;
    rightDateRangeCaptionDropdown: React.RefObject<HTMLDivElement>;
    rightAdvancedFilterDropdownDrop: React.RefObject<HTMLDivElement>;
    rightDateRangeContainer?: React.RefObject<HTMLDivElement>;
  };
}

/* 
  RightSearchBar.tsx
*/

export interface RightSearchBarProps {
  page: string;
  isFilter: boolean;
}

export interface RightPageState {
  filters: {
    [filter: string]: {
      isDropFilter: boolean;
    };
  };
}

/* 
  RightSearchFilter.tsx
  Global RightFilterState
*/

export interface RightSearchFilterProps {
  page: string;
  rightSpaceFilterGeometry: {
    width: number;
    position: {
      bottom: number;
      left: number;
    };
  };
  refs: {
    rightAddAdvancedSearchFilter: React.RefObject<HTMLDivElement>;
    rightAdvancedSearchFilter: React.RefObject<HTMLDivElement>;
    rightDateRange: React.RefObject<HTMLDivElement>;
    rightDateRangeCaptionDropdown: React.RefObject<HTMLDivElement>;
    rightSpaceFilter: React.RefObject<HTMLDivElement>;
    rightSpaceSearchBar: React.RefObject<HTMLDivElement>;
    rightAdvancedFilterDropdownDrop: React.RefObject<HTMLDivElement>;
  };
}

/* 
  Conversations.tsx
*/
export interface Members {
  conversation_id: string;
  member_id: string;
  individual_data?: {
    individual_name: string | null;
    individual_username: string;
  };
  group_data?: {
    group_handle: string;
    group_name: string | null;
  };
  organization_data?: {
    organization_handle: string;
    organization_name: string | null;
  };
}

export interface Conversation {
  animate?: boolean;
  conversation_id: string;
  conversation_name: string | null;
  conversation_creation_date: string;
  last_message: string | null;
  last_message_date: string | null;
  conversations_pictures_id: string | null;
  members: Members[];
}

/*
  Contacts.tsx
*/

export interface Contact {
  animate?: boolean;
  contact_id: string;
  conversation_name: string | null;
  conversation_id: string;
  contact_name: string | null;
  contact_username_root: string;
  contact_username_target: string;
  contact_creation_date: string;
  last_message: string | null;
  last_contact_date: string | null;
  contacts_pictures_id: string | null;
  entity_type: number;
}

/* 
  Tables.tsx
*/

export interface Table {}
