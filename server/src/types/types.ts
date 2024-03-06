// affiliateRelations.ts

export interface ids {
  entity_id: number;
}

export interface relation {
  affiliate_relation_id: string;
  affiliate_id_root: string;
  affiliate_id_target: string;
  affiliate_relation_date: string;
}

export interface individual {
  individual_id: string;
  individual_username: string;
  individual_name: string | null;
  individual_currentIssue: string | null;
  individual_roles: string | null;
  individual_description: string | null;
  profile_picture_id: string | null;
}

export interface group {
  group_id: string;
  group_handle: string;
  group_name: string | null;
  group_currentIssue: string | null;
  group_stances: string | null;
  group_description: string | null;
  profile_picture_id: string | null;
}

export interface organization {
  organization_id: string;
  organization_handle: string;
  organization_name: string | null;
  organization_currentIssue: string | null;
  organization_stances: string | null;
  organization_description: string | null;
  profile_picture_id: string | null;
}

// entities.ts

export interface EntityContent {
  entities_content_id: string;
  entity_id: string;
  content_id: string;
  date_added: string;
  pinned: boolean;
  date_pinned: string | null;
}

export interface SheetContent {
  sheet_id: string;
  sheet_author_id: string;
  sheet_title: string;
  sheet_subject: string;
  sheet_filename: string;
  sheet_data_id: string;
  sheet_likes: number;
  sheet_dislikes: number;
  sheet_views: number;
  sheet_date_posted: string;
}

export interface MergedSheetData extends EntityContent, SheetContent {}

export interface VideoContent {
  video_id: string;
  video_creator_id: string;
  video_title: string;
  video_description: string;
  video_filename: string;
  video_data_id: string;
  video_likes: number;
  video_dislikes: number;
  video_views: number;
  video_date_posted: string;
}

export interface MergedVideoData extends EntityContent, VideoContent {}

export interface ImageContent {
  image_id: string;
  image_creator_id: string;
  image_title: string;
  image_description: string;
  image_filename: string;
  image_data_id: string;
  image_likes: number;
  image_dislikes: number;
  image_views: number;
  image_date_posted: string;
}

export interface MergedImageData extends EntityContent, ImageContent {}

// images.ts

export interface FullImage {
  image_id: string;
  image_creator_id: string;
  image_title: string;
  image_description: string;
  image_filename: string;
  image_data_id: string;
  image_likes: number;
  image_dislikes: number;
  image_views: number;
  image_date_posted: string;
  images_data: {
    image_data_id: string;
    image_data: Buffer;
  };
  entities: { entity_id: string; entity_type: number };
}

// sheets.ts

export interface FullSheet {
  sheet_id: string;
  sheet_author_id: string;
  sheet_title: string;
  sheet_subject: string;
  sheet_filename: string;
  sheet_data_id: string;
  sheet_likes: number;
  sheet_dislikes: number;
  sheet_views: number;
  sheet_date_posted: string;
  sheets_data: {
    sheet_data_id: string;
    sheet_data: Buffer;
  };
  entities: {
    entity_id: string;
    entity_type: number;
  };
}

// videos.ts

export interface FullVideo {
  video_id: string;
  video_creator_id: string;
  video_title: string;
  video_description: string;
  video_filename: string;
  video_data_id: string;
  video_likes: number;
  video_dislikes: number;
  video_views: number;
  video_date_posted: string;
  videos_data: {
    video_data_id: string;
    video_data: Buffer;
  };
  entities: {
    entity_id: string;
    entity_type: number;
  };
}
