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

/* 
  RightSpace.tsx
  Global RightState
*/

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
  RightSpaceCards.tsx
*/

export interface PapersCardProps {
  paper_id: string;
  title: string;
  subject: string;
}

export interface NewsCardProps {
  sheet_id: string;
  title: string;
  subject: string;
  affResponses?: string | null;
}

export interface MessagesCardProps {
  name: string;
  lastMessage: string | null;
}

export interface DogEarCardProps {
  sheet_id: string;
  title: string;
  subject: string;
  affResponses?: string | null;
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

*/

/* 

*/

/* 

*/

/* 

*/

/* 

*/

/* 

*/

/* 

*/

/* 

*/

/* 

*/

/* 

*/

/* 

*/

/* 

*/

/* 

*/

/* 

*/

/* 

*/
