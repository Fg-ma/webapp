// Global

export interface Entity {
  entity_id: string;
  entity_username: string;
  entity_type: number;
}

export interface Individual {
  individual_id: string;
  individual_username: string;
  individual_name: string | null;
  individual_current_issue: string | null;
  individual_roles: string | null;
  individual_description: string | null;
  profile_picture_id: string | null;
}

export interface Group {
  group_id: string;
  group_handle: string;
  group_name: string | null;
  group_current_issue: string | null;
  group_stances: string | null;
  group_description: string | null;
  profile_picture_id: string | null;
}

export interface Organization {
  organization_id: string;
  organization_handle: string;
  organization_name: string | null;
  organization_current_issue: string | null;
  organization_stances: string | null;
  organization_description: string | null;
  profile_picture_id: string | null;
}

export interface Conversation {
  conversation_id: string;
  conversation_name: string;
  conversation_creation_date: string;
  last_message: string;
  members?: ConversationMember[];
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

/*
  affiliateRelations.ts
  Global Entity
  Global Individual
  Global Group
  Global Organization
*/

export interface Relation {
  affiliate_relation_id: string;
  affiliate_id_root: string;
  affiliate_id_target: string;
  affiliate_relation_date: string;
}

/*
  entities.ts
  Global SheetContent
  Global ImageContent
  Global VideoContent
*/

export interface EntityContent {
  entities_content_id: string;
  entity_id: string;
  content_id: string;
  date_added: string;
  pinned: boolean;
  date_pinned: string | null;
}

export interface MergedSheetData extends EntityContent, SheetContent {}

export interface MergedVideoData extends EntityContent, VideoContent {}

export interface MergedImageData extends EntityContent, ImageContent {}

/*
  images.ts
*/

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

/*
  sheets.ts
*/

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

/*
  videos.ts
*/

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

export interface ConversationMember {
  conversation_id: string;
  member_id: string;
  individual_data?: {
    individual_username: string;
    individual_name: string | null;
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

/*
  conversations.ts
  Global Individual
  Global Group
  Global Organization
  Global Conversation
  Global ConversationMember
*/

export interface Message {
  conversations_messages_logs_id: string;
  conversation_id: string;
  entity_id: string;
  message: string;
  message_date: string;
}

/*
  contacts.ts
  Global Entity
  Global Organization
  Global Group
  Global Individual
  Global Conversation
  Global ConversationMember
*/

export interface Contact {
  contact_id: string;
  conversation_name: string | null;
  conversation_id: string;
  contact_name: string | null;
  contact_id_root: string;
  contact_id_target: string;
  contact_creation_date: string;
  last_message: string | null;
  last_message_date: string | null;
}

/* 
  auth.ts
*/

export interface UserCredentials {
  user_id: string;
  username: string;
  user_password: string;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  user_phone_number: string;
}

/* 
  collections.ts
  Global Entity
  Global SheetContent
  Global ImageContent
  Global VideoContent
*/

export interface Collection {
  collection_id: string;
  collection_name: string;
  entity_id: string;
}

export interface CollectionsContent {
  collections_content_id: string;
  collection_id: string;
  content_id: string;
  date_added: string;
  pinned: number;
  date_pinned: string;
  content?: {
    content_id: string;
    content_type: number;
  };
}
