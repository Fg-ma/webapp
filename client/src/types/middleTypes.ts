import { MutableRefObject, ChangeEvent } from "react";
import { Socket } from "socket.io-client";

// Global
export interface MainState {
  page: {
    main: {
      pagePayload: {
        pageState: string;
      };
    };
  };
}

export interface EntityData {
  [key: string]: any;
  individual_id?: string;
  individual_name?: string;
  individual_userName?: string;
  individual_roles?: string;
  individual_currentIssue?: string;
  individual_description?: string;
  group_id?: string;
  group_name?: string;
  group_handle?: string;
  group_stances?: string;
  group_currentIssue?: string;
  group_description?: string;
  organization_id?: string;
  organization_name?: string;
  organization_handle?: string;
  organization_stances?: string;
  organization_currentIssue?: string;
  organization_description?: string;
}

export interface EntityReferences {
  reference_id: string;
  individual_id: string | null;
  group_id: string | null;
  organization_id: string | null;
  title: string;
  author: string;
  url: string;
}

export interface MiddleFilterState {
  filters: {
    middle: {
      isDrop: boolean;
      isDropFilter: boolean;
      filterPayload: {
        isWhatsCurrent: boolean;
        isAffiliateActivity: boolean;
        isAllTimeGreats: boolean;
        isDatePosted: boolean;
        isDatePostedSwitched: boolean;
        isPopularity: boolean;
        isPopularitySwitched: boolean;
        isAdvancedSearch: boolean;
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

export interface ConverationId {
  page: {
    main: {
      pagePayload: {
        ids: {
          conversation_id: string | null;
        };
      };
    };
  };
}

/*
  MiddleSpace.tsx
  Global Mainstate
*/

export interface MiddleSpaceProps {
  middleSpaceContainerRef: React.RefObject<HTMLDivElement>;
}

/*
  MiddleVerticalSplitPane.tsx
*/

export interface MiddleVerticalSplitPaneProps {
  middleSpaceContentContainerRef: React.RefObject<HTMLDivElement>;
}

/*
  PageNav.tsx
  Global MainState
  Global ConversationId
*/

export interface MainSecondaryState {
  page: {
    main: {
      pagePayload: {
        secondaryPageState: string | null;
      };
    };
  };
}

/*
  RelatedIssues.tsx
*/

export interface CoverSheet {
  sheet_id: number;
  sheet_data_id: number;
  sheet_author_id: number;
  sheet_filename: string;
  sheet_title: string;
  sheet_subject: string;
}

export interface RelatedIssuesCardProps {
  title: string;
  affResponses: string | null;
}

/*
  RelatedIssuesHeader.tsx
*/

export interface RelatedIssuesHeaderProps {
  lightness: number;
  togglePaneHeight: () => void;
}

/*
  ContentPage.tsx
*/

export interface ContentPageProps {
  contentType: string;
}

export interface ContentIDState {
  page: {
    main: {
      pagePayload: {
        ids: {
          sheet_id: string;
          video_id: string;
          image_id: string;
        };
      };
    };
  };
}

/*
  Cards.tsx
*/

export interface SheetProps {
  type: string;
  sheet_id: string;
  author_id: string;
  pinned: boolean;
  relation_id: string;
  isEditablePage: MutableRefObject<boolean>;
}

export interface SheetData {
  sheet_id: string;
  sheet_data_id: string;
  sheet_author_id: string;
  sheet_filename: string;
  sheet_title: string;
  sheet_subject: string;
}

export interface VideoProps {
  type: string;
  video_id: string;
  pinned: boolean;
  relation_id: string;
  isEditablePage: MutableRefObject<boolean>;
}

export interface VideoData {
  video_id: string;
  video_data_id: string;
  video_creator_id: string;
  video_filename: string;
  video_title: string;
  video_description: string;
}

export interface ImageProps {
  type: string;
  image_id: string;
  pinned: boolean;
  relation_id: string;
  isEditablePage: MutableRefObject<boolean>;
}

export interface ImageData {
  image_id: string;
  image_data_id: string;
  image_creator_id: string;
  image_filename: string;
  image_title: string;
  image_description: string;
}

/*
  Collections.tsx
*/

export interface CollectionsProps {
  entity_id: string;
  collection_id: string;
  isEditablePage: MutableRefObject<boolean>;
}

export interface CollectionItem {
  collection_id: string;
  collections_content_id: string;
  content: {
    content_id: string;
    content_type: number;
  };
  content_data: {
    sheet_author_id?: string;
    sheet_data_id?: string;
    sheet_date_posted?: string;
    sheet_dislikes?: number;
    sheet_filename?: string;
    sheet_id?: string;
    sheet_likes?: number;
    sheet_subject?: string;
    sheet_title?: string;
    sheet_views?: number;
    image_creator_id?: string;
    image_data_id?: string;
    image_date_posted?: string;
    image_description?: string;
    image_dislikes?: number;
    image_filename?: string;
    image_id?: string;
    image_likes?: number;
    image_title?: string;
    image_views?: number;
    video_creator_id?: string;
    video_data_id?: string;
    video_date_posted?: string;
    video_description?: string;
    video_dislikes?: number;
    video_filename?: "test.mkv";
    video_id?: string;
    video_likes?: number;
    video_title?: string;
    video_views?: number;
  };
  date_added: string;
  pinned: boolean;
  date_pinned: string | null;
}

/*
  Images.tsx
*/

export interface ImagesProps {
  entity_id: string;
  isEditablePage: MutableRefObject<boolean>;
}

export interface ImageData {
  image_id: string;
  entity_id: string;
  entities_content_id: string;
  date_added: string;
  pinned: boolean;
  date_pinned: string | null;
  images: {
    image_id: string;
    image_data_id: string;
    image_creator_id: string;
    image_title: string;
    image_description: string;
    image_filename: string;
  };
}

/*
  Sheets.tsx
*/

export interface SheetsProps {
  entity_id: string;
  isEditablePage: MutableRefObject<boolean>;
}

export interface SheetData {
  sheet_id: string;
  entity_id: string;
  entities_content_id: string;
  date_added: string;
  pinned: boolean;
  date_pinned: string | null;
  sheets: {
    sheet_id: string;
    sheet_data_id: string;
    sheet_author_id: string;
    sheet_filename: string;
    sheet_title: string;
    sheet_subject: string;
  };
}

/*
  Videos.tsx
*/

export interface VideosProps {
  entity_id: string;
  isEditablePage: MutableRefObject<boolean>;
}

export interface VideoData {
  video_id: string;
  entity_id: string;
  entities_content_id: string;
  date_added: string;
  pinned: boolean;
  date_pinned: string | null;
  videos: {
    video_id: string;
    video_data_id: string;
    video_creator_id: string;
    video_filename: string;
    video_title: string;
    video_description: string;
  };
}

/*
  CollectionButton.tsx
*/

export interface CollectionButtonProps {
  entityType: string;
  collection_id: string;
  collection_name: string;
}

export interface CollectionPageState {
  page: {
    [entityType: string]: {
      pagePayload: {
        ids: {
          collection_id: string;
        };
      };
    };
  };
}

/*
  CollectionButtons.tsx
*/

export interface CollectionButtonsProps {
  entityType: string;
  entity_id: string;
  isEditablePage: MutableRefObject<boolean>;
}

export interface CollectionNames {
  collection_id: string;
  collection_name: string;
  individual_id: string | null;
  group_id: string | null;
  organization_id: string | null;
}

/*
  EntityContentNav.tsx
  Global EntityData
*/

export interface EntityContentNavProps {
  entityType: string;
  entity: EntityData | null;
  isEditablePage: MutableRefObject<boolean>;
}

export interface PageState {
  page: {
    [entityType: string]: {
      pagePayload: {
        pageState: string;
      };
    };
  };
}

/*
  EntityPage.tsx
  Global EntityData
  Global EntityReferences
*/

export interface EntityPageProps {
  entityType: string;
}

export interface EntityPageState {
  page: {
    [key: string]: {
      pagePayload: {
        pageState: string;
        ids: {
          individual_id: string | null;
          group_id: string | null;
          organization_id: string | null;
          collection_id: string | null;
        };
      };
    };
  };
}

export interface Entity {
  entity_id: string;
  entity_type: number;
}

export interface ContentMap {
  [key: string]: JSX.Element | null;
  sheets: JSX.Element | null;
  videos: JSX.Element | null;
  images: JSX.Element | null;
}

export interface CollectionsContentMap {
  [key: string]: JSX.Element | null;
  individuals: JSX.Element | null;
  groups: JSX.Element | null;
  organizations: JSX.Element | null;
}

/*
  EntityPageFooter.tsx
*/

export interface EntityPageFooterProps {
  entityType: string;
  entity: EntityData | null;
}

/*
  EntityPageHeader.tsx
  Global EntityData
  Global EntityReferences
*/

export interface EntityPageHeaderProps {
  entity_id: string;
  entityType: string;
  entity: EntityData | null;
  entityReferences: EntityReferences[];
  scrollingEntityContainer: React.RefObject<HTMLDivElement>;
}

export interface Afiliate {
  type?: string;
  date: [{ affiliate_relation_date: string }];
  individual_currentIssue?: string;
  individual_description?: string;
  individual_username?: string;
  individual_id?: string;
  individual_name?: string;
  individual_roles?: string;
  group_currentIssue?: string;
  group_description?: string;
  group_handle?: string;
  group_id?: string;
  group_name?: string;
  group_stances?: string;
  organization_currentIssue?: string;
  organization_description?: string;
  organization_handle?: string;
  organization_id?: string;
  organization_name?: string;
  organization_stances?: string;
  profile_picture_id: string;
}

/*
  HomePage.tsx
*/

export interface HomePageProps {
  middleSpaceContainerRef: React.RefObject<HTMLDivElement>;
  middleSpaceRef: React.RefObject<HTMLDivElement>;
}

/*
  MiddleAddAdvancedSearchFilter.tsx
*/

export interface MiddleAddAdvancedSearchFilterProps {
  middleAddAdvancedSearchFilterRef: React.RefObject<HTMLDivElement>;
}

/*
  MiddleAdvancedSearchFilter.tsx
  Global MiddleFilterState
*/

export interface MiddleAdvancedSearchFilterProps {
  handleFilterFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
  refs: {
    middleAdvancedSearchFilterContainer: React.RefObject<HTMLDivElement>;
    middleAdvancedSearchFilter: React.RefObject<HTMLDivElement>;
    middleDateRange: React.RefObject<HTMLDivElement>;
    middleDateRangeCaptionDropdown: React.RefObject<HTMLDivElement>;
    middleAdvancedFilterDropdownDropRef: React.RefObject<HTMLDivElement>;
    middleDateRangeContainer?: React.RefObject<HTMLDivElement>;
  };
}

/*
  MiddleDrop.tsx
  Global MiddleFilterState
*/

export interface MiddleDropProps {
  middleSpaceContainerRef: React.RefObject<HTMLDivElement>;
  middleSpaceRef: React.RefObject<HTMLDivElement>;
}

/*
  MiddleSearchBar.tsx
  Global MiddleFilterState
*/

export interface MiddleSearchBarProps {
  middleSpaceContainerRef: React.RefObject<HTMLDivElement>;
  middleSpaceRef: React.RefObject<HTMLDivElement>;
}

/*
  MiddleSearchFilter.tsx
  Global MiddleFilterState
*/

export interface MiddleSearchFilterProps {
  refs: {
    middleSpaceFilter: React.RefObject<HTMLDivElement>;
    middleAddAdvancedSearchFilter: React.RefObject<HTMLDivElement>;
    middleAdvancedSearchFilter: React.RefObject<HTMLDivElement>;
    middleDateRange: React.RefObject<HTMLDivElement>;
    middleDateRangeCaptionDropdown: React.RefObject<HTMLDivElement>;
    middleAdvancedFilterDropdownDropRef: React.RefObject<HTMLDivElement>;
    middleAdvancedSearchFilterContainer?: React.RefObject<HTMLDivElement>;
  };
}

/* 
  AffiliatedEntitiesScroll.tsx
*/

export interface AffiliatedEntitiesScrollProps {
  affiliatesProfilePictures: React.JSX.Element[] | null;
  affiliateProfilePicturesRef: React.RefObject<HTMLDivElement>;
  topHeaderRef: React.RefObject<HTMLDivElement>;
}

/* 
  AffiliateWithButton.tsx
*/

export interface AffiliateWithButtonProps {
  entity_id: string;
}

/*
  MessagePage.tsx
  Global ConversationId
*/

export interface MessagePageProps {
  middleSpaceRef: React.RefObject<HTMLDivElement>;
}

export interface Message {
  content: string;
  sender: string;
  isUser: boolean;
  message_date: string;
}

/*
  MessagesConversationBody.tsx
*/

export interface MessagesConversationBodyProps {
  conversation: Message[];
  conversationSize: number;
}

/*
  MessagesTextField.tsx
*/

export interface MessagesTextFieldProps {
  inputValue: string;
  conversation_id: string | null;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  messageSocket: Socket;
  messagesPageRef: React.RefObject<HTMLDivElement>;
  textFieldSnap: boolean;
}

/*
  UserBubble.tsx
*/

export interface UserBubbleProps {
  message: string;
}

/*
  RecipientsBubbles.tsx
*/

export interface RecipientsBubblesProps {
  message: string;
  conversationSize: number;
  sender: string;
}

/*
  MessagesConversationHeader.tsx
*/

export interface ConversationMeta {
  page: {
    main: {
      pagePayload: {
        conversation: {
          conversation_name: string | null;
          members: string[] | null;
          conversation_creation_date: string | null;
        };
      };
    };
  };
}

/*
  MessageButton.tsx
*/

export interface MessageButtonProps {
  entity_id: string;
}

/*
  ContactDropdown.tsx
*/

export interface ContactDropdownProps {
  entity_id: string;
  scrollingEntityContainer: React.RefObject<HTMLDivElement>;
}

export interface ContactDropdownPortalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  entity_id: string;
  contactDropdownPortalContainerRef: React.RefObject<HTMLDivElement>;
  scrollingEntityContainer: React.RefObject<HTMLDivElement>;
  contactDropdownRef: React.RefObject<HTMLDivElement>;
}

/*
  CreateContactButton.tsx
*/

export interface CreateContactButtonProps {
  entity_id: string;
}
