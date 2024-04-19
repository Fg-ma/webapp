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
  conversation_name: string | null;
  conversation_creation_date: string;
  last_message: string | null;
  last_message_date: string | null;
  conversations_pictures_id: string | null;
  members?: ConversationMember[];
}

export interface Sheet {
  sheet_id: string;
  sheet_author_id: string;
  sheet_title: string;
  sheet_subject: string;
  sheet_filename: string;
  sheet_data_id: string;
  sheet_thumbnail_id: string;
  sheet_likes: number;
  sheet_dislikes: number;
  sheet_views: number;
  sheet_date_posted: string;
}

export interface Video {
  video_id: string;
  video_creator_id: string;
  video_title: string;
  video_description: string;
  video_filename: string;
  video_thumbnail_id: string;
  video_data_id: string;
  video_likes: number;
  video_dislikes: number;
  video_views: number;
  video_date_posted: string;
}

export interface Image {
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

export interface Content {
  content_id: string;
  content_type: number;
}

export interface EntityContent {
  entities_content_id: string;
  entity_id: string;
  content_id: string;
  date_added: string;
  pinned: boolean;
  date_pinned: string | null;
}

export interface MergedSheetData extends EntityContent, Sheet {}

export interface MergedVideoData extends EntityContent, Video {}

export interface MergedImageData extends EntityContent, Image {}

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
  entities: { entity_id: string; entity_username: string; entity_type: number };
}

export interface ProfilePicture {
  profile_picture_id: string;
  profile_picture_data: Blob;
  profile_picture_filename: string;
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
  sheet_thumbnail_id: string;
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
    entity_username: string;
    entity_type: number;
  };
}

export interface SheetThumbnail {
  sheet_thumbnail_id: string;
  sheet_thumbnail_data: Blob;
  sheet_thumbnail_filename: string;
  sheet_thumbnail_description: string;
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
  video_thumbnail_id: string;
  video_likes: number;
  video_dislikes: number;
  video_views: number;
  video_date_posted: string;
  videos_data: {
    video_data_id: string;
    video_data: Blob;
  };
  entities: {
    entity_id: string;
    entity_username: string;
    entity_type: number;
  };
}

export interface ConversationMember {
  isNewConversation?: boolean;
  conversation_id: string;
  conversations_members_id: string;
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

export interface ConversationsMessagesLogs {
  conversations_messages_logs_id: string;
  conversation_id: string;
  entity_id: string;
  message: string;
  message_date: string;
}

export interface ConversationPicture {
  conversations_pictures_id: string;
  conversation_picture_data: Blob;
  conversation_picture_filename: string;
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
  last_contact_date: string | null;
  contacts_pictures_id: string | null;
}

export interface ContactPicture {
  contacts_pictures_id: string;
  contact_picture_data: Blob;
  contact_picture_filename: string;
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

/*
  references.ts
*/

export interface EntityReferences {
  reference_id: string;
  entity_id: string;
  title: string;
  author: string;
  url: string;
}

/*
  tables.ts
*/

export interface Table {
  table_id: string;
  table_name: string;
  table_creation_date: string;
  last_message: string;
  last_message_date: string;
  tables_pictures_id: string;
  members?: TableMember[];
}

export interface TableMember {
  tables_members_id: string;
  table_id: string;
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

export interface TableMessageLogs {
  tables_messages_logs_id: string;
  table_id: string;
  entity_id: string;
  message: string;
  message_date: string;
}

export interface TableTabletop {
  tables_tabletops_id: string;
  content_data: Blob;
  content_filename: string;
  content_date_posted: string;
  content_x_position: number;
  content_y_position: number;
  content_rotation: number;
}
