// Global
export interface FilterState {
  filters: {
    [filter: string]: {
      filterPayload: {
        affiliatedFilters: {
          [key: string]: string[];
          ind: string[];
          grp: string[];
          org: string[];
        };
      };
    };
  };
}

/*
  AdvancedFilterDropdown.tsx
  Global FilterState
*/

export interface AdvancedFilterDropdownProps {
  filter: string;
  subcategory: string;
  advancedFilterDropdownDropRef: React.RefObject<HTMLDivElement>;
  searchFilterRef: React.RefObject<HTMLDivElement>;
}

/*
  FilterCard.tsx
  Global FilterState
*/

export interface FilterCardProps {
  entity_id: string;
  filter: string;
  identify: string;
  name: string;
  subcategory: string;
  popupRef: React.RefObject<HTMLDivElement>;
}

/*
  Popup.tsx
*/

export interface PopupProps {
  name: string;
  position: {
    top: number;
    left: number;
  };
  onMouseEnter: (event: MouseEvent) => void;
  onMouseLeave: () => void;
  handleFilterClick: () => void;
  popupRef: React.RefObject<HTMLDivElement>;
  isFilterSelected: boolean;
  subcategory: string;
}

/*
  Checkbox.tsx
*/

export interface CheckboxProps {
  checked: boolean;
  hovering: boolean;
}

/*
  CaptionDropdown.tsx
*/

export interface CaptionDropdownProps {
  options: number[] | string[];
  value: number;
  onChange:
    | ((newMonthIndex: number) => void)
    | ((newYearIndex: number) => void);
  type: string;
  dateRangeCaptionDropdownRef: React.RefObject<HTMLDivElement>;
}

/*
  DateCenterCaption.tsx
*/

export interface DateCenteredCaptionProps {
  id?: string | undefined;
  displayMonth: Date;
  displayIndex?: number | undefined;
  updateRangeStyles: () => void;
  dateRangeCaptionDropdownRef: React.RefObject<HTMLDivElement>;
}

/*
  DateRangePicker.tsx
*/

export interface DateRangePickerProps {
  filter: string;
  position: {
    top?: number;
    bottom?: number;
    left: number;
  };
  selectedRange: {
    from: string | object;
    to: string | object;
  };
  setSelectedRange: React.Dispatch<
    React.SetStateAction<{
      from: string | object;
      to: string | object;
    }>
  >;
  updateRangeStyles: () => void;
  refs: {
    dateRange: React.RefObject<HTMLDivElement>;
    dateRangeCaptionDropdown: React.RefObject<HTMLDivElement>;
  };
}

/*
  ProfilePicture.tsx
*/

export interface ProfilePictureProps {
  size: {
    w: number;
    h: number;
  };
  entity_id: string;
  entity_type: number;
  styles: string;
  entity?: {
    entity_name?: string;
    entity_username?: string;
    entity_current_Issue?: string;
  };
  clickable: boolean;
}

export interface Entity {
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

/*
  ReferenceLinks.tsx
*/

export interface Reference {
  reference_id: string;
  individual_id: string | null;
  group_id: string | null;
  organization_id: string | null;
  title: string;
  author: string;
  url: string;
}

export interface ReferenceLinksProps {
  references: Reference[];
}

/*
  ImageViewer.tsx
*/

export interface ImageViewerProps {
  image_id: string;
}

export interface ImageData {
  image_url: string;
  image_title: string;
  image_description: string;
  entity_type: number;
  image_creator: any;
}

/*
  SheetActionLikeDislikeButtons.tsx
*/

export interface SheetActionLikeDislikeButtonsProps {
  sheet_id: string;
  sheetData: {
    sheet_title: string;
    sheet_subject: string;
    entity_type: number;
    sheet_author: any;
    sheet_url: string;
    sheet_likes: number;
    sheet_dislikes: number;
  };
}

/*
  SheetActionSection.tsx
*/

export interface SheetActionSectionProps {
  sheet_id: string;
  sheetData: {
    sheet_title: string;
    sheet_subject: string;
    entity_type: number;
    sheet_author: any;
    sheet_url: string;
    sheet_likes: number;
    sheet_dislikes: number;
  };
}

/*
  SheetHeader.tsx
*/

export interface SheetHeaderProps {
  sheet_id: string;
  sheetData: {
    sheet_title: string;
    sheet_subject: string;
    entity_type: number;
    sheet_author: any;
    sheet_url: string;
    sheet_likes: number;
    sheet_dislikes: number;
  };
}

/*
  SheetViewer.tsx
*/

export interface SheetViewerProps {
  sheet_id: string;
}

export interface SheetData {
  sheet_url: string;
  sheet_title: string;
  sheet_subject: string;
  entity_type: number;
  sheet_author: any;
  sheet_likes: number;
  sheet_dislikes: number;
}

/*
  VideoViewr.tsx
*/

export interface VideoViewerProps {
  video_id: string;
}

export interface VideoData {
  video_url: string;
  video_title: string;
  video_description: string;
  entity_type: number;
  video_creator: any;
}

/* 
  SheetThumbnail.tsx
*/

export interface SheetThumbnailProps {
  sheet_id: string;
  size: { h: number; w: number };
  styles: string;
}
