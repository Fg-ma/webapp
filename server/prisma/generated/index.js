
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
 * Prisma Client JS version: 5.9.1
 * Query Engine version: 23fdc5965b1e05fc54e5f26ed3de66776b93de64
 */
Prisma.prismaVersion = {
  client: "5.9.1",
  engine: "23fdc5965b1e05fc54e5f26ed3de66776b93de64"
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
  "clientVersion": "5.9.1",
  "engineVersion": "23fdc5965b1e05fc54e5f26ed3de66776b93de64",
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
  "inlineSchema": "Z2VuZXJhdG9yIGNsaWVudCB7CiAgcHJvdmlkZXIgPSAicHJpc21hLWNsaWVudC1qcyIKICBvdXRwdXQgICA9ICIuL2dlbmVyYXRlZCIKfQoKZGF0YXNvdXJjZSBkYiB7CiAgcHJvdmlkZXIgPSAibXlzcWwiCiAgdXJsICAgICAgPSBlbnYoIkRBVEFCQVNFX1VSTCIpCn0KCm1vZGVsIGFmZmlsaWF0ZXNfcmVsYXRpb25zIHsKICBhZmZpbGlhdGVfcmVsYXRpb25faWQgICBTdHJpbmcgICBAaWQgQHVuaXF1ZShtYXA6ICJhZmZpbGlhdGVfcmVsYXRpb25faWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgYWZmaWxpYXRlX2lkX3Jvb3QgICAgICAgU3RyaW5nICAgQGRiLkNoYXIoMzYpCiAgYWZmaWxpYXRlX2lkX3RhcmdldCAgICAgU3RyaW5nICAgQGRiLkNoYXIoMzYpCiAgYWZmaWxpYXRlX3JlbGF0aW9uX2RhdGUgRGF0ZVRpbWUgQGRlZmF1bHQoZGJnZW5lcmF0ZWQoIicyMDAwLTAxLTAxIDAwOjAwOjAwJyIpKSBAZGIuVGltZXN0YW1wKDApCgogIEBAdW5pcXVlKFthZmZpbGlhdGVfaWRfcm9vdCwgYWZmaWxpYXRlX2lkX3RhcmdldF0sIG1hcDogInVuaXF1ZV9hZmZpbGlhdGVfY29tYmluYXRpb24iKQp9Cgptb2RlbCBjb2xsZWN0aW9ucyB7CiAgY29sbGVjdGlvbl9pZCAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgQGlkIEB1bmlxdWUobWFwOiAiY29sbGVjdGlvbl9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBjb2xsZWN0aW9uX25hbWUgICAgIFN0cmluZyAgICAgICAgICAgICAgICBAZGIuVmFyQ2hhcigyNTYpCiAgZW50aXR5X2lkICAgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgQGRiLkNoYXIoMzYpCiAgZW50aXRpZXMgICAgICAgICAgICBlbnRpdGllcyAgICAgICAgICAgICAgQHJlbGF0aW9uKGZpZWxkczogW2VudGl0eV9pZF0sIHJlZmVyZW5jZXM6IFtlbnRpdHlfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiY29sbGVjdGlvbnNfZW50aXR5X2lkX2ZrIikKICBjb2xsZWN0aW9uc19jb250ZW50IGNvbGxlY3Rpb25zX2NvbnRlbnRbXQoKICBAQGluZGV4KFtlbnRpdHlfaWRdLCBtYXA6ICJjb2xsZWN0aW9uc19lbnRpdHlfaWRfZmtfaWR4IikKfQoKbW9kZWwgY29sbGVjdGlvbnNfY29udGVudCB7CiAgY29sbGVjdGlvbnNfY29udGVudF9pZCBTdHJpbmcgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJjb2xsZWN0aW9uc19jb250ZW50X2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGNvbGxlY3Rpb25faWQgICAgICAgICAgU3RyaW5nICAgICAgQGRiLkNoYXIoMzYpCiAgY29udGVudF9pZCAgICAgICAgICAgICBTdHJpbmcgICAgICBAZGIuQ2hhcigzNikKICBkYXRlX2FkZGVkICAgICAgICAgICAgIERhdGVUaW1lICAgIEBkYi5UaW1lc3RhbXAoMCkKICBwaW5uZWQgICAgICAgICAgICAgICAgIEJvb2xlYW4KICBkYXRlX3Bpbm5lZCAgICAgICAgICAgIERhdGVUaW1lPyAgIEBkYi5UaW1lc3RhbXAoMCkKICBjb2xsZWN0aW9ucyAgICAgICAgICAgIGNvbGxlY3Rpb25zIEByZWxhdGlvbihmaWVsZHM6IFtjb2xsZWN0aW9uX2lkXSwgcmVmZXJlbmNlczogW2NvbGxlY3Rpb25faWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiY29sbGVjdGlvbnNfY29udGVudF9jb2xsZWN0aW9uX2lkX2ZrIikKICBjb250ZW50ICAgICAgICAgICAgICAgIGNvbnRlbnQgICAgIEByZWxhdGlvbihmaWVsZHM6IFtjb250ZW50X2lkXSwgcmVmZXJlbmNlczogW2NvbnRlbnRfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiY29sbGVjdGlvbnNfY29udGVudF9jb250ZW50X2lkX2ZrIikKCiAgQEBpbmRleChbY29sbGVjdGlvbl9pZF0sIG1hcDogImNvbGxlY3Rpb25zX2NvbnRlbnRfY29sbGVjdGlvbl9pZF9ma19pZHgiKQogIEBAaW5kZXgoW2NvbnRlbnRfaWRdLCBtYXA6ICJjb2xsZWN0aW9uc19jb250ZW50X2NvbnRlbnRfaWRfZmtfaWR4IikKfQoKbW9kZWwgY29udGVudCB7CiAgY29udGVudF9pZCAgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgQGlkIEB1bmlxdWUobWFwOiAibWVkaWFfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgY29udGVudF90eXBlICAgICAgICBJbnQ/CiAgY29sbGVjdGlvbnNfY29udGVudCBjb2xsZWN0aW9uc19jb250ZW50W10KICBlbnRpdGllc19jb250ZW50ICAgIGVudGl0aWVzX2NvbnRlbnRbXQogIGVudGl0aWVzX2Rpc2xpa2VzICAgZW50aXRpZXNfZGlzbGlrZXNbXQogIGVudGl0aWVzX2xpa2VzICAgICAgZW50aXRpZXNfbGlrZXNbXQp9Cgptb2RlbCBlbnRpdGllcyB7CiAgZW50aXR5X2lkICAgICAgICAgICAgIFN0cmluZyAgICAgICAgICAgICAgICAgIEBpZCBAdW5pcXVlKG1hcDogImVudGl0eV9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBlbnRpdHlfdHlwZSAgICAgICAgICAgSW50ICAgICAgICAgICAgICAgICAgICAgQGRlZmF1bHQoMCkKICBjb2xsZWN0aW9ucyAgICAgICAgICAgY29sbGVjdGlvbnNbXQogIGVudGl0aWVzX2NvbnRlbnQgICAgICBlbnRpdGllc19jb250ZW50W10KICBlbnRpdGllc19kaXNsaWtlcyAgICAgZW50aXRpZXNfZGlzbGlrZXNbXQogIGVudGl0aWVzX2xpa2VzICAgICAgICBlbnRpdGllc19saWtlc1tdCiAgZW50aXRpZXNfcmVmZXJlbmNlcyAgIGVudGl0aWVzX3JlZmVyZW5jZXNbXQogIGdyb3Vwc19tZW1iZXJzICAgICAgICBncm91cHNfbWVtYmVyc1tdCiAgaW1hZ2VzICAgICAgICAgICAgICAgIGltYWdlc1tdCiAgb3JnYW5pemF0aW9uc19tZW1iZXJzIG9yZ2FuaXphdGlvbnNfbWVtYmVyc1tdCiAgc2hlZXRzICAgICAgICAgICAgICAgIHNoZWV0c1tdCiAgdmlkZW9zICAgICAgICAgICAgICAgIHZpZGVvc1tdCn0KCm1vZGVsIGVudGl0aWVzX2NvbnRlbnQgewogIGVudGl0aWVzX2NvbnRlbnRfaWQgU3RyaW5nICAgIEBpZCBAdW5pcXVlKG1hcDogImVudGl0aWVzX2NvbnRlbnRfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgZW50aXR5X2lkICAgICAgICAgICBTdHJpbmcgICAgQGRiLkNoYXIoMzYpCiAgY29udGVudF9pZCAgICAgICAgICBTdHJpbmcgICAgQGRiLkNoYXIoMzYpCiAgZGF0ZV9hZGRlZCAgICAgICAgICBEYXRlVGltZSAgQGRiLlRpbWVzdGFtcCgwKQogIHBpbm5lZCAgICAgICAgICAgICAgQm9vbGVhbgogIGRhdGVfcGlubmVkICAgICAgICAgRGF0ZVRpbWU/IEBkYi5UaW1lc3RhbXAoMCkKICBjb250ZW50ICAgICAgICAgICAgIGNvbnRlbnQgICBAcmVsYXRpb24oZmllbGRzOiBbY29udGVudF9pZF0sIHJlZmVyZW5jZXM6IFtjb250ZW50X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImVudGl0aWVzX2NvbnRlbnRfY29udGVudF9pZCIpCiAgZW50aXRpZXMgICAgICAgICAgICBlbnRpdGllcyAgQHJlbGF0aW9uKGZpZWxkczogW2VudGl0eV9pZF0sIHJlZmVyZW5jZXM6IFtlbnRpdHlfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiZW50aXRpZXNfY29udGVudF9lbnRpdHlfaWQiKQoKICBAQGluZGV4KFtjb250ZW50X2lkXSkKICBAQGluZGV4KFtlbnRpdHlfaWRdKQp9Cgptb2RlbCBlbnRpdGllc19kaXNsaWtlcyB7CiAgZGlzbGlrZV9pZCBTdHJpbmcgICBAaWQgQHVuaXF1ZShtYXA6ICJkaXNsaWtlX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGVudGl0eV9pZCAgU3RyaW5nICAgQGRiLkNoYXIoMzYpCiAgY29udGVudF9pZCBTdHJpbmcgICBAZGIuQ2hhcigzNikKICBjb250ZW50ICAgIGNvbnRlbnQgIEByZWxhdGlvbihmaWVsZHM6IFtjb250ZW50X2lkXSwgcmVmZXJlbmNlczogW2NvbnRlbnRfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiZW50aXRpZXNfZGlzbGlrZXNfY29udGVudF9pZF9mayIpCiAgZW50aXRpZXMgICBlbnRpdGllcyBAcmVsYXRpb24oZmllbGRzOiBbZW50aXR5X2lkXSwgcmVmZXJlbmNlczogW2VudGl0eV9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJlbnRpdGllc19kaXNsaWtlc19lbnRpdHlfaWRfZmsiKQoKICBAQHVuaXF1ZShbZW50aXR5X2lkLCBjb250ZW50X2lkXSwgbWFwOiAiZW50aXRpZXNfZGlzbGlrZXNfdW5pcXVlX2NvbWJpbmF0aW9uIikKICBAQGluZGV4KFtjb250ZW50X2lkXSwgbWFwOiAiZW50aXRpZXNfZGlzbGlrZXNfY29udGVudF9pZF9ma19pZHgiKQp9Cgptb2RlbCBlbnRpdGllc19saWtlcyB7CiAgbGlrZV9pZCAgICBTdHJpbmcgICBAaWQgQHVuaXF1ZShtYXA6ICJsaWtlX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGVudGl0eV9pZCAgU3RyaW5nICAgQGRiLkNoYXIoMzYpCiAgY29udGVudF9pZCBTdHJpbmcgICBAZGIuQ2hhcigzNikKICBjb250ZW50ICAgIGNvbnRlbnQgIEByZWxhdGlvbihmaWVsZHM6IFtjb250ZW50X2lkXSwgcmVmZXJlbmNlczogW2NvbnRlbnRfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiZW50aXRpZXNfbGlrZXNfY29udGVudF9pZF9mayIpCiAgZW50aXRpZXMgICBlbnRpdGllcyBAcmVsYXRpb24oZmllbGRzOiBbZW50aXR5X2lkXSwgcmVmZXJlbmNlczogW2VudGl0eV9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJlbnRpdGllc19saWtlc19lbnRpdHlfaWRfZmsiKQoKICBAQHVuaXF1ZShbZW50aXR5X2lkLCBjb250ZW50X2lkXSwgbWFwOiAiZW50aXRpZXNfbGlrZXNfdW5pcXVlX2NvbWJpbmF0aW9uIikKICBAQGluZGV4KFtjb250ZW50X2lkXSwgbWFwOiAiZW50aXRpZXNfbGlrZXNfY29udGVudF9pZF9ma19pZHgiKQogIEBAaW5kZXgoW2VudGl0eV9pZF0sIG1hcDogImVudGl0aWVzX2xpa2VzX2VudGl0eV9pZF9ma19pZHgiKQp9Cgptb2RlbCBlbnRpdGllc19yZWZlcmVuY2VzIHsKICByZWZlcmVuY2VfaWQgU3RyaW5nICAgQGlkIEB1bmlxdWUobWFwOiAicmVmZXJlbmNlX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGVudGl0eV9pZCAgICBTdHJpbmcgICBAZGIuQ2hhcigzNikKICB0aXRsZSAgICAgICAgU3RyaW5nICAgQGRiLlZhckNoYXIoMjU2KQogIGF1dGhvciAgICAgICBTdHJpbmcgICBAZGIuVmFyQ2hhcigyNTYpCiAgdXJsICAgICAgICAgIFN0cmluZyAgIEBkYi5WYXJDaGFyKDI1NikKICBlbnRpdGllcyAgICAgZW50aXRpZXMgQHJlbGF0aW9uKGZpZWxkczogW2VudGl0eV9pZF0sIHJlZmVyZW5jZXM6IFtlbnRpdHlfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiZW50aXRpZXNfcmVmZXJlbmNlc19lbnRpdHlfaWRfZmsiKQoKICBAQGluZGV4KFtlbnRpdHlfaWRdLCBtYXA6ICJlbnRpdGllc19yZWZlcmVuY2VzX2VudGl0eV9pZF9ma19pZHgiKQp9Cgptb2RlbCBncm91cHMgewogIGdyb3VwX2lkICAgICAgICAgICBTdHJpbmcgICAgICAgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJncm91cF9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBncm91cF9oYW5kbGUgICAgICAgU3RyaW5nICAgICAgICAgICAgQHVuaXF1ZShtYXA6ICJncm91cF9oYW5kbGVfVU5JUVVFIikgQGRiLlZhckNoYXIoMjU2KQogIGdyb3VwX25hbWUgICAgICAgICBTdHJpbmcgICAgICAgICAgICBAZGIuVmFyQ2hhcigyNTYpCiAgZ3JvdXBfY3VycmVudElzc3VlIFN0cmluZz8gICAgICAgICAgIEBkYi5UZXh0CiAgZ3JvdXBfc3RhbmNlcyAgICAgIFN0cmluZz8gICAgICAgICAgIEBkYi5UZXh0CiAgZ3JvdXBfZGVzY3JpcHRpb24gIFN0cmluZz8gICAgICAgICAgIEBkYi5UZXh0CiAgcHJvZmlsZV9waWN0dXJlX2lkIFN0cmluZz8gICAgICAgICAgIEBkYi5DaGFyKDM2KQogIHByb2ZpbGVfcGljdHVyZXMgICBwcm9maWxlX3BpY3R1cmVzPyBAcmVsYXRpb24oZmllbGRzOiBbcHJvZmlsZV9waWN0dXJlX2lkXSwgcmVmZXJlbmNlczogW3Byb2ZpbGVfcGljdHVyZV9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJncm91cHNfcHJvZmlsZV9waWN0dXJlX2lkX2ZrIikKICBncm91cHNfbWVtYmVycyAgICAgZ3JvdXBzX21lbWJlcnNbXQoKICBAQGluZGV4KFtwcm9maWxlX3BpY3R1cmVfaWRdLCBtYXA6ICJncm91cHNfcHJvZmlsZV9waWN0dXJlX2lkX2ZrX2lkeCIpCn0KCm1vZGVsIGdyb3Vwc19tZW1iZXJzIHsKICBncm91cHNfbWVtYmVyc19pZCBTdHJpbmcgICBAaWQgQHVuaXF1ZShtYXA6ICJncm91cHNfbWVtYmVyc19pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBncm91cF9pZCAgICAgICAgICBTdHJpbmcgICBAZGIuQ2hhcigzNikKICBlbnRpdHlfaWQgICAgICAgICBTdHJpbmcgICBAZGIuQ2hhcigzNikKICBlbnRpdGllcyAgICAgICAgICBlbnRpdGllcyBAcmVsYXRpb24oZmllbGRzOiBbZW50aXR5X2lkXSwgcmVmZXJlbmNlczogW2VudGl0eV9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJncm91cHNfbWVtYmVyc19lbnRpdHlfaWRfZmsiKQogIGdyb3VwcyAgICAgICAgICAgIGdyb3VwcyAgIEByZWxhdGlvbihmaWVsZHM6IFtncm91cF9pZF0sIHJlZmVyZW5jZXM6IFtncm91cF9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJncm91cHNfbWVtYmVyc19ncm91cF9pZF9mayIpCgogIEBAdW5pcXVlKFtncm91cF9pZCwgZW50aXR5X2lkXSwgbWFwOiAidW5pcXVlX2dyb3VwX21lbWJlcl9jb21iaW5hdGlvbiIpCiAgQEBpbmRleChbZW50aXR5X2lkXSwgbWFwOiAiZ3JvdXBzX21lbWJlcnNfZW50aXR5X2lkX2ZrIikKICBAQGluZGV4KFtncm91cF9pZF0sIG1hcDogImdyb3Vwc19tZW1iZXJzX2dyb3VwX2lkX2ZrX2lkeCIpCn0KCm1vZGVsIGltYWdlcyB7CiAgaW1hZ2VfaWQgICAgICAgICAgU3RyaW5nICAgICAgQGlkIEB1bmlxdWUobWFwOiAiaW1hZ2VfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgaW1hZ2VfY3JlYXRvcl9pZCAgU3RyaW5nICAgICAgQGRiLkNoYXIoMzYpCiAgaW1hZ2VfdGl0bGUgICAgICAgU3RyaW5nICAgICAgQGRiLlZhckNoYXIoMjU2KQogIGltYWdlX2Rlc2NyaXB0aW9uIFN0cmluZyAgICAgIEBkYi5UZXh0CiAgaW1hZ2VfZmlsZW5hbWUgICAgU3RyaW5nICAgICAgQGRiLlZhckNoYXIoMjU2KQogIGltYWdlX2RhdGFfaWQgICAgIFN0cmluZyAgICAgIEBkYi5DaGFyKDM2KQogIGltYWdlX2xpa2VzICAgICAgIEludCAgICAgICAgIEBkZWZhdWx0KDApCiAgaW1hZ2VfZGlzbGlrZXMgICAgSW50ICAgICAgICAgQGRlZmF1bHQoMCkKICBpbWFnZV92aWV3cyAgICAgICBJbnQgICAgICAgICBAZGVmYXVsdCgwKQogIGltYWdlX2RhdGVfcG9zdGVkIERhdGVUaW1lICAgIEBkZWZhdWx0KGRiZ2VuZXJhdGVkKCInMjAwMC0wMS0wMSAwMTowMTowMSciKSkgQGRiLlRpbWVzdGFtcCgwKQogIGVudGl0aWVzICAgICAgICAgIGVudGl0aWVzICAgIEByZWxhdGlvbihmaWVsZHM6IFtpbWFnZV9jcmVhdG9yX2lkXSwgcmVmZXJlbmNlczogW2VudGl0eV9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJpbWFnZXNfaW1hZ2VfY3JlYXRvcl9pZF9mayIpCiAgaW1hZ2VzX2RhdGEgICAgICAgaW1hZ2VzX2RhdGEgQHJlbGF0aW9uKGZpZWxkczogW2ltYWdlX2RhdGFfaWRdLCByZWZlcmVuY2VzOiBbaW1hZ2VfZGF0YV9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJpbWFnZXNfaW1hZ2VfZGF0YV9pZF9mayIpCgogIEBAaW5kZXgoW2ltYWdlX2NyZWF0b3JfaWRdLCBtYXA6ICJpbWFnZXNfaW1hZ2VfY3JlYXRvcl9pZF9ma19pZHgiKQogIEBAaW5kZXgoW2ltYWdlX2RhdGFfaWRdLCBtYXA6ICJpbWFnZXNfaW1hZ2VfZGF0YV9pZF9ma19pZHgiKQp9Cgptb2RlbCBpbWFnZXNfZGF0YSB7CiAgaW1hZ2VfZGF0YV9pZCBTdHJpbmcgICBAaWQgQHVuaXF1ZShtYXA6ICJpbWFnZV9kYXRhX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGltYWdlX2RhdGEgICAgQnl0ZXMKICBpbWFnZXMgICAgICAgIGltYWdlc1tdCn0KCm1vZGVsIGluZGl2aWR1YWxzIHsKICBpbmRpdmlkdWFsX2lkICAgICAgICAgICBTdHJpbmcgICAgICAgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJpbmRpdmlkdWFsX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGluZGl2aWR1YWxfdXNlcm5hbWUgICAgIFN0cmluZyAgICAgICAgICAgIEB1bmlxdWUobWFwOiAidXNlck5hbWVfVU5JUVVFIikgQGRiLlZhckNoYXIoMjU2KQogIGluZGl2aWR1YWxfbmFtZSAgICAgICAgIFN0cmluZyAgICAgICAgICAgIEBkYi5WYXJDaGFyKDI1NikKICBpbmRpdmlkdWFsX2N1cnJlbnRJc3N1ZSBTdHJpbmc/ICAgICAgICAgICBAZGIuVGV4dAogIGluZGl2aWR1YWxfcm9sZXMgICAgICAgIFN0cmluZz8gICAgICAgICAgIEBkYi5UZXh0CiAgaW5kaXZpZHVhbF9kZXNjcmlwdGlvbiAgU3RyaW5nPyAgICAgICAgICAgQGRiLlRleHQKICBwcm9maWxlX3BpY3R1cmVfaWQgICAgICBTdHJpbmc/ICAgICAgICAgICBAZGIuQ2hhcigzNikKICB1c2VyX2NyZWRlbnRpYWxzICAgICAgICB1c2VyX2NyZWRlbnRpYWxzICBAcmVsYXRpb24oZmllbGRzOiBbaW5kaXZpZHVhbF9pZF0sIHJlZmVyZW5jZXM6IFt1c2VyX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImluZGl2aWR1YWxzX2luZGl2aWR1YWxfaWRfZmsiKQogIHByb2ZpbGVfcGljdHVyZXMgICAgICAgIHByb2ZpbGVfcGljdHVyZXM/IEByZWxhdGlvbihmaWVsZHM6IFtwcm9maWxlX3BpY3R1cmVfaWRdLCByZWZlcmVuY2VzOiBbcHJvZmlsZV9waWN0dXJlX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImluZGl2aWR1YWxzX3Byb2ZpbGVfcGljdHVyZV9pZF9mayIpCgogIEBAaW5kZXgoW3Byb2ZpbGVfcGljdHVyZV9pZF0sIG1hcDogImluZGl2aWR1YWxzX3Byb2ZpbGVfcGljdHVyZV9pZF9ma19pZHgiKQp9Cgptb2RlbCBvcmdhbml6YXRpb25zIHsKICBvcmdhbml6YXRpb25faWQgICAgICAgICAgIFN0cmluZyAgICAgICAgICAgICAgICAgIEBpZCBAdW5pcXVlKG1hcDogIm9yZ2FuaXphdGlvbl9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBvcmdhbml6YXRpb25faGFuZGxlICAgICAgIFN0cmluZyAgICAgICAgICAgICAgICAgIEB1bmlxdWUobWFwOiAib3JnYW5pemF0aW9uX2hhbmRsZV9VTklRVUUiKSBAZGIuVmFyQ2hhcigyNTYpCiAgb3JnYW5pemF0aW9uX25hbWUgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgICBAZGIuVmFyQ2hhcigyNTYpCiAgb3JnYW5pemF0aW9uX2N1cnJlbnRJc3N1ZSBTdHJpbmc/ICAgICAgICAgICAgICAgICBAZGIuVGV4dAogIG9yZ2FuaXphdGlvbl9zdGFuY2VzICAgICAgU3RyaW5nPyAgICAgICAgICAgICAgICAgQGRiLlRleHQKICBvcmdhbml6YXRpb25fZGVzY3JpcHRpb24gIFN0cmluZz8gICAgICAgICAgICAgICAgIEBkYi5UZXh0CiAgcHJvZmlsZV9waWN0dXJlX2lkICAgICAgICBTdHJpbmc/ICAgICAgICAgICAgICAgICBAZGIuQ2hhcigzNikKICBwcm9maWxlX3BpY3R1cmVzICAgICAgICAgIHByb2ZpbGVfcGljdHVyZXM/ICAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtwcm9maWxlX3BpY3R1cmVfaWRdLCByZWZlcmVuY2VzOiBbcHJvZmlsZV9waWN0dXJlX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogIm9yZ2FuaXphdGlvbnNfcHJvZmlsZV9waWN0dXJlX2lkIikKICBvcmdhbml6YXRpb25zX21lbWJlcnMgICAgIG9yZ2FuaXphdGlvbnNfbWVtYmVyc1tdCgogIEBAaW5kZXgoW3Byb2ZpbGVfcGljdHVyZV9pZF0pCn0KCm1vZGVsIG9yZ2FuaXphdGlvbnNfbWVtYmVycyB7CiAgb3JnYW5pemF0aW9uc19tZW1iZXJzX2lkIFN0cmluZyAgICAgICAgQGlkIEB1bmlxdWUobWFwOiAib3JnYW5pemF0aW9uc19tZW1iZXJzX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIG9yZ2FuaXphdGlvbl9pZCAgICAgICAgICBTdHJpbmcgICAgICAgIEBkYi5DaGFyKDM2KQogIGVudGl0eV9pZCAgICAgICAgICAgICAgICBTdHJpbmcgICAgICAgIEBkYi5DaGFyKDM2KQogIGVudGl0aWVzICAgICAgICAgICAgICAgICBlbnRpdGllcyAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtlbnRpdHlfaWRdLCByZWZlcmVuY2VzOiBbZW50aXR5X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogIm9yZ2FuaXphdGlvbnNfbWVtYmVyc19lbnRpdHlfaWRfZmsiKQogIG9yZ2FuaXphdGlvbnMgICAgICAgICAgICBvcmdhbml6YXRpb25zIEByZWxhdGlvbihmaWVsZHM6IFtvcmdhbml6YXRpb25faWRdLCByZWZlcmVuY2VzOiBbb3JnYW5pemF0aW9uX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogIm9yZ2FuaXphdGlvbnNfbWVtYmVyc19vcmdhbml6YXRpb25faWRfZmsiKQoKICBAQGluZGV4KFtlbnRpdHlfaWRdLCBtYXA6ICJvcmdhbml6YXRpb25zX21lbWJlcnNfZW50aXR5X2lkX2ZrX2lkeCIpCiAgQEBpbmRleChbb3JnYW5pemF0aW9uX2lkXSwgbWFwOiAib3JnYW5pemF0aW9uc19tZW1iZXJzX29yZ2FuaXphdGlvbl9pZF9ma19pZHgiKQp9Cgptb2RlbCBwcm9maWxlX3BpY3R1cmVzIHsKICBwcm9maWxlX3BpY3R1cmVfaWQgICAgICAgU3RyaW5nICAgICAgICAgIEBpZCBAdW5pcXVlKG1hcDogInByb2ZpbGVfcGljdHVyZV9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBwcm9maWxlX3BpY3R1cmVfZGF0YSAgICAgQnl0ZXMKICBwcm9maWxlX3BpY3R1cmVfZmlsZW5hbWUgU3RyaW5nPyAgICAgICAgIEBkYi5WYXJDaGFyKDI1NikKICBncm91cHMgICAgICAgICAgICAgICAgICAgZ3JvdXBzW10KICBpbmRpdmlkdWFscyAgICAgICAgICAgICAgaW5kaXZpZHVhbHNbXQogIG9yZ2FuaXphdGlvbnMgICAgICAgICAgICBvcmdhbml6YXRpb25zW10KfQoKbW9kZWwgc2hlZXRzIHsKICBzaGVldF9pZCAgICAgICAgICAgU3RyaW5nICAgICAgICAgICAgIEBpZCBAdW5pcXVlKG1hcDogInNoZWV0X2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIHNoZWV0X2F1dGhvcl9pZCAgICBTdHJpbmcgICAgICAgICAgICAgQGRiLkNoYXIoMzYpCiAgc2hlZXRfdGl0bGUgICAgICAgIFN0cmluZyAgICAgICAgICAgICBAZGIuVmFyQ2hhcigyNTYpCiAgc2hlZXRfc3ViamVjdCAgICAgIFN0cmluZyAgICAgICAgICAgICBAZGIuVGV4dAogIHNoZWV0X2ZpbGVuYW1lICAgICBTdHJpbmcgICAgICAgICAgICAgQGRiLlZhckNoYXIoMjU2KQogIHNoZWV0X2RhdGFfaWQgICAgICBTdHJpbmcgICAgICAgICAgICAgQGRiLkNoYXIoMzYpCiAgc2hlZXRfdGh1bWJuYWlsX2lkIFN0cmluZz8gICAgICAgICAgICBAZGIuQ2hhcigzNikKICBzaGVldF9saWtlcyAgICAgICAgSW50ICAgICAgICAgICAgICAgIEBkZWZhdWx0KDApCiAgc2hlZXRfZGlzbGlrZXMgICAgIEludCAgICAgICAgICAgICAgICBAZGVmYXVsdCgwKQogIHNoZWV0X3ZpZXdzICAgICAgICBJbnQgICAgICAgICAgICAgICAgQGRlZmF1bHQoMCkKICBzaGVldF9kYXRlX3Bvc3RlZCAgRGF0ZVRpbWUgICAgICAgICAgIEBkZWZhdWx0KGRiZ2VuZXJhdGVkKCInMjAwMC0wMS0wMSAwMTowMTowMSciKSkgQGRiLlRpbWVzdGFtcCgwKQogIGVudGl0aWVzICAgICAgICAgICBlbnRpdGllcyAgICAgICAgICAgQHJlbGF0aW9uKGZpZWxkczogW3NoZWV0X2F1dGhvcl9pZF0sIHJlZmVyZW5jZXM6IFtlbnRpdHlfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAic2hlZXRzX3NoZWV0X2F1dGhvcl9pZF9mayIpCiAgc2hlZXRzX2RhdGEgICAgICAgIHNoZWV0c19kYXRhICAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbc2hlZXRfZGF0YV9pZF0sIHJlZmVyZW5jZXM6IFtzaGVldF9kYXRhX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogInNoZWV0c19zaGVldF9kYXRhX2lkX2ZrIikKICBzaGVldHNfdGh1bWJuYWlscyAgc2hlZXRzX3RodW1ibmFpbHM/IEByZWxhdGlvbihmaWVsZHM6IFtzaGVldF90aHVtYm5haWxfaWRdLCByZWZlcmVuY2VzOiBbc2hlZXRfdGh1bWJuYWlsX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogInNoZWV0c19zaGVldF90aHVtYm5haWxfaWQiKQoKICBAQGluZGV4KFtzaGVldF9kYXRhX2lkXSwgbWFwOiAiU2hlZXRzX3NoZWV0X2RhdGFfaWRfZmtfaWR4IikKICBAQGluZGV4KFtzaGVldF9hdXRob3JfaWRdLCBtYXA6ICJzaGVldHNfc2hlZXRfYXV0aG9yX2lkX2ZrX2lkeCIpCiAgQEBpbmRleChbc2hlZXRfdGh1bWJuYWlsX2lkXSwgbWFwOiAic2hlZXRzX3NoZWV0X3R1bWJuYWlsX2lkX2lkeCIpCn0KCm1vZGVsIHNoZWV0c19kYXRhIHsKICBzaGVldF9kYXRhX2lkIFN0cmluZyAgIEBpZCBAdW5pcXVlKG1hcDogInNoZWV0X2RhdGFfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgc2hlZXRfZGF0YSAgICBCeXRlcwogIHNoZWV0cyAgICAgICAgc2hlZXRzW10KfQoKbW9kZWwgc2hlZXRzX3RodW1ibmFpbHMgewogIHNoZWV0X3RodW1ibmFpbF9pZCAgICAgICBTdHJpbmcgICBAaWQgQHVuaXF1ZShtYXA6ICJzaGVldF90aHVtYm5haWxfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgc2hlZXRfdGh1bWJuYWlsX2RhdGEgICAgIEJ5dGVzCiAgc2hlZXRfdGh1bWJuYWlsX2ZpbGVuYW1lIFN0cmluZyAgIEBkYi5WYXJDaGFyKDI2NSkKICBzaGVldHMgICAgICAgICAgICAgICAgICAgc2hlZXRzW10KfQoKbW9kZWwgdXNlcl9jcmVkZW50aWFscyB7CiAgdXNlcl9pZCAgICAgICAgICAgU3RyaW5nICAgICAgIEBpZCBAdW5pcXVlKG1hcDogInVzZXJfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgdXNlcm5hbWUgICAgICAgICAgU3RyaW5nICAgICAgIEB1bmlxdWUobWFwOiAidXNlcm5hbWVfVU5JUVVFIikgQGRiLlZhckNoYXIoMTI4KQogIHVzZXJfcGFzc3dvcmQgICAgIFN0cmluZyAgICAgICBAZGIuVmFyQ2hhcigxMjgpCiAgdXNlcl9maXJzdF9uYW1lICAgU3RyaW5nPyAgICAgIEBkYi5WYXJDaGFyKDEyOCkKICB1c2VyX2xhc3RfbmFtZSAgICBTdHJpbmc/ICAgICAgQGRiLlZhckNoYXIoMTI4KQogIHVzZXJfZW1haWwgICAgICAgIFN0cmluZz8gICAgICBAZGIuVmFyQ2hhcigxMjgpCiAgdXNlcl9waG9uZV9udW1iZXIgU3RyaW5nPyAgICAgIEBkYi5WYXJDaGFyKDE1KQogIGluZGl2aWR1YWxzICAgICAgIGluZGl2aWR1YWxzPwp9Cgptb2RlbCB2aWRlb3MgewogIHZpZGVvX2lkICAgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgQGlkIEB1bmlxdWUobWFwOiAidmlkZW9faWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgdmlkZW9fY3JlYXRvcl9pZCAgIFN0cmluZyAgICAgICAgICAgICBAZGIuQ2hhcigzNikKICB2aWRlb190aXRsZSAgICAgICAgU3RyaW5nICAgICAgICAgICAgIEBkYi5WYXJDaGFyKDI1NikKICB2aWRlb19kZXNjcmlwdGlvbiAgU3RyaW5nICAgICAgICAgICAgIEBkYi5UZXh0CiAgdmlkZW9fZmlsZW5hbWUgICAgIFN0cmluZyAgICAgICAgICAgICBAZGIuVmFyQ2hhcigyNTYpCiAgdmlkZW9fZGF0YV9pZCAgICAgIFN0cmluZyAgICAgICAgICAgICBAZGIuQ2hhcigzNikKICB2aWRlb190aHVtYm5haWxfaWQgU3RyaW5nPyAgICAgICAgICAgIEBkYi5DaGFyKDM2KQogIHZpZGVvX2xpa2VzICAgICAgICBJbnQgICAgICAgICAgICAgICAgQGRlZmF1bHQoMCkKICB2aWRlb19kaXNsaWtlcyAgICAgSW50ICAgICAgICAgICAgICAgIEBkZWZhdWx0KDApCiAgdmlkZW9fdmlld3MgICAgICAgIEludCAgICAgICAgICAgICAgICBAZGVmYXVsdCgwKQogIHZpZGVvX2RhdGVfcG9zdGVkICBEYXRlVGltZT8gICAgICAgICAgQGRlZmF1bHQoZGJnZW5lcmF0ZWQoIicyMDAwLTAxLTAxIDAxOjAxOjAxJyIpKSBAZGIuVGltZXN0YW1wKDApCiAgZW50aXRpZXMgICAgICAgICAgIGVudGl0aWVzICAgICAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbdmlkZW9fY3JlYXRvcl9pZF0sIHJlZmVyZW5jZXM6IFtlbnRpdHlfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAidmlkZW9zX3ZpZGVvX2NyZWF0b3JfaWRfZmsiKQogIHZpZGVvc19kYXRhICAgICAgICB2aWRlb3NfZGF0YSAgICAgICAgQHJlbGF0aW9uKGZpZWxkczogW3ZpZGVvX2RhdGFfaWRdLCByZWZlcmVuY2VzOiBbdmlkZW9fZGF0YV9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJ2aWRlb3NfdmlkZW9fZGF0YV9pZF9mayIpCiAgdmlkZW9zX3RodW1ibmFpbHMgIHZpZGVvc190aHVtYm5haWxzPyBAcmVsYXRpb24oZmllbGRzOiBbdmlkZW9fdGh1bWJuYWlsX2lkXSwgcmVmZXJlbmNlczogW3ZpZGVvX3RodW1ibmFpbF9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJ2aWRlb3NfdmlkZW9fdGh1bWJuYWlsX2lkX2ZrIikKCiAgQEBpbmRleChbdmlkZW9fY3JlYXRvcl9pZF0sIG1hcDogInZpZGVvc192aWRlb19jcmVhdG9yX2lkX2ZrX2lkeCIpCiAgQEBpbmRleChbdmlkZW9fZGF0YV9pZF0sIG1hcDogInZpZGVvc192aWRlb19kYXRhX2lkX2ZrX2lkeCIpCiAgQEBpbmRleChbdmlkZW9fdGh1bWJuYWlsX2lkXSwgbWFwOiAidmlkZW9zX3ZpZGVvX3RodW1ibmFpbF9pZF9ma19pZHgiKQp9Cgptb2RlbCB2aWRlb3NfZGF0YSB7CiAgdmlkZW9fZGF0YV9pZCBTdHJpbmcgICBAaWQgQHVuaXF1ZShtYXA6ICJ2aWRlb19kYXRhX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIHZpZGVvX2RhdGEgICAgQnl0ZXMKICB2aWRlb3MgICAgICAgIHZpZGVvc1tdCn0KCm1vZGVsIHZpZGVvc190aHVtYm5haWxzIHsKICB2aWRlb190aHVtYm5haWxfaWQgICAgICAgU3RyaW5nICAgQGlkIEB1bmlxdWUobWFwOiAidmlkZW9zX3RodW1ibmFpbHNfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgdmlkZW9fdGh1bWJuYWlsX2RhdGEgICAgIEJ5dGVzCiAgdmlkZW9fdGh1bWJuYWlsX2ZpbGVuYW1lIFN0cmluZyAgIEBkYi5WYXJDaGFyKDI1NikKICB2aWRlb3MgICAgICAgICAgICAgICAgICAgdmlkZW9zW10KfQo=",
  "inlineSchemaHash": "943ebae515d116a6e2a6b99da187d5a3863bd3f59c5bc2e020493c897e8148f0",
  "noEngine": false
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

config.runtimeDataModel = JSON.parse("{\"models\":{\"affiliates_relations\":{\"dbName\":null,\"fields\":[{\"name\":\"affiliate_relation_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"affiliate_id_root\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"affiliate_id_target\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"affiliate_relation_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"'2000-01-01 00:00:00'\"]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"affiliate_id_root\",\"affiliate_id_target\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"affiliate_id_root\",\"affiliate_id_target\"]}],\"isGenerated\":false},\"collections\":{\"dbName\":null,\"fields\":[{\"name\":\"collection_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collection_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"collectionsToentities\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections_content\",\"relationName\":\"collectionsTocollections_content\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"collections_content\":{\"dbName\":null,\"fields\":[{\"name\":\"collections_content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collection_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_added\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections\",\"relationName\":\"collectionsTocollections_content\",\"relationFromFields\":[\"collection_id\"],\"relationToFields\":[\"collection_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"content\",\"relationName\":\"collections_contentTocontent\",\"relationFromFields\":[\"content_id\"],\"relationToFields\":[\"content_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"content\":{\"dbName\":null,\"fields\":[{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections_content\",\"relationName\":\"collections_contentTocontent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_content\",\"relationName\":\"contentToentities_content\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_dislikes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_dislikes\",\"relationName\":\"contentToentities_dislikes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_likes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_likes\",\"relationName\":\"contentToentities_likes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities\":{\"dbName\":null,\"fields\":[{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections\",\"relationName\":\"collectionsToentities\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_content\",\"relationName\":\"entitiesToentities_content\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_dislikes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_dislikes\",\"relationName\":\"entitiesToentities_dislikes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_likes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_likes\",\"relationName\":\"entitiesToentities_likes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_references\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_references\",\"relationName\":\"entitiesToentities_references\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups_members\",\"relationName\":\"entitiesTogroups_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images\",\"relationName\":\"entitiesToimages\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations_members\",\"relationName\":\"entitiesToorganizations_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets\",\"relationName\":\"entitiesTosheets\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos\",\"relationName\":\"entitiesTovideos\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities_content\":{\"dbName\":null,\"fields\":[{\"name\":\"entities_content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_added\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"content\",\"relationName\":\"contentToentities_content\",\"relationFromFields\":[\"content_id\"],\"relationToFields\":[\"content_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_content\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities_dislikes\":{\"dbName\":null,\"fields\":[{\"name\":\"dislike_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"content\",\"relationName\":\"contentToentities_dislikes\",\"relationFromFields\":[\"content_id\"],\"relationToFields\":[\"content_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_dislikes\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"entity_id\",\"content_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"entity_id\",\"content_id\"]}],\"isGenerated\":false},\"entities_likes\":{\"dbName\":null,\"fields\":[{\"name\":\"like_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"content\",\"relationName\":\"contentToentities_likes\",\"relationFromFields\":[\"content_id\"],\"relationToFields\":[\"content_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_likes\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"entity_id\",\"content_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"entity_id\",\"content_id\"]}],\"isGenerated\":false},\"entities_references\":{\"dbName\":null,\"fields\":[{\"name\":\"reference_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"author\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_references\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"groups\":{\"dbName\":null,\"fields\":[{\"name\":\"group_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_handle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_currentIssue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_stances\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_picture_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_pictures\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"profile_pictures\",\"relationName\":\"groupsToprofile_pictures\",\"relationFromFields\":[\"profile_picture_id\"],\"relationToFields\":[\"profile_picture_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups_members\",\"relationName\":\"groupsTogroups_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"groups_members\":{\"dbName\":null,\"fields\":[{\"name\":\"groups_members_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesTogroups_members\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups\",\"relationName\":\"groupsTogroups_members\",\"relationFromFields\":[\"group_id\"],\"relationToFields\":[\"group_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"group_id\",\"entity_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"group_id\",\"entity_id\"]}],\"isGenerated\":false},\"images\":{\"dbName\":null,\"fields\":[{\"name\":\"image_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_views\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_date_posted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"'2000-01-01 01:01:01'\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToimages\",\"relationFromFields\":[\"image_creator_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images_data\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images_data\",\"relationName\":\"imagesToimages_data\",\"relationFromFields\":[\"image_data_id\"],\"relationToFields\":[\"image_data_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"images_data\":{\"dbName\":null,\"fields\":[{\"name\":\"image_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images\",\"relationName\":\"imagesToimages_data\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"individuals\":{\"dbName\":null,\"fields\":[{\"name\":\"individual_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_currentIssue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_roles\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_picture_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_credentials\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"user_credentials\",\"relationName\":\"individualsTouser_credentials\",\"relationFromFields\":[\"individual_id\"],\"relationToFields\":[\"user_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_pictures\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"profile_pictures\",\"relationName\":\"individualsToprofile_pictures\",\"relationFromFields\":[\"profile_picture_id\"],\"relationToFields\":[\"profile_picture_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"organizations\":{\"dbName\":null,\"fields\":[{\"name\":\"organization_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_handle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_currentIssue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_stances\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_picture_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_pictures\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"profile_pictures\",\"relationName\":\"organizationsToprofile_pictures\",\"relationFromFields\":[\"profile_picture_id\"],\"relationToFields\":[\"profile_picture_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations_members\",\"relationName\":\"organizationsToorganizations_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"organizations_members\":{\"dbName\":null,\"fields\":[{\"name\":\"organizations_members_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToorganizations_members\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations\",\"relationName\":\"organizationsToorganizations_members\",\"relationFromFields\":[\"organization_id\"],\"relationToFields\":[\"organization_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"profile_pictures\":{\"dbName\":null,\"fields\":[{\"name\":\"profile_picture_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_picture_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_picture_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups\",\"relationName\":\"groupsToprofile_pictures\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individuals\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"individuals\",\"relationName\":\"individualsToprofile_pictures\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations\",\"relationName\":\"organizationsToprofile_pictures\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"sheets\":{\"dbName\":null,\"fields\":[{\"name\":\"sheet_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_author_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_subject\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_thumbnail_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_views\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_date_posted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"'2000-01-01 01:01:01'\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesTosheets\",\"relationFromFields\":[\"sheet_author_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets_data\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets_data\",\"relationName\":\"sheetsTosheets_data\",\"relationFromFields\":[\"sheet_data_id\"],\"relationToFields\":[\"sheet_data_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets_thumbnails\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets_thumbnails\",\"relationName\":\"sheetsTosheets_thumbnails\",\"relationFromFields\":[\"sheet_thumbnail_id\"],\"relationToFields\":[\"sheet_thumbnail_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"sheets_data\":{\"dbName\":null,\"fields\":[{\"name\":\"sheet_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets\",\"relationName\":\"sheetsTosheets_data\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"sheets_thumbnails\":{\"dbName\":null,\"fields\":[{\"name\":\"sheet_thumbnail_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_thumbnail_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_thumbnail_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets\",\"relationName\":\"sheetsTosheets_thumbnails\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"user_credentials\":{\"dbName\":null,\"fields\":[{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_first_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_last_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_phone_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individuals\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"individuals\",\"relationName\":\"individualsTouser_credentials\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"videos\":{\"dbName\":null,\"fields\":[{\"name\":\"video_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_thumbnail_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_views\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_date_posted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"'2000-01-01 01:01:01'\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesTovideos\",\"relationFromFields\":[\"video_creator_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos_data\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos_data\",\"relationName\":\"videosTovideos_data\",\"relationFromFields\":[\"video_data_id\"],\"relationToFields\":[\"video_data_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos_thumbnails\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos_thumbnails\",\"relationName\":\"videosTovideos_thumbnails\",\"relationFromFields\":[\"video_thumbnail_id\"],\"relationToFields\":[\"video_thumbnail_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"videos_data\":{\"dbName\":null,\"fields\":[{\"name\":\"video_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos\",\"relationName\":\"videosTovideos_data\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"videos_thumbnails\":{\"dbName\":null,\"fields\":[{\"name\":\"video_thumbnail_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_thumbnail_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_thumbnail_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos\",\"relationName\":\"videosTovideos_thumbnails\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.getQueryEngineWasmModule = undefined


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
