import { MutableRefObject, ChangeEvent } from "react";
import { Socket } from "socket.io-client";

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
  individual_name?: string;
  individual_username?: string;
  individual_roles?: string;
  individual_current_issue?: string;
  individual_description?: string;
  group_name?: string;
  group_handle?: string;
  group_stances?: string;
  group_current_issue?: string;
  group_description?: string;
  organization_name?: string;
  organization_handle?: string;
  organization_stances?: string;
  organization_current_issue?: string;
  organization_description?: string;
}

export interface EntityReferences {
  reference_id: string;
  individual_username: string | null;
  group_handle: string | null;
  organization_handle: string | null;
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

export interface TableId {
  page: {
    main: {
      pagePayload: {
        ids: {
          table_id: string | null;
        };
      };
    };
  };
}

export interface MiddleSpaceProps {
  middleSpaceContainerRef: React.RefObject<HTMLDivElement>;
}

export interface MiddleVerticalSplitPaneProps {
  middleSpaceContentContainerRef: React.RefObject<HTMLDivElement>;
}

export interface MainSecondaryState {
  page: {
    main: {
      pagePayload: {
        secondaryPageState: string | null;
      };
    };
  };
}

export interface LoginState {
  page: {
    login: {
      pagePayload: {
        username: string;
        pageState: string;
        isLoggedIn: string;
      };
    };
  };
}

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

export interface RelatedIssuesHeaderProps {
  lightness: number;
  togglePaneHeight: () => void;
}

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

export interface SheetCardProps {
  type: string;
  sheet_id: string;
  author_username: string;
  pinned: boolean;
  relation_id: string;
  isEditablePage: MutableRefObject<boolean>;
}

export interface SheetData {
  sheet_id: string;
  sheet_data_id: string;
  sheet_author_username: string;
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
  video_creator_username: string;
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
  image_creator_username: string;
  image_filename: string;
  image_title: string;
  image_description: string;
}

export interface SheetThumbnailData {
  image_url: string;
  image_description: string;
}

export interface VideoThumbnailData {
  image_url: string;
  image_description: string;
}

export interface ImageThumbnailData {
  image_url: string;
  image_description: string;
}

export interface CollectionsProps {
  entity_username: string;
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
    sheet_author_username?: string;
    sheet_data_id?: string;
    sheet_date_posted?: string;
    sheet_dislikes?: number;
    sheet_filename?: string;
    sheet_id?: string;
    sheet_likes?: number;
    sheet_subject?: string;
    sheet_title?: string;
    sheet_views?: number;
    image_creator_username?: string;
    image_data_id?: string;
    image_date_posted?: string;
    image_description?: string;
    image_dislikes?: number;
    image_filename?: string;
    image_id?: string;
    image_likes?: number;
    image_title?: string;
    image_views?: number;
    video_creator_username?: string;
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

export interface ImagesProps {
  entity_username: string;
  isEditablePage: MutableRefObject<boolean>;
}

export interface ImagesData {
  image_id: string;
  entity_username: string;
  entities_content_id: string;
  date_added: string;
  pinned: boolean;
  date_pinned: string | null;
  images: ImageData[];
}

export interface SheetsProps {
  entity_username: string;
  isEditablePage: MutableRefObject<boolean>;
}

export interface SheetsData {
  sheet_id: string;
  entity_username: string;
  entities_content_id: string;
  date_added: string;
  pinned: boolean;
  date_pinned: string | null;
  sheets: SheetData[];
}

export interface VideosProps {
  entity_username: string;
  isEditablePage: MutableRefObject<boolean>;
}

export interface VideosData {
  video_id: string;
  entity_username: string;
  entities_content_id: string;
  date_added: string;
  pinned: boolean;
  date_pinned: string | null;
  videos: VideoData[];
}

export interface CollectionButtonProps {
  entityType: number;
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

export interface CollectionButtonsProps {
  entityType: number;
  entity_username?: string;
  isEditablePage: MutableRefObject<boolean>;
}

export interface CollectionNames {
  collection_id: string;
  collection_name: string;
  individual_id: string | null;
  group_id: string | null;
  organization_id: string | null;
}

export interface EntityContentNavProps {
  entity_username?: string;
  entityType: number;
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

export interface EntityPageProps {
  entityType: number;
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
  entity_username: string;
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

export interface EntityPageFooterProps {
  entityType: number;
  entity: EntityData | null;
}

export interface EntityPageHeaderProps {
  entity_username: string;
  entityType: number;
  entity: EntityData | null;
  entityReferences: EntityReferences[];
  scrollingEntityContainer: React.RefObject<HTMLDivElement>;
}

export interface Afiliate {
  type?: string;
  date: string;
  individual_current_issue?: string;
  individual_description?: string;
  individual_username?: string;
  individual_id?: string;
  individual_name?: string;
  individual_roles?: string;
  group_current_issue?: string;
  group_description?: string;
  group_handle?: string;
  group_id?: string;
  group_name?: string;
  group_stances?: string;
  organization_current_issue?: string;
  organization_description?: string;
  organization_handle?: string;
  organization_id?: string;
  organization_name?: string;
  organization_stances?: string;
  profile_picture_id: string;
}

export interface HomePageProps {
  middleSpaceContainerRef: React.RefObject<HTMLDivElement>;
  middleSpaceRef: React.RefObject<HTMLDivElement>;
}

export interface MiddleAddAdvancedSearchFilterProps {
  middleAddAdvancedSearchFilterRef: React.RefObject<HTMLDivElement>;
}

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

export interface MiddleDropProps {
  middleSpaceContainerRef: React.RefObject<HTMLDivElement>;
  middleSpaceRef: React.RefObject<HTMLDivElement>;
}

export interface MiddleSearchBarProps {
  middleSpaceContainerRef: React.RefObject<HTMLDivElement>;
  middleSpaceRef: React.RefObject<HTMLDivElement>;
}

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

export interface AffiliatedEntitiesScrollProps {
  affiliatesProfilePictures: React.JSX.Element[] | null;
  affiliateProfilePicturesRef: React.RefObject<HTMLDivElement>;
  topHeaderRef: React.RefObject<HTMLDivElement>;
}

export interface AffiliateWithButtonProps {
  entity_username: string;
}

export interface MessagePageProps {
  middleSpaceRef: React.RefObject<HTMLDivElement>;
}

export interface Message {
  content: string;
  sender: string;
  isUser: boolean;
  message_date: string;
}

export interface Typing {
  typing: boolean;
  sender: string;
}

export interface MessagesConversationBodyProps {
  conversation: Message[];
  conversationSize: number;
  typing: Typing[];
}

export interface MessagesTextFieldProps {
  conversation_id: string | null;
  messageSocket: Socket;
  messagesPageRef: React.RefObject<HTMLDivElement>;
  textFieldSnap: boolean;
}

export interface UserBubbleProps {
  message: string;
}

export interface RecipientsBubblesProps {
  message: string;
  conversationSize: number;
  sender: string;
}

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

export interface MessageButtonProps {
  entity_username: string;
}

export interface ContactDropdownProps {
  entity_username: string;
  scrollingEntityContainer: React.RefObject<HTMLDivElement>;
}

export interface ContactDropdownPortalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  entity_username: string;
  contactDropdownPortalContainerRef: React.RefObject<HTMLDivElement>;
  scrollingEntityContainer: React.RefObject<HTMLDivElement>;
  contactDropdownRef: React.RefObject<HTMLDivElement>;
}

export interface CreateContactButtonProps {
  entity_username: string;
}

export interface TablesPageState {
  page: {
    main: {
      pagePayload: {
        ids: {
          paper_id: null;
          sheet_id: null;
          video_id: null;
          image_id: null;
          conversation_id: null;
          table_id: null;
        };
      };
    };
  };
}

export interface Table {
  last_message: string | null;
  last_message_date: string | null;
  members: {
    individual_data?: {
      individual_name: string | null;
      individual_username: string;
      individual_current_issue?: string | null;
    };
    group_data?: {
      group_handle: string;
      group_name: string | null;
      group_current_issue?: string | null;
    };
    organization_data?: {
      organization_handle: string;
      organization_name: string | null;
      organization_current_issue?: string | null;
    };
    table_position: number;
  }[];
  table_creation_date: string;
  table_id: string;
  table_name: string | null;
  tables_pictures_id: string | null;
}

export interface TablesTextFieldProps {
  table_id: string | null;
  tableSocket: Socket;
}
