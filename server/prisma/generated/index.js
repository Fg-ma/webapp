
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  detectRuntime,
} = require('./runtime/library.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.10.2
 * Query Engine version: 5a9203d0590c951969e85a7d07215503f4672eb9
 */
Prisma.prismaVersion = {
  client: "5.10.2",
  engine: "5a9203d0590c951969e85a7d07215503f4672eb9"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}


  const path = require('path')

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.Affiliates_relationsScalarFieldEnum = {
  affiliate_relation_id: 'affiliate_relation_id',
  affiliate_id_root: 'affiliate_id_root',
  affiliate_id_target: 'affiliate_id_target',
  affiliate_relation_date: 'affiliate_relation_date'
};

exports.Prisma.CollectionsScalarFieldEnum = {
  collection_id: 'collection_id',
  collection_name: 'collection_name',
  entity_id: 'entity_id'
};

exports.Prisma.Collections_contentScalarFieldEnum = {
  collections_content_id: 'collections_content_id',
  collection_id: 'collection_id',
  content_id: 'content_id',
  date_added: 'date_added',
  pinned: 'pinned',
  date_pinned: 'date_pinned'
};

exports.Prisma.ContentScalarFieldEnum = {
  content_id: 'content_id',
  content_type: 'content_type'
};

exports.Prisma.ConversationsScalarFieldEnum = {
  conversation_id: 'conversation_id',
  conversation_name: 'conversation_name',
  conversation_creation_date: 'conversation_creation_date',
  last_message: 'last_message'
};

exports.Prisma.Conversations_membersScalarFieldEnum = {
  conversation_id: 'conversation_id',
  member_id: 'member_id'
};

exports.Prisma.Conversations_messages_logsScalarFieldEnum = {
  conversations_messages_logs_id: 'conversations_messages_logs_id',
  conversation_id: 'conversation_id',
  entity_id: 'entity_id',
  message: 'message',
  message_date: 'message_date'
};

exports.Prisma.EntitiesScalarFieldEnum = {
  entity_id: 'entity_id',
  entity_type: 'entity_type'
};

exports.Prisma.Entities_contentScalarFieldEnum = {
  entities_content_id: 'entities_content_id',
  entity_id: 'entity_id',
  content_id: 'content_id',
  date_added: 'date_added',
  pinned: 'pinned',
  date_pinned: 'date_pinned'
};

exports.Prisma.Entities_dislikesScalarFieldEnum = {
  dislike_id: 'dislike_id',
  entity_id: 'entity_id',
  content_id: 'content_id'
};

exports.Prisma.Entities_likesScalarFieldEnum = {
  like_id: 'like_id',
  entity_id: 'entity_id',
  content_id: 'content_id'
};

exports.Prisma.Entities_referencesScalarFieldEnum = {
  reference_id: 'reference_id',
  entity_id: 'entity_id',
  title: 'title',
  author: 'author',
  url: 'url'
};

exports.Prisma.GroupsScalarFieldEnum = {
  group_id: 'group_id',
  group_handle: 'group_handle',
  group_name: 'group_name',
  group_currentIssue: 'group_currentIssue',
  group_stances: 'group_stances',
  group_description: 'group_description',
  profile_picture_id: 'profile_picture_id'
};

exports.Prisma.Groups_membersScalarFieldEnum = {
  groups_members_id: 'groups_members_id',
  group_id: 'group_id',
  entity_id: 'entity_id'
};

exports.Prisma.ImagesScalarFieldEnum = {
  image_id: 'image_id',
  image_creator_id: 'image_creator_id',
  image_title: 'image_title',
  image_description: 'image_description',
  image_filename: 'image_filename',
  image_data_id: 'image_data_id',
  image_likes: 'image_likes',
  image_dislikes: 'image_dislikes',
  image_views: 'image_views',
  image_date_posted: 'image_date_posted'
};

exports.Prisma.Images_dataScalarFieldEnum = {
  image_data_id: 'image_data_id',
  image_data: 'image_data'
};

exports.Prisma.IndividualsScalarFieldEnum = {
  individual_id: 'individual_id',
  individual_username: 'individual_username',
  individual_name: 'individual_name',
  individual_currentIssue: 'individual_currentIssue',
  individual_roles: 'individual_roles',
  individual_description: 'individual_description',
  profile_picture_id: 'profile_picture_id'
};

exports.Prisma.OrganizationsScalarFieldEnum = {
  organization_id: 'organization_id',
  organization_handle: 'organization_handle',
  organization_name: 'organization_name',
  organization_currentIssue: 'organization_currentIssue',
  organization_stances: 'organization_stances',
  organization_description: 'organization_description',
  profile_picture_id: 'profile_picture_id'
};

exports.Prisma.Organizations_membersScalarFieldEnum = {
  organizations_members_id: 'organizations_members_id',
  organization_id: 'organization_id',
  entity_id: 'entity_id'
};

exports.Prisma.Profile_picturesScalarFieldEnum = {
  profile_picture_id: 'profile_picture_id',
  profile_picture_data: 'profile_picture_data',
  profile_picture_filename: 'profile_picture_filename'
};

exports.Prisma.SheetsScalarFieldEnum = {
  sheet_id: 'sheet_id',
  sheet_author_id: 'sheet_author_id',
  sheet_title: 'sheet_title',
  sheet_subject: 'sheet_subject',
  sheet_filename: 'sheet_filename',
  sheet_data_id: 'sheet_data_id',
  sheet_thumbnail_id: 'sheet_thumbnail_id',
  sheet_likes: 'sheet_likes',
  sheet_dislikes: 'sheet_dislikes',
  sheet_views: 'sheet_views',
  sheet_date_posted: 'sheet_date_posted'
};

exports.Prisma.Sheets_dataScalarFieldEnum = {
  sheet_data_id: 'sheet_data_id',
  sheet_data: 'sheet_data'
};

exports.Prisma.Sheets_thumbnailsScalarFieldEnum = {
  sheet_thumbnail_id: 'sheet_thumbnail_id',
  sheet_thumbnail_data: 'sheet_thumbnail_data',
  sheet_thumbnail_filename: 'sheet_thumbnail_filename'
};

exports.Prisma.User_credentialsScalarFieldEnum = {
  user_id: 'user_id',
  username: 'username',
  user_password: 'user_password',
  user_first_name: 'user_first_name',
  user_last_name: 'user_last_name',
  user_email: 'user_email',
  user_phone_number: 'user_phone_number'
};

exports.Prisma.VideosScalarFieldEnum = {
  video_id: 'video_id',
  video_creator_id: 'video_creator_id',
  video_title: 'video_title',
  video_description: 'video_description',
  video_filename: 'video_filename',
  video_data_id: 'video_data_id',
  video_thumbnail_id: 'video_thumbnail_id',
  video_likes: 'video_likes',
  video_dislikes: 'video_dislikes',
  video_views: 'video_views',
  video_date_posted: 'video_date_posted'
};

exports.Prisma.Videos_dataScalarFieldEnum = {
  video_data_id: 'video_data_id',
  video_data: 'video_data'
};

exports.Prisma.Videos_thumbnailsScalarFieldEnum = {
  video_thumbnail_id: 'video_thumbnail_id',
  video_thumbnail_data: 'video_thumbnail_data',
  video_thumbnail_filename: 'video_thumbnail_filename'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  affiliates_relations: 'affiliates_relations',
  collections: 'collections',
  collections_content: 'collections_content',
  content: 'content',
  conversations: 'conversations',
  conversations_members: 'conversations_members',
  conversations_messages_logs: 'conversations_messages_logs',
  entities: 'entities',
  entities_content: 'entities_content',
  entities_dislikes: 'entities_dislikes',
  entities_likes: 'entities_likes',
  entities_references: 'entities_references',
  groups: 'groups',
  groups_members: 'groups_members',
  images: 'images',
  images_data: 'images_data',
  individuals: 'individuals',
  organizations: 'organizations',
  organizations_members: 'organizations_members',
  profile_pictures: 'profile_pictures',
  sheets: 'sheets',
  sheets_data: 'sheets_data',
  sheets_thumbnails: 'sheets_thumbnails',
  user_credentials: 'user_credentials',
  videos: 'videos',
  videos_data: 'videos_data',
  videos_thumbnails: 'videos_thumbnails'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\mdaqu\\OneDrive\\Desktop\\webapp\\server\\prisma\\generated",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../.env"
  },
  "relativePath": "..",
  "clientVersion": "5.10.2",
  "engineVersion": "5a9203d0590c951969e85a7d07215503f4672eb9",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mysql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"./generated\"\n}\n\ndatasource db {\n  provider = \"mysql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel affiliates_relations {\n  affiliate_relation_id   String   @id @unique(map: \"affiliate_relation_id_UNIQUE\") @db.Char(36)\n  affiliate_id_root       String   @db.Char(36)\n  affiliate_id_target     String   @db.Char(36)\n  affiliate_relation_date DateTime @default(dbgenerated(\"'2000-01-01 00:00:00'\")) @db.Timestamp(0)\n\n  @@unique([affiliate_id_root, affiliate_id_target], map: \"unique_affiliate_combination\")\n}\n\nmodel collections {\n  collection_id       String                @id @unique(map: \"collection_id_UNIQUE\") @db.Char(36)\n  collection_name     String                @db.VarChar(256)\n  entity_id           String                @db.Char(36)\n  entities            entities              @relation(fields: [entity_id], references: [entity_id], onDelete: NoAction, onUpdate: NoAction, map: \"collections_entity_id_fk\")\n  collections_content collections_content[]\n\n  @@index([entity_id], map: \"collections_entity_id_fk_idx\")\n}\n\nmodel collections_content {\n  collections_content_id String      @id @unique(map: \"collections_content_id_UNIQUE\") @db.Char(36)\n  collection_id          String      @db.Char(36)\n  content_id             String      @db.Char(36)\n  date_added             DateTime    @db.Timestamp(0)\n  pinned                 Boolean\n  date_pinned            DateTime?   @db.Timestamp(0)\n  collections            collections @relation(fields: [collection_id], references: [collection_id], onDelete: NoAction, onUpdate: NoAction, map: \"collections_content_collection_id_fk\")\n  content                content     @relation(fields: [content_id], references: [content_id], onDelete: NoAction, onUpdate: NoAction, map: \"collections_content_content_id_fk\")\n\n  @@index([collection_id], map: \"collections_content_collection_id_fk_idx\")\n  @@index([content_id], map: \"collections_content_content_id_fk_idx\")\n}\n\nmodel content {\n  content_id          String                @id @unique(map: \"media_id_UNIQUE\") @db.Char(36)\n  content_type        Int?\n  collections_content collections_content[]\n  entities_content    entities_content[]\n  entities_dislikes   entities_dislikes[]\n  entities_likes      entities_likes[]\n}\n\nmodel conversations {\n  conversation_id             String                        @id @unique(map: \"conversation_id_UNIQUE\") @db.Char(36)\n  conversation_name           String?                       @db.VarChar(256)\n  conversation_creation_date  DateTime                      @db.Timestamp(0)\n  last_message                String?                       @db.Text\n  conversations_members       conversations_members[]\n  conversations_messages_logs conversations_messages_logs[]\n}\n\nmodel conversations_members {\n  conversation_id String        @db.Char(36)\n  member_id       String        @db.Char(36)\n  conversations   conversations @relation(fields: [conversation_id], references: [conversation_id], onDelete: NoAction, onUpdate: NoAction, map: \"conversations_members_conversation_id_fk\")\n  entities        entities      @relation(fields: [member_id], references: [entity_id], onDelete: NoAction, onUpdate: NoAction, map: \"conversations_members_member_id_fk\")\n\n  @@id([conversation_id, member_id])\n  @@unique([conversation_id, member_id], map: \"UNIQUE_ID_COMBO\")\n  @@index([member_id], map: \"conversations_members_member_id_fk_idx\")\n}\n\nmodel conversations_messages_logs {\n  conversations_messages_logs_id String        @id @db.Char(36)\n  conversation_id                String        @db.Char(36)\n  entity_id                      String        @db.Char(36)\n  message                        String        @db.Text\n  message_date                   DateTime      @db.Timestamp(0)\n  conversations                  conversations @relation(fields: [conversation_id], references: [conversation_id], onDelete: NoAction, onUpdate: NoAction, map: \"conversations_messages_logs_conversation_id_fk\")\n  entities                       entities      @relation(fields: [entity_id], references: [entity_id], onDelete: NoAction, onUpdate: NoAction, map: \"conversations_messages_logs_entity_id_fk\")\n\n  @@index([conversation_id], map: \"conversations_messages_logs_conversation_id_fk_idx\")\n  @@index([entity_id], map: \"conversations_messages_logs_entity_id_fk_idx\")\n}\n\nmodel entities {\n  entity_id                   String                        @id @unique(map: \"entity_id_UNIQUE\") @db.Char(36)\n  entity_type                 Int                           @default(0)\n  collections                 collections[]\n  conversations_members       conversations_members[]\n  conversations_messages_logs conversations_messages_logs[]\n  entities_content            entities_content[]\n  entities_dislikes           entities_dislikes[]\n  entities_likes              entities_likes[]\n  entities_references         entities_references[]\n  groups_members              groups_members[]\n  images                      images[]\n  organizations_members       organizations_members[]\n  sheets                      sheets[]\n  videos                      videos[]\n}\n\nmodel entities_content {\n  entities_content_id String    @id @unique(map: \"entities_content_id_UNIQUE\") @db.Char(36)\n  entity_id           String    @db.Char(36)\n  content_id          String    @db.Char(36)\n  date_added          DateTime  @db.Timestamp(0)\n  pinned              Boolean\n  date_pinned         DateTime? @db.Timestamp(0)\n  content             content   @relation(fields: [content_id], references: [content_id], onDelete: NoAction, onUpdate: NoAction, map: \"entities_content_content_id\")\n  entities            entities  @relation(fields: [entity_id], references: [entity_id], onDelete: NoAction, onUpdate: NoAction, map: \"entities_content_entity_id\")\n\n  @@index([content_id])\n  @@index([entity_id])\n}\n\nmodel entities_dislikes {\n  dislike_id String   @id @unique(map: \"dislike_id_UNIQUE\") @db.Char(36)\n  entity_id  String   @db.Char(36)\n  content_id String   @db.Char(36)\n  content    content  @relation(fields: [content_id], references: [content_id], onDelete: NoAction, onUpdate: NoAction, map: \"entities_dislikes_content_id_fk\")\n  entities   entities @relation(fields: [entity_id], references: [entity_id], onDelete: NoAction, onUpdate: NoAction, map: \"entities_dislikes_entity_id_fk\")\n\n  @@unique([entity_id, content_id], map: \"entities_dislikes_unique_combination\")\n  @@index([content_id], map: \"entities_dislikes_content_id_fk_idx\")\n}\n\nmodel entities_likes {\n  like_id    String   @id @unique(map: \"like_id_UNIQUE\") @db.Char(36)\n  entity_id  String   @db.Char(36)\n  content_id String   @db.Char(36)\n  content    content  @relation(fields: [content_id], references: [content_id], onDelete: NoAction, onUpdate: NoAction, map: \"entities_likes_content_id_fk\")\n  entities   entities @relation(fields: [entity_id], references: [entity_id], onDelete: NoAction, onUpdate: NoAction, map: \"entities_likes_entity_id_fk\")\n\n  @@unique([entity_id, content_id], map: \"entities_likes_unique_combination\")\n  @@index([content_id], map: \"entities_likes_content_id_fk_idx\")\n  @@index([entity_id], map: \"entities_likes_entity_id_fk_idx\")\n}\n\nmodel entities_references {\n  reference_id String   @id @unique(map: \"reference_id_UNIQUE\") @db.Char(36)\n  entity_id    String   @db.Char(36)\n  title        String   @db.VarChar(256)\n  author       String   @db.VarChar(256)\n  url          String   @db.VarChar(256)\n  entities     entities @relation(fields: [entity_id], references: [entity_id], onDelete: NoAction, onUpdate: NoAction, map: \"entities_references_entity_id_fk\")\n\n  @@index([entity_id], map: \"entities_references_entity_id_fk_idx\")\n}\n\nmodel groups {\n  group_id           String            @id @unique(map: \"group_id_UNIQUE\") @db.Char(36)\n  group_handle       String            @unique(map: \"group_handle_UNIQUE\") @db.VarChar(256)\n  group_name         String?           @db.VarChar(256)\n  group_currentIssue String?           @db.Text\n  group_stances      String?           @db.Text\n  group_description  String?           @db.Text\n  profile_picture_id String?           @db.Char(36)\n  profile_pictures   profile_pictures? @relation(fields: [profile_picture_id], references: [profile_picture_id], onDelete: NoAction, onUpdate: NoAction, map: \"groups_profile_picture_id_fk\")\n  groups_members     groups_members[]\n\n  @@index([profile_picture_id], map: \"groups_profile_picture_id_fk_idx\")\n}\n\nmodel groups_members {\n  groups_members_id String   @id @unique(map: \"groups_members_id_UNIQUE\") @db.Char(36)\n  group_id          String   @db.Char(36)\n  entity_id         String   @db.Char(36)\n  entities          entities @relation(fields: [entity_id], references: [entity_id], onDelete: NoAction, onUpdate: NoAction, map: \"groups_members_entity_id_fk\")\n  groups            groups   @relation(fields: [group_id], references: [group_id], onDelete: NoAction, onUpdate: NoAction, map: \"groups_members_group_id_fk\")\n\n  @@unique([group_id, entity_id], map: \"unique_group_member_combination\")\n  @@index([entity_id], map: \"groups_members_entity_id_fk\")\n  @@index([group_id], map: \"groups_members_group_id_fk_idx\")\n}\n\nmodel images {\n  image_id          String      @id @unique(map: \"image_id_UNIQUE\") @db.Char(36)\n  image_creator_id  String      @db.Char(36)\n  image_title       String      @db.VarChar(256)\n  image_description String      @db.Text\n  image_filename    String      @db.VarChar(256)\n  image_data_id     String      @db.Char(36)\n  image_likes       Int         @default(0)\n  image_dislikes    Int         @default(0)\n  image_views       Int         @default(0)\n  image_date_posted DateTime    @default(dbgenerated(\"'2000-01-01 01:01:01'\")) @db.Timestamp(0)\n  entities          entities    @relation(fields: [image_creator_id], references: [entity_id], onDelete: NoAction, onUpdate: NoAction, map: \"images_image_creator_id_fk\")\n  images_data       images_data @relation(fields: [image_data_id], references: [image_data_id], onDelete: NoAction, onUpdate: NoAction, map: \"images_image_data_id_fk\")\n\n  @@index([image_creator_id], map: \"images_image_creator_id_fk_idx\")\n  @@index([image_data_id], map: \"images_image_data_id_fk_idx\")\n}\n\nmodel images_data {\n  image_data_id String   @id @unique(map: \"image_data_id_UNIQUE\") @db.Char(36)\n  image_data    Bytes\n  images        images[]\n}\n\nmodel individuals {\n  individual_id           String            @id @unique(map: \"individual_id_UNIQUE\") @db.Char(36)\n  individual_username     String            @unique(map: \"userName_UNIQUE\") @db.VarChar(256)\n  individual_name         String?           @db.VarChar(256)\n  individual_currentIssue String?           @db.Text\n  individual_roles        String?           @db.Text\n  individual_description  String?           @db.Text\n  profile_picture_id      String?           @db.Char(36)\n  user_credentials        user_credentials  @relation(fields: [individual_id], references: [user_id], onDelete: NoAction, onUpdate: NoAction, map: \"individuals_individual_id_fk\")\n  profile_pictures        profile_pictures? @relation(fields: [profile_picture_id], references: [profile_picture_id], onDelete: NoAction, onUpdate: NoAction, map: \"individuals_profile_picture_id_fk\")\n\n  @@index([profile_picture_id], map: \"individuals_profile_picture_id_fk_idx\")\n}\n\nmodel organizations {\n  organization_id           String                  @id @unique(map: \"organization_id_UNIQUE\") @db.Char(36)\n  organization_handle       String                  @unique(map: \"organization_handle_UNIQUE\") @db.VarChar(256)\n  organization_name         String?                 @db.VarChar(256)\n  organization_currentIssue String?                 @db.Text\n  organization_stances      String?                 @db.Text\n  organization_description  String?                 @db.Text\n  profile_picture_id        String?                 @db.Char(36)\n  profile_pictures          profile_pictures?       @relation(fields: [profile_picture_id], references: [profile_picture_id], onDelete: NoAction, onUpdate: NoAction, map: \"organizations_profile_picture_id\")\n  organizations_members     organizations_members[]\n\n  @@index([profile_picture_id])\n}\n\nmodel organizations_members {\n  organizations_members_id String        @id @unique(map: \"organizations_members_id_UNIQUE\") @db.Char(36)\n  organization_id          String        @db.Char(36)\n  entity_id                String        @db.Char(36)\n  entities                 entities      @relation(fields: [entity_id], references: [entity_id], onDelete: NoAction, onUpdate: NoAction, map: \"organizations_members_entity_id_fk\")\n  organizations            organizations @relation(fields: [organization_id], references: [organization_id], onDelete: NoAction, onUpdate: NoAction, map: \"organizations_members_organization_id_fk\")\n\n  @@index([entity_id], map: \"organizations_members_entity_id_fk_idx\")\n  @@index([organization_id], map: \"organizations_members_organization_id_fk_idx\")\n}\n\nmodel profile_pictures {\n  profile_picture_id       String          @id @unique(map: \"profile_picture_id_UNIQUE\") @db.Char(36)\n  profile_picture_data     Bytes\n  profile_picture_filename String?         @db.VarChar(256)\n  groups                   groups[]\n  individuals              individuals[]\n  organizations            organizations[]\n}\n\nmodel sheets {\n  sheet_id           String             @id @unique(map: \"sheet_id_UNIQUE\") @db.Char(36)\n  sheet_author_id    String             @db.Char(36)\n  sheet_title        String             @db.VarChar(256)\n  sheet_subject      String             @db.Text\n  sheet_filename     String             @db.VarChar(256)\n  sheet_data_id      String             @db.Char(36)\n  sheet_thumbnail_id String?            @db.Char(36)\n  sheet_likes        Int                @default(0)\n  sheet_dislikes     Int                @default(0)\n  sheet_views        Int                @default(0)\n  sheet_date_posted  DateTime           @default(dbgenerated(\"'2000-01-01 01:01:01'\")) @db.Timestamp(0)\n  entities           entities           @relation(fields: [sheet_author_id], references: [entity_id], onDelete: NoAction, onUpdate: NoAction, map: \"sheets_sheet_author_id_fk\")\n  sheets_data        sheets_data        @relation(fields: [sheet_data_id], references: [sheet_data_id], onDelete: NoAction, onUpdate: NoAction, map: \"sheets_sheet_data_id_fk\")\n  sheets_thumbnails  sheets_thumbnails? @relation(fields: [sheet_thumbnail_id], references: [sheet_thumbnail_id], onDelete: NoAction, onUpdate: NoAction, map: \"sheets_sheet_thumbnail_id\")\n\n  @@index([sheet_data_id], map: \"Sheets_sheet_data_id_fk_idx\")\n  @@index([sheet_author_id], map: \"sheets_sheet_author_id_fk_idx\")\n  @@index([sheet_thumbnail_id], map: \"sheets_sheet_tumbnail_id_idx\")\n}\n\nmodel sheets_data {\n  sheet_data_id String   @id @unique(map: \"sheet_data_id_UNIQUE\") @db.Char(36)\n  sheet_data    Bytes\n  sheets        sheets[]\n}\n\nmodel sheets_thumbnails {\n  sheet_thumbnail_id       String   @id @unique(map: \"sheet_thumbnail_id_UNIQUE\") @db.Char(36)\n  sheet_thumbnail_data     Bytes\n  sheet_thumbnail_filename String   @db.VarChar(265)\n  sheets                   sheets[]\n}\n\nmodel user_credentials {\n  user_id           String       @id @unique(map: \"user_id_UNIQUE\") @db.Char(36)\n  username          String       @unique(map: \"username_UNIQUE\") @db.VarChar(128)\n  user_password     String       @db.VarChar(128)\n  user_first_name   String?      @db.VarChar(128)\n  user_last_name    String?      @db.VarChar(128)\n  user_email        String?      @db.VarChar(128)\n  user_phone_number String?      @db.VarChar(15)\n  individuals       individuals?\n}\n\nmodel videos {\n  video_id           String             @id @unique(map: \"video_id_UNIQUE\") @db.Char(36)\n  video_creator_id   String             @db.Char(36)\n  video_title        String             @db.VarChar(256)\n  video_description  String             @db.Text\n  video_filename     String             @db.VarChar(256)\n  video_data_id      String             @db.Char(36)\n  video_thumbnail_id String?            @db.Char(36)\n  video_likes        Int                @default(0)\n  video_dislikes     Int                @default(0)\n  video_views        Int                @default(0)\n  video_date_posted  DateTime?          @default(dbgenerated(\"'2000-01-01 01:01:01'\")) @db.Timestamp(0)\n  entities           entities           @relation(fields: [video_creator_id], references: [entity_id], onDelete: NoAction, onUpdate: NoAction, map: \"videos_video_creator_id_fk\")\n  videos_data        videos_data        @relation(fields: [video_data_id], references: [video_data_id], onDelete: NoAction, onUpdate: NoAction, map: \"videos_video_data_id_fk\")\n  videos_thumbnails  videos_thumbnails? @relation(fields: [video_thumbnail_id], references: [video_thumbnail_id], onDelete: NoAction, onUpdate: NoAction, map: \"videos_video_thumbnail_id_fk\")\n\n  @@index([video_creator_id], map: \"videos_video_creator_id_fk_idx\")\n  @@index([video_data_id], map: \"videos_video_data_id_fk_idx\")\n  @@index([video_thumbnail_id], map: \"videos_video_thumbnail_id_fk_idx\")\n}\n\nmodel videos_data {\n  video_data_id String   @id @unique(map: \"video_data_id_UNIQUE\") @db.Char(36)\n  video_data    Bytes\n  videos        videos[]\n}\n\nmodel videos_thumbnails {\n  video_thumbnail_id       String   @id @unique(map: \"videos_thumbnails_id_UNIQUE\") @db.Char(36)\n  video_thumbnail_data     Bytes\n  video_thumbnail_filename String   @db.VarChar(256)\n  videos                   videos[]\n}\n",
  "inlineSchemaHash": "0145ab7ba2d63a77045a37d76ab40b7e943cb5ddc5b7bcced59df58550dd8178",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "generated",
    "",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"affiliates_relations\":{\"dbName\":null,\"fields\":[{\"name\":\"affiliate_relation_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"affiliate_id_root\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"affiliate_id_target\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"affiliate_relation_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"'2000-01-01 00:00:00'\"]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"affiliate_id_root\",\"affiliate_id_target\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"affiliate_id_root\",\"affiliate_id_target\"]}],\"isGenerated\":false},\"collections\":{\"dbName\":null,\"fields\":[{\"name\":\"collection_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collection_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"collectionsToentities\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections_content\",\"relationName\":\"collectionsTocollections_content\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"collections_content\":{\"dbName\":null,\"fields\":[{\"name\":\"collections_content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collection_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_added\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections\",\"relationName\":\"collectionsTocollections_content\",\"relationFromFields\":[\"collection_id\"],\"relationToFields\":[\"collection_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"content\",\"relationName\":\"collections_contentTocontent\",\"relationFromFields\":[\"content_id\"],\"relationToFields\":[\"content_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"content\":{\"dbName\":null,\"fields\":[{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections_content\",\"relationName\":\"collections_contentTocontent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_content\",\"relationName\":\"contentToentities_content\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_dislikes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_dislikes\",\"relationName\":\"contentToentities_dislikes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_likes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_likes\",\"relationName\":\"contentToentities_likes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"conversations\":{\"dbName\":null,\"fields\":[{\"name\":\"conversation_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conversation_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conversation_creation_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"last_message\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conversations_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"conversations_members\",\"relationName\":\"conversationsToconversations_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conversations_messages_logs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"conversations_messages_logs\",\"relationName\":\"conversationsToconversations_messages_logs\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"conversations_members\":{\"dbName\":null,\"fields\":[{\"name\":\"conversation_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"member_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conversations\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"conversations\",\"relationName\":\"conversationsToconversations_members\",\"relationFromFields\":[\"conversation_id\"],\"relationToFields\":[\"conversation_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"conversations_membersToentities\",\"relationFromFields\":[\"member_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"conversation_id\",\"member_id\"]},\"uniqueFields\":[[\"conversation_id\",\"member_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"conversation_id\",\"member_id\"]}],\"isGenerated\":false},\"conversations_messages_logs\":{\"dbName\":null,\"fields\":[{\"name\":\"conversations_messages_logs_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conversation_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"message\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"message_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conversations\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"conversations\",\"relationName\":\"conversationsToconversations_messages_logs\",\"relationFromFields\":[\"conversation_id\"],\"relationToFields\":[\"conversation_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"conversations_messages_logsToentities\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities\":{\"dbName\":null,\"fields\":[{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections\",\"relationName\":\"collectionsToentities\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conversations_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"conversations_members\",\"relationName\":\"conversations_membersToentities\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conversations_messages_logs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"conversations_messages_logs\",\"relationName\":\"conversations_messages_logsToentities\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_content\",\"relationName\":\"entitiesToentities_content\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_dislikes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_dislikes\",\"relationName\":\"entitiesToentities_dislikes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_likes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_likes\",\"relationName\":\"entitiesToentities_likes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_references\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_references\",\"relationName\":\"entitiesToentities_references\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups_members\",\"relationName\":\"entitiesTogroups_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images\",\"relationName\":\"entitiesToimages\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations_members\",\"relationName\":\"entitiesToorganizations_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets\",\"relationName\":\"entitiesTosheets\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos\",\"relationName\":\"entitiesTovideos\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities_content\":{\"dbName\":null,\"fields\":[{\"name\":\"entities_content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_added\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"content\",\"relationName\":\"contentToentities_content\",\"relationFromFields\":[\"content_id\"],\"relationToFields\":[\"content_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_content\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities_dislikes\":{\"dbName\":null,\"fields\":[{\"name\":\"dislike_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"content\",\"relationName\":\"contentToentities_dislikes\",\"relationFromFields\":[\"content_id\"],\"relationToFields\":[\"content_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_dislikes\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"entity_id\",\"content_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"entity_id\",\"content_id\"]}],\"isGenerated\":false},\"entities_likes\":{\"dbName\":null,\"fields\":[{\"name\":\"like_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"content\",\"relationName\":\"contentToentities_likes\",\"relationFromFields\":[\"content_id\"],\"relationToFields\":[\"content_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_likes\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"entity_id\",\"content_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"entity_id\",\"content_id\"]}],\"isGenerated\":false},\"entities_references\":{\"dbName\":null,\"fields\":[{\"name\":\"reference_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"author\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_references\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"groups\":{\"dbName\":null,\"fields\":[{\"name\":\"group_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_handle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_currentIssue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_stances\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_picture_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_pictures\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"profile_pictures\",\"relationName\":\"groupsToprofile_pictures\",\"relationFromFields\":[\"profile_picture_id\"],\"relationToFields\":[\"profile_picture_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups_members\",\"relationName\":\"groupsTogroups_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"groups_members\":{\"dbName\":null,\"fields\":[{\"name\":\"groups_members_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesTogroups_members\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups\",\"relationName\":\"groupsTogroups_members\",\"relationFromFields\":[\"group_id\"],\"relationToFields\":[\"group_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"group_id\",\"entity_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"group_id\",\"entity_id\"]}],\"isGenerated\":false},\"images\":{\"dbName\":null,\"fields\":[{\"name\":\"image_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_views\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_date_posted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"'2000-01-01 01:01:01'\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToimages\",\"relationFromFields\":[\"image_creator_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images_data\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images_data\",\"relationName\":\"imagesToimages_data\",\"relationFromFields\":[\"image_data_id\"],\"relationToFields\":[\"image_data_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"images_data\":{\"dbName\":null,\"fields\":[{\"name\":\"image_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images\",\"relationName\":\"imagesToimages_data\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"individuals\":{\"dbName\":null,\"fields\":[{\"name\":\"individual_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_currentIssue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_roles\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_picture_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_credentials\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"user_credentials\",\"relationName\":\"individualsTouser_credentials\",\"relationFromFields\":[\"individual_id\"],\"relationToFields\":[\"user_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_pictures\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"profile_pictures\",\"relationName\":\"individualsToprofile_pictures\",\"relationFromFields\":[\"profile_picture_id\"],\"relationToFields\":[\"profile_picture_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"organizations\":{\"dbName\":null,\"fields\":[{\"name\":\"organization_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_handle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_currentIssue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_stances\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_picture_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_pictures\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"profile_pictures\",\"relationName\":\"organizationsToprofile_pictures\",\"relationFromFields\":[\"profile_picture_id\"],\"relationToFields\":[\"profile_picture_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations_members\",\"relationName\":\"organizationsToorganizations_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"organizations_members\":{\"dbName\":null,\"fields\":[{\"name\":\"organizations_members_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToorganizations_members\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations\",\"relationName\":\"organizationsToorganizations_members\",\"relationFromFields\":[\"organization_id\"],\"relationToFields\":[\"organization_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"profile_pictures\":{\"dbName\":null,\"fields\":[{\"name\":\"profile_picture_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_picture_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_picture_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups\",\"relationName\":\"groupsToprofile_pictures\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individuals\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"individuals\",\"relationName\":\"individualsToprofile_pictures\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations\",\"relationName\":\"organizationsToprofile_pictures\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"sheets\":{\"dbName\":null,\"fields\":[{\"name\":\"sheet_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_author_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_subject\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_thumbnail_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_views\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_date_posted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"'2000-01-01 01:01:01'\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesTosheets\",\"relationFromFields\":[\"sheet_author_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets_data\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets_data\",\"relationName\":\"sheetsTosheets_data\",\"relationFromFields\":[\"sheet_data_id\"],\"relationToFields\":[\"sheet_data_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets_thumbnails\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets_thumbnails\",\"relationName\":\"sheetsTosheets_thumbnails\",\"relationFromFields\":[\"sheet_thumbnail_id\"],\"relationToFields\":[\"sheet_thumbnail_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"sheets_data\":{\"dbName\":null,\"fields\":[{\"name\":\"sheet_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets\",\"relationName\":\"sheetsTosheets_data\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"sheets_thumbnails\":{\"dbName\":null,\"fields\":[{\"name\":\"sheet_thumbnail_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_thumbnail_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_thumbnail_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets\",\"relationName\":\"sheetsTosheets_thumbnails\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"user_credentials\":{\"dbName\":null,\"fields\":[{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_first_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_last_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_phone_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individuals\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"individuals\",\"relationName\":\"individualsTouser_credentials\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"videos\":{\"dbName\":null,\"fields\":[{\"name\":\"video_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_thumbnail_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_views\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_date_posted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"'2000-01-01 01:01:01'\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesTovideos\",\"relationFromFields\":[\"video_creator_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos_data\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos_data\",\"relationName\":\"videosTovideos_data\",\"relationFromFields\":[\"video_data_id\"],\"relationToFields\":[\"video_data_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos_thumbnails\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos_thumbnails\",\"relationName\":\"videosTovideos_thumbnails\",\"relationFromFields\":[\"video_thumbnail_id\"],\"relationToFields\":[\"video_thumbnail_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"videos_data\":{\"dbName\":null,\"fields\":[{\"name\":\"video_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos\",\"relationName\":\"videosTovideos_data\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"videos_thumbnails\":{\"dbName\":null,\"fields\":[{\"name\":\"video_thumbnail_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_thumbnail_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_thumbnail_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos\",\"relationName\":\"videosTovideos_thumbnails\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "query_engine-windows.dll.node");
path.join(process.cwd(), "generated/query_engine-windows.dll.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "generated/schema.prisma")
