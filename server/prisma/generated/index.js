
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
  affiliate_id_1: 'affiliate_id_1',
  affiliate_id_2: 'affiliate_id_2',
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
  sheet_likes: 'sheet_likes',
  sheet_dislikes: 'sheet_dislikes',
  sheet_views: 'sheet_views',
  sheet_date_posted: 'sheet_date_posted'
};

exports.Prisma.Sheets_dataScalarFieldEnum = {
  sheet_data_id: 'sheet_data_id',
  sheet_data: 'sheet_data'
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
  video_likes: 'video_likes',
  video_dislikes: 'video_dislikes',
  video_views: 'video_views',
  video_date_posted: 'video_date_posted'
};

exports.Prisma.Videos_dataScalarFieldEnum = {
  video_data_id: 'video_data_id',
  video_data: 'video_data'
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
  user_credentials: 'user_credentials',
  videos: 'videos',
  videos_data: 'videos_data'
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
  "inlineSchema": "Z2VuZXJhdG9yIGNsaWVudCB7CiAgcHJvdmlkZXIgPSAicHJpc21hLWNsaWVudC1qcyIKICBvdXRwdXQgICA9ICIuL2dlbmVyYXRlZCIKfQoKZGF0YXNvdXJjZSBkYiB7CiAgcHJvdmlkZXIgPSAibXlzcWwiCiAgdXJsICAgICAgPSBlbnYoIkRBVEFCQVNFX1VSTCIpCn0KCm1vZGVsIGFmZmlsaWF0ZXNfcmVsYXRpb25zIHsKICBhZmZpbGlhdGVfcmVsYXRpb25faWQgICBTdHJpbmcgICBAaWQgQHVuaXF1ZShtYXA6ICJhZmZpbGlhdGVfcmVsYXRpb25faWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgYWZmaWxpYXRlX2lkXzEgICAgICAgICAgU3RyaW5nICAgQGRiLkNoYXIoMzYpCiAgYWZmaWxpYXRlX2lkXzIgICAgICAgICAgU3RyaW5nICAgQGRiLkNoYXIoMzYpCiAgYWZmaWxpYXRlX3JlbGF0aW9uX2RhdGUgRGF0ZVRpbWUgQGRlZmF1bHQoZGJnZW5lcmF0ZWQoIicyMDAwLTAxLTAxIDAwOjAwOjAwJyIpKSBAZGIuVGltZXN0YW1wKDApCgogIEBAdW5pcXVlKFthZmZpbGlhdGVfaWRfMSwgYWZmaWxpYXRlX2lkXzJdLCBtYXA6ICJ1bmlxdWVfYWZmaWxpYXRlX2NvbWJpbmF0aW9uIikKfQoKbW9kZWwgY29sbGVjdGlvbnMgewogIGNvbGxlY3Rpb25faWQgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgIEBpZCBAdW5pcXVlKG1hcDogImNvbGxlY3Rpb25faWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgY29sbGVjdGlvbl9uYW1lICAgICBTdHJpbmcgICAgICAgICAgICAgICAgQGRiLlZhckNoYXIoMjU2KQogIGVudGl0eV9pZCAgICAgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgIEBkYi5DaGFyKDM2KQogIGVudGl0aWVzICAgICAgICAgICAgZW50aXRpZXMgICAgICAgICAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtlbnRpdHlfaWRdLCByZWZlcmVuY2VzOiBbZW50aXR5X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImNvbGxlY3Rpb25zX2VudGl0eV9pZF9mayIpCiAgY29sbGVjdGlvbnNfY29udGVudCBjb2xsZWN0aW9uc19jb250ZW50W10KCiAgQEBpbmRleChbZW50aXR5X2lkXSwgbWFwOiAiY29sbGVjdGlvbnNfZW50aXR5X2lkX2ZrX2lkeCIpCn0KCm1vZGVsIGNvbGxlY3Rpb25zX2NvbnRlbnQgewogIGNvbGxlY3Rpb25zX2NvbnRlbnRfaWQgU3RyaW5nICAgICAgQGlkIEB1bmlxdWUobWFwOiAiY29sbGVjdGlvbnNfY29udGVudF9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBjb2xsZWN0aW9uX2lkICAgICAgICAgIFN0cmluZyAgICAgIEBkYi5DaGFyKDM2KQogIGNvbnRlbnRfaWQgICAgICAgICAgICAgU3RyaW5nICAgICAgQGRiLkNoYXIoMzYpCiAgZGF0ZV9hZGRlZCAgICAgICAgICAgICBEYXRlVGltZSAgICBAZGIuVGltZXN0YW1wKDApCiAgcGlubmVkICAgICAgICAgICAgICAgICBCb29sZWFuCiAgZGF0ZV9waW5uZWQgICAgICAgICAgICBEYXRlVGltZT8gICBAZGIuVGltZXN0YW1wKDApCiAgY29sbGVjdGlvbnMgICAgICAgICAgICBjb2xsZWN0aW9ucyBAcmVsYXRpb24oZmllbGRzOiBbY29sbGVjdGlvbl9pZF0sIHJlZmVyZW5jZXM6IFtjb2xsZWN0aW9uX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImNvbGxlY3Rpb25zX2NvbnRlbnRfY29sbGVjdGlvbl9pZF9mayIpCiAgY29udGVudCAgICAgICAgICAgICAgICBjb250ZW50ICAgICBAcmVsYXRpb24oZmllbGRzOiBbY29udGVudF9pZF0sIHJlZmVyZW5jZXM6IFtjb250ZW50X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImNvbGxlY3Rpb25zX2NvbnRlbnRfY29udGVudF9pZF9mayIpCgogIEBAaW5kZXgoW2NvbGxlY3Rpb25faWRdLCBtYXA6ICJjb2xsZWN0aW9uc19jb250ZW50X2NvbGxlY3Rpb25faWRfZmtfaWR4IikKICBAQGluZGV4KFtjb250ZW50X2lkXSwgbWFwOiAiY29sbGVjdGlvbnNfY29udGVudF9jb250ZW50X2lkX2ZrX2lkeCIpCn0KCm1vZGVsIGNvbnRlbnQgewogIGNvbnRlbnRfaWQgICAgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgIEBpZCBAdW5pcXVlKG1hcDogIm1lZGlhX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGNvbnRlbnRfdHlwZSAgICAgICAgSW50PwogIGNvbGxlY3Rpb25zX2NvbnRlbnQgY29sbGVjdGlvbnNfY29udGVudFtdCiAgZW50aXRpZXNfY29udGVudCAgICBlbnRpdGllc19jb250ZW50W10KICBlbnRpdGllc19kaXNsaWtlcyAgIGVudGl0aWVzX2Rpc2xpa2VzW10KICBlbnRpdGllc19saWtlcyAgICAgIGVudGl0aWVzX2xpa2VzW10KfQoKbW9kZWwgZW50aXRpZXMgewogIGVudGl0eV9pZCAgICAgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJlbnRpdHlfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgZW50aXR5X3R5cGUgICAgICAgICAgIEludCAgICAgICAgICAgICAgICAgICAgIEBkZWZhdWx0KDApCiAgY29sbGVjdGlvbnMgICAgICAgICAgIGNvbGxlY3Rpb25zW10KICBlbnRpdGllc19jb250ZW50ICAgICAgZW50aXRpZXNfY29udGVudFtdCiAgZW50aXRpZXNfZGlzbGlrZXMgICAgIGVudGl0aWVzX2Rpc2xpa2VzW10KICBlbnRpdGllc19saWtlcyAgICAgICAgZW50aXRpZXNfbGlrZXNbXQogIGVudGl0aWVzX3JlZmVyZW5jZXMgICBlbnRpdGllc19yZWZlcmVuY2VzW10KICBncm91cHNfbWVtYmVycyAgICAgICAgZ3JvdXBzX21lbWJlcnNbXQogIGltYWdlcyAgICAgICAgICAgICAgICBpbWFnZXNbXQogIG9yZ2FuaXphdGlvbnNfbWVtYmVycyBvcmdhbml6YXRpb25zX21lbWJlcnNbXQogIHNoZWV0cyAgICAgICAgICAgICAgICBzaGVldHNbXQogIHZpZGVvcyAgICAgICAgICAgICAgICB2aWRlb3NbXQp9Cgptb2RlbCBlbnRpdGllc19jb250ZW50IHsKICBlbnRpdGllc19jb250ZW50X2lkIFN0cmluZyAgICBAaWQgQHVuaXF1ZShtYXA6ICJlbnRpdGllc19jb250ZW50X2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGVudGl0eV9pZCAgICAgICAgICAgU3RyaW5nICAgIEBkYi5DaGFyKDM2KQogIGNvbnRlbnRfaWQgICAgICAgICAgU3RyaW5nICAgIEBkYi5DaGFyKDM2KQogIGRhdGVfYWRkZWQgICAgICAgICAgRGF0ZVRpbWUgIEBkYi5UaW1lc3RhbXAoMCkKICBwaW5uZWQgICAgICAgICAgICAgIEJvb2xlYW4KICBkYXRlX3Bpbm5lZCAgICAgICAgIERhdGVUaW1lPyBAZGIuVGltZXN0YW1wKDApCiAgY29udGVudCAgICAgICAgICAgICBjb250ZW50ICAgQHJlbGF0aW9uKGZpZWxkczogW2NvbnRlbnRfaWRdLCByZWZlcmVuY2VzOiBbY29udGVudF9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJlbnRpdGllc19jb250ZW50X2NvbnRlbnRfaWQiKQogIGVudGl0aWVzICAgICAgICAgICAgZW50aXRpZXMgIEByZWxhdGlvbihmaWVsZHM6IFtlbnRpdHlfaWRdLCByZWZlcmVuY2VzOiBbZW50aXR5X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImVudGl0aWVzX2NvbnRlbnRfZW50aXR5X2lkIikKCiAgQEBpbmRleChbY29udGVudF9pZF0pCiAgQEBpbmRleChbZW50aXR5X2lkXSkKfQoKbW9kZWwgZW50aXRpZXNfZGlzbGlrZXMgewogIGRpc2xpa2VfaWQgU3RyaW5nICAgQGlkIEB1bmlxdWUobWFwOiAiZGlzbGlrZV9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBlbnRpdHlfaWQgIFN0cmluZyAgIEBkYi5DaGFyKDM2KQogIGNvbnRlbnRfaWQgU3RyaW5nICAgQGRiLkNoYXIoMzYpCiAgY29udGVudCAgICBjb250ZW50ICBAcmVsYXRpb24oZmllbGRzOiBbY29udGVudF9pZF0sIHJlZmVyZW5jZXM6IFtjb250ZW50X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImVudGl0aWVzX2Rpc2xpa2VzX2NvbnRlbnRfaWRfZmsiKQogIGVudGl0aWVzICAgZW50aXRpZXMgQHJlbGF0aW9uKGZpZWxkczogW2VudGl0eV9pZF0sIHJlZmVyZW5jZXM6IFtlbnRpdHlfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiZW50aXRpZXNfZGlzbGlrZXNfZW50aXR5X2lkX2ZrIikKCiAgQEB1bmlxdWUoW2VudGl0eV9pZCwgY29udGVudF9pZF0sIG1hcDogImVudGl0aWVzX2Rpc2xpa2VzX3VuaXF1ZV9jb21iaW5hdGlvbiIpCiAgQEBpbmRleChbY29udGVudF9pZF0sIG1hcDogImVudGl0aWVzX2Rpc2xpa2VzX2NvbnRlbnRfaWRfZmtfaWR4IikKfQoKbW9kZWwgZW50aXRpZXNfbGlrZXMgewogIGxpa2VfaWQgICAgU3RyaW5nICAgQGlkIEB1bmlxdWUobWFwOiAibGlrZV9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBlbnRpdHlfaWQgIFN0cmluZyAgIEBkYi5DaGFyKDM2KQogIGNvbnRlbnRfaWQgU3RyaW5nICAgQGRiLkNoYXIoMzYpCiAgY29udGVudCAgICBjb250ZW50ICBAcmVsYXRpb24oZmllbGRzOiBbY29udGVudF9pZF0sIHJlZmVyZW5jZXM6IFtjb250ZW50X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImVudGl0aWVzX2xpa2VzX2NvbnRlbnRfaWRfZmsiKQogIGVudGl0aWVzICAgZW50aXRpZXMgQHJlbGF0aW9uKGZpZWxkczogW2VudGl0eV9pZF0sIHJlZmVyZW5jZXM6IFtlbnRpdHlfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiZW50aXRpZXNfbGlrZXNfZW50aXR5X2lkX2ZrIikKCiAgQEB1bmlxdWUoW2VudGl0eV9pZCwgY29udGVudF9pZF0sIG1hcDogImVudGl0aWVzX2xpa2VzX3VuaXF1ZV9jb21iaW5hdGlvbiIpCiAgQEBpbmRleChbY29udGVudF9pZF0sIG1hcDogImVudGl0aWVzX2xpa2VzX2NvbnRlbnRfaWRfZmtfaWR4IikKICBAQGluZGV4KFtlbnRpdHlfaWRdLCBtYXA6ICJlbnRpdGllc19saWtlc19lbnRpdHlfaWRfZmtfaWR4IikKfQoKbW9kZWwgZW50aXRpZXNfcmVmZXJlbmNlcyB7CiAgcmVmZXJlbmNlX2lkIFN0cmluZyAgIEBpZCBAdW5pcXVlKG1hcDogInJlZmVyZW5jZV9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBlbnRpdHlfaWQgICAgU3RyaW5nICAgQGRiLkNoYXIoMzYpCiAgdGl0bGUgICAgICAgIFN0cmluZyAgIEBkYi5WYXJDaGFyKDI1NikKICBhdXRob3IgICAgICAgU3RyaW5nICAgQGRiLlZhckNoYXIoMjU2KQogIHVybCAgICAgICAgICBTdHJpbmcgICBAZGIuVmFyQ2hhcigyNTYpCiAgZW50aXRpZXMgICAgIGVudGl0aWVzIEByZWxhdGlvbihmaWVsZHM6IFtlbnRpdHlfaWRdLCByZWZlcmVuY2VzOiBbZW50aXR5X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImVudGl0aWVzX3JlZmVyZW5jZXNfZW50aXR5X2lkX2ZrIikKCiAgQEBpbmRleChbZW50aXR5X2lkXSwgbWFwOiAiZW50aXRpZXNfcmVmZXJlbmNlc19lbnRpdHlfaWRfZmtfaWR4IikKfQoKbW9kZWwgZ3JvdXBzIHsKICBncm91cF9pZCAgICAgICAgICAgU3RyaW5nICAgICAgICAgICAgQGlkIEB1bmlxdWUobWFwOiAiZ3JvdXBfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgZ3JvdXBfaGFuZGxlICAgICAgIFN0cmluZyAgICAgICAgICAgIEB1bmlxdWUobWFwOiAiZ3JvdXBfaGFuZGxlX1VOSVFVRSIpIEBkYi5WYXJDaGFyKDI1NikKICBncm91cF9uYW1lICAgICAgICAgU3RyaW5nICAgICAgICAgICAgQGRiLlZhckNoYXIoMjU2KQogIGdyb3VwX2N1cnJlbnRJc3N1ZSBTdHJpbmc/ICAgICAgICAgICBAZGIuVGV4dAogIGdyb3VwX3N0YW5jZXMgICAgICBTdHJpbmc/ICAgICAgICAgICBAZGIuVGV4dAogIGdyb3VwX2Rlc2NyaXB0aW9uICBTdHJpbmc/ICAgICAgICAgICBAZGIuVGV4dAogIHByb2ZpbGVfcGljdHVyZV9pZCBTdHJpbmc/ICAgICAgICAgICBAZGIuQ2hhcigzNikKICBwcm9maWxlX3BpY3R1cmVzICAgcHJvZmlsZV9waWN0dXJlcz8gQHJlbGF0aW9uKGZpZWxkczogW3Byb2ZpbGVfcGljdHVyZV9pZF0sIHJlZmVyZW5jZXM6IFtwcm9maWxlX3BpY3R1cmVfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiZ3JvdXBzX3Byb2ZpbGVfcGljdHVyZV9pZF9mayIpCiAgZ3JvdXBzX21lbWJlcnMgICAgIGdyb3Vwc19tZW1iZXJzW10KCiAgQEBpbmRleChbcHJvZmlsZV9waWN0dXJlX2lkXSwgbWFwOiAiZ3JvdXBzX3Byb2ZpbGVfcGljdHVyZV9pZF9ma19pZHgiKQp9Cgptb2RlbCBncm91cHNfbWVtYmVycyB7CiAgZ3JvdXBzX21lbWJlcnNfaWQgU3RyaW5nICAgQGlkIEB1bmlxdWUobWFwOiAiZ3JvdXBzX21lbWJlcnNfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgZ3JvdXBfaWQgICAgICAgICAgU3RyaW5nICAgQGRiLkNoYXIoMzYpCiAgZW50aXR5X2lkICAgICAgICAgU3RyaW5nICAgQGRiLkNoYXIoMzYpCiAgZW50aXRpZXMgICAgICAgICAgZW50aXRpZXMgQHJlbGF0aW9uKGZpZWxkczogW2VudGl0eV9pZF0sIHJlZmVyZW5jZXM6IFtlbnRpdHlfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiZ3JvdXBzX21lbWJlcnNfZW50aXR5X2lkX2ZrIikKICBncm91cHMgICAgICAgICAgICBncm91cHMgICBAcmVsYXRpb24oZmllbGRzOiBbZ3JvdXBfaWRdLCByZWZlcmVuY2VzOiBbZ3JvdXBfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiZ3JvdXBzX21lbWJlcnNfZ3JvdXBfaWRfZmsiKQoKICBAQHVuaXF1ZShbZ3JvdXBfaWQsIGVudGl0eV9pZF0sIG1hcDogInVuaXF1ZV9ncm91cF9tZW1iZXJfY29tYmluYXRpb24iKQogIEBAaW5kZXgoW2VudGl0eV9pZF0sIG1hcDogImdyb3Vwc19tZW1iZXJzX2VudGl0eV9pZF9mayIpCiAgQEBpbmRleChbZ3JvdXBfaWRdLCBtYXA6ICJncm91cHNfbWVtYmVyc19ncm91cF9pZF9ma19pZHgiKQp9Cgptb2RlbCBpbWFnZXMgewogIGltYWdlX2lkICAgICAgICAgIFN0cmluZyAgICAgIEBpZCBAdW5pcXVlKG1hcDogImltYWdlX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGltYWdlX2NyZWF0b3JfaWQgIFN0cmluZyAgICAgIEBkYi5DaGFyKDM2KQogIGltYWdlX3RpdGxlICAgICAgIFN0cmluZyAgICAgIEBkYi5WYXJDaGFyKDI1NikKICBpbWFnZV9kZXNjcmlwdGlvbiBTdHJpbmcgICAgICBAZGIuVGV4dAogIGltYWdlX2ZpbGVuYW1lICAgIFN0cmluZyAgICAgIEBkYi5WYXJDaGFyKDI1NikKICBpbWFnZV9kYXRhX2lkICAgICBTdHJpbmcgICAgICBAZGIuQ2hhcigzNikKICBpbWFnZV9saWtlcyAgICAgICBJbnQgICAgICAgICBAZGVmYXVsdCgwKQogIGltYWdlX2Rpc2xpa2VzICAgIEludCAgICAgICAgIEBkZWZhdWx0KDApCiAgaW1hZ2Vfdmlld3MgICAgICAgSW50ICAgICAgICAgQGRlZmF1bHQoMCkKICBpbWFnZV9kYXRlX3Bvc3RlZCBEYXRlVGltZSAgICBAZGVmYXVsdChkYmdlbmVyYXRlZCgiJzIwMDAtMDEtMDEgMDE6MDE6MDEnIikpIEBkYi5UaW1lc3RhbXAoMCkKICBlbnRpdGllcyAgICAgICAgICBlbnRpdGllcyAgICBAcmVsYXRpb24oZmllbGRzOiBbaW1hZ2VfY3JlYXRvcl9pZF0sIHJlZmVyZW5jZXM6IFtlbnRpdHlfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiaW1hZ2VzX2ltYWdlX2NyZWF0b3JfaWRfZmsiKQogIGltYWdlc19kYXRhICAgICAgIGltYWdlc19kYXRhIEByZWxhdGlvbihmaWVsZHM6IFtpbWFnZV9kYXRhX2lkXSwgcmVmZXJlbmNlczogW2ltYWdlX2RhdGFfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiaW1hZ2VzX2ltYWdlX2RhdGFfaWRfZmsiKQoKICBAQGluZGV4KFtpbWFnZV9jcmVhdG9yX2lkXSwgbWFwOiAiaW1hZ2VzX2ltYWdlX2NyZWF0b3JfaWRfZmtfaWR4IikKICBAQGluZGV4KFtpbWFnZV9kYXRhX2lkXSwgbWFwOiAiaW1hZ2VzX2ltYWdlX2RhdGFfaWRfZmtfaWR4IikKfQoKbW9kZWwgaW1hZ2VzX2RhdGEgewogIGltYWdlX2RhdGFfaWQgU3RyaW5nICAgQGlkIEB1bmlxdWUobWFwOiAiaW1hZ2VfZGF0YV9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBpbWFnZV9kYXRhICAgIEJ5dGVzCiAgaW1hZ2VzICAgICAgICBpbWFnZXNbXQp9Cgptb2RlbCBpbmRpdmlkdWFscyB7CiAgaW5kaXZpZHVhbF9pZCAgICAgICAgICAgU3RyaW5nICAgICAgICAgICAgQGlkIEB1bmlxdWUobWFwOiAiaW5kaXZpZHVhbF9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBpbmRpdmlkdWFsX3VzZXJuYW1lICAgICBTdHJpbmcgICAgICAgICAgICBAdW5pcXVlKG1hcDogInVzZXJOYW1lX1VOSVFVRSIpIEBkYi5WYXJDaGFyKDI1NikKICBpbmRpdmlkdWFsX25hbWUgICAgICAgICBTdHJpbmcgICAgICAgICAgICBAZGIuVmFyQ2hhcigyNTYpCiAgaW5kaXZpZHVhbF9jdXJyZW50SXNzdWUgU3RyaW5nPyAgICAgICAgICAgQGRiLlRleHQKICBpbmRpdmlkdWFsX3JvbGVzICAgICAgICBTdHJpbmc/ICAgICAgICAgICBAZGIuVGV4dAogIGluZGl2aWR1YWxfZGVzY3JpcHRpb24gIFN0cmluZz8gICAgICAgICAgIEBkYi5UZXh0CiAgcHJvZmlsZV9waWN0dXJlX2lkICAgICAgU3RyaW5nPyAgICAgICAgICAgQGRiLkNoYXIoMzYpCiAgdXNlcl9jcmVkZW50aWFscyAgICAgICAgdXNlcl9jcmVkZW50aWFscyAgQHJlbGF0aW9uKGZpZWxkczogW2luZGl2aWR1YWxfaWRdLCByZWZlcmVuY2VzOiBbdXNlcl9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJpbmRpdmlkdWFsc19pbmRpdmlkdWFsX2lkX2ZrIikKICBwcm9maWxlX3BpY3R1cmVzICAgICAgICBwcm9maWxlX3BpY3R1cmVzPyBAcmVsYXRpb24oZmllbGRzOiBbcHJvZmlsZV9waWN0dXJlX2lkXSwgcmVmZXJlbmNlczogW3Byb2ZpbGVfcGljdHVyZV9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJpbmRpdmlkdWFsc19wcm9maWxlX3BpY3R1cmVfaWRfZmsiKQoKICBAQGluZGV4KFtwcm9maWxlX3BpY3R1cmVfaWRdLCBtYXA6ICJpbmRpdmlkdWFsc19wcm9maWxlX3BpY3R1cmVfaWRfZmtfaWR4IikKfQoKbW9kZWwgb3JnYW5pemF0aW9ucyB7CiAgb3JnYW5pemF0aW9uX2lkICAgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJvcmdhbml6YXRpb25faWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgb3JnYW5pemF0aW9uX2hhbmRsZSAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgICBAdW5pcXVlKG1hcDogIm9yZ2FuaXphdGlvbl9oYW5kbGVfVU5JUVVFIikgQGRiLlZhckNoYXIoMjU2KQogIG9yZ2FuaXphdGlvbl9uYW1lICAgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgICAgQGRiLlZhckNoYXIoMjU2KQogIG9yZ2FuaXphdGlvbl9jdXJyZW50SXNzdWUgU3RyaW5nPyAgICAgICAgICAgICAgICAgQGRiLlRleHQKICBvcmdhbml6YXRpb25fc3RhbmNlcyAgICAgIFN0cmluZz8gICAgICAgICAgICAgICAgIEBkYi5UZXh0CiAgb3JnYW5pemF0aW9uX2Rlc2NyaXB0aW9uICBTdHJpbmc/ICAgICAgICAgICAgICAgICBAZGIuVGV4dAogIHByb2ZpbGVfcGljdHVyZV9pZCAgICAgICAgU3RyaW5nPyAgICAgICAgICAgICAgICAgQGRiLkNoYXIoMzYpCiAgcHJvZmlsZV9waWN0dXJlcyAgICAgICAgICBwcm9maWxlX3BpY3R1cmVzPyAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbcHJvZmlsZV9waWN0dXJlX2lkXSwgcmVmZXJlbmNlczogW3Byb2ZpbGVfcGljdHVyZV9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJvcmdhbml6YXRpb25zX3Byb2ZpbGVfcGljdHVyZV9pZCIpCiAgb3JnYW5pemF0aW9uc19tZW1iZXJzICAgICBvcmdhbml6YXRpb25zX21lbWJlcnNbXQoKICBAQGluZGV4KFtwcm9maWxlX3BpY3R1cmVfaWRdKQp9Cgptb2RlbCBvcmdhbml6YXRpb25zX21lbWJlcnMgewogIG9yZ2FuaXphdGlvbnNfbWVtYmVyc19pZCBTdHJpbmcgICAgICAgIEBpZCBAdW5pcXVlKG1hcDogIm9yZ2FuaXphdGlvbnNfbWVtYmVyc19pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBvcmdhbml6YXRpb25faWQgICAgICAgICAgU3RyaW5nICAgICAgICBAZGIuQ2hhcigzNikKICBlbnRpdHlfaWQgICAgICAgICAgICAgICAgU3RyaW5nICAgICAgICBAZGIuQ2hhcigzNikKICBlbnRpdGllcyAgICAgICAgICAgICAgICAgZW50aXRpZXMgICAgICBAcmVsYXRpb24oZmllbGRzOiBbZW50aXR5X2lkXSwgcmVmZXJlbmNlczogW2VudGl0eV9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJvcmdhbml6YXRpb25zX21lbWJlcnNfZW50aXR5X2lkX2ZrIikKICBvcmdhbml6YXRpb25zICAgICAgICAgICAgb3JnYW5pemF0aW9ucyBAcmVsYXRpb24oZmllbGRzOiBbb3JnYW5pemF0aW9uX2lkXSwgcmVmZXJlbmNlczogW29yZ2FuaXphdGlvbl9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJvcmdhbml6YXRpb25zX21lbWJlcnNfb3JnYW5pemF0aW9uX2lkX2ZrIikKCiAgQEBpbmRleChbZW50aXR5X2lkXSwgbWFwOiAib3JnYW5pemF0aW9uc19tZW1iZXJzX2VudGl0eV9pZF9ma19pZHgiKQogIEBAaW5kZXgoW29yZ2FuaXphdGlvbl9pZF0sIG1hcDogIm9yZ2FuaXphdGlvbnNfbWVtYmVyc19vcmdhbml6YXRpb25faWRfZmtfaWR4IikKfQoKbW9kZWwgcHJvZmlsZV9waWN0dXJlcyB7CiAgcHJvZmlsZV9waWN0dXJlX2lkICAgICAgIFN0cmluZyAgICAgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJwcm9maWxlX3BpY3R1cmVfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgcHJvZmlsZV9waWN0dXJlX2RhdGEgICAgIEJ5dGVzCiAgcHJvZmlsZV9waWN0dXJlX2ZpbGVuYW1lIFN0cmluZz8gICAgICAgICBAZGIuVmFyQ2hhcigyNTYpCiAgZ3JvdXBzICAgICAgICAgICAgICAgICAgIGdyb3Vwc1tdCiAgaW5kaXZpZHVhbHMgICAgICAgICAgICAgIGluZGl2aWR1YWxzW10KICBvcmdhbml6YXRpb25zICAgICAgICAgICAgb3JnYW5pemF0aW9uc1tdCn0KCm1vZGVsIHNoZWV0cyB7CiAgc2hlZXRfaWQgICAgICAgICAgU3RyaW5nICAgICAgQGlkIEB1bmlxdWUobWFwOiAic2hlZXRfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgc2hlZXRfYXV0aG9yX2lkICAgU3RyaW5nICAgICAgQGRiLkNoYXIoMzYpCiAgc2hlZXRfdGl0bGUgICAgICAgU3RyaW5nICAgICAgQGRiLlZhckNoYXIoMjU2KQogIHNoZWV0X3N1YmplY3QgICAgIFN0cmluZyAgICAgIEBkYi5UZXh0CiAgc2hlZXRfZmlsZW5hbWUgICAgU3RyaW5nICAgICAgQGRiLlZhckNoYXIoMjU2KQogIHNoZWV0X2RhdGFfaWQgICAgIFN0cmluZyAgICAgIEBkYi5DaGFyKDM2KQogIHNoZWV0X2xpa2VzICAgICAgIEludCAgICAgICAgIEBkZWZhdWx0KDApCiAgc2hlZXRfZGlzbGlrZXMgICAgSW50ICAgICAgICAgQGRlZmF1bHQoMCkKICBzaGVldF92aWV3cyAgICAgICBJbnQgICAgICAgICBAZGVmYXVsdCgwKQogIHNoZWV0X2RhdGVfcG9zdGVkIERhdGVUaW1lICAgIEBkZWZhdWx0KGRiZ2VuZXJhdGVkKCInMjAwMC0wMS0wMSAwMTowMTowMSciKSkgQGRiLlRpbWVzdGFtcCgwKQogIGVudGl0aWVzICAgICAgICAgIGVudGl0aWVzICAgIEByZWxhdGlvbihmaWVsZHM6IFtzaGVldF9hdXRob3JfaWRdLCByZWZlcmVuY2VzOiBbZW50aXR5X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogInNoZWV0c19zaGVldF9hdXRob3JfaWRfZmsiKQogIHNoZWV0c19kYXRhICAgICAgIHNoZWV0c19kYXRhIEByZWxhdGlvbihmaWVsZHM6IFtzaGVldF9kYXRhX2lkXSwgcmVmZXJlbmNlczogW3NoZWV0X2RhdGFfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAic2hlZXRzX3NoZWV0X2RhdGFfaWRfZmsiKQoKICBAQGluZGV4KFtzaGVldF9kYXRhX2lkXSwgbWFwOiAiU2hlZXRzX3NoZWV0X2RhdGFfaWRfZmtfaWR4IikKICBAQGluZGV4KFtzaGVldF9hdXRob3JfaWRdLCBtYXA6ICJzaGVldHNfc2hlZXRfYXV0aG9yX2lkX2ZrX2lkeCIpCn0KCm1vZGVsIHNoZWV0c19kYXRhIHsKICBzaGVldF9kYXRhX2lkIFN0cmluZyAgIEBpZCBAdW5pcXVlKG1hcDogInNoZWV0X2RhdGFfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgc2hlZXRfZGF0YSAgICBCeXRlcwogIHNoZWV0cyAgICAgICAgc2hlZXRzW10KfQoKbW9kZWwgdXNlcl9jcmVkZW50aWFscyB7CiAgdXNlcl9pZCAgICAgICAgICAgU3RyaW5nICAgICAgIEBpZCBAdW5pcXVlKG1hcDogInVzZXJfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgdXNlcm5hbWUgICAgICAgICAgU3RyaW5nICAgICAgIEB1bmlxdWUobWFwOiAidXNlcm5hbWVfVU5JUVVFIikgQGRiLlZhckNoYXIoMTI4KQogIHVzZXJfcGFzc3dvcmQgICAgIFN0cmluZyAgICAgICBAZGIuVmFyQ2hhcigxMjgpCiAgdXNlcl9maXJzdF9uYW1lICAgU3RyaW5nPyAgICAgIEBkYi5WYXJDaGFyKDEyOCkKICB1c2VyX2xhc3RfbmFtZSAgICBTdHJpbmc/ICAgICAgQGRiLlZhckNoYXIoMTI4KQogIHVzZXJfZW1haWwgICAgICAgIFN0cmluZz8gICAgICBAZGIuVmFyQ2hhcigxMjgpCiAgdXNlcl9waG9uZV9udW1iZXIgU3RyaW5nPyAgICAgIEBkYi5WYXJDaGFyKDE1KQogIGluZGl2aWR1YWxzICAgICAgIGluZGl2aWR1YWxzPwp9Cgptb2RlbCB2aWRlb3MgewogIHZpZGVvX2lkICAgICAgICAgIFN0cmluZyAgICAgIEBpZCBAdW5pcXVlKG1hcDogInZpZGVvX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIHZpZGVvX2NyZWF0b3JfaWQgIFN0cmluZyAgICAgIEBkYi5DaGFyKDM2KQogIHZpZGVvX3RpdGxlICAgICAgIFN0cmluZyAgICAgIEBkYi5WYXJDaGFyKDI1NikKICB2aWRlb19kZXNjcmlwdGlvbiBTdHJpbmcgICAgICBAZGIuVGV4dAogIHZpZGVvX2ZpbGVuYW1lICAgIFN0cmluZyAgICAgIEBkYi5WYXJDaGFyKDI1NikKICB2aWRlb19kYXRhX2lkICAgICBTdHJpbmcgICAgICBAZGIuQ2hhcigzNikKICB2aWRlb19saWtlcyAgICAgICBJbnQgICAgICAgICBAZGVmYXVsdCgwKQogIHZpZGVvX2Rpc2xpa2VzICAgIEludCAgICAgICAgIEBkZWZhdWx0KDApCiAgdmlkZW9fdmlld3MgICAgICAgSW50ICAgICAgICAgQGRlZmF1bHQoMCkKICB2aWRlb19kYXRlX3Bvc3RlZCBEYXRlVGltZT8gICBAZGVmYXVsdChkYmdlbmVyYXRlZCgiJzIwMDAtMDEtMDEgMDE6MDE6MDEnIikpIEBkYi5UaW1lc3RhbXAoMCkKICBlbnRpdGllcyAgICAgICAgICBlbnRpdGllcyAgICBAcmVsYXRpb24oZmllbGRzOiBbdmlkZW9fY3JlYXRvcl9pZF0sIHJlZmVyZW5jZXM6IFtlbnRpdHlfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAidmlkZW9zX3ZpZGVvX2NyZWF0b3JfaWRfZmsiKQogIHZpZGVvc19kYXRhICAgICAgIHZpZGVvc19kYXRhIEByZWxhdGlvbihmaWVsZHM6IFt2aWRlb19kYXRhX2lkXSwgcmVmZXJlbmNlczogW3ZpZGVvX2RhdGFfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAidmlkZW9zX3ZpZGVvX2RhdGFfaWRfZmsiKQoKICBAQGluZGV4KFt2aWRlb19jcmVhdG9yX2lkXSwgbWFwOiAidmlkZW9zX3ZpZGVvX2NyZWF0b3JfaWRfZmtfaWR4IikKICBAQGluZGV4KFt2aWRlb19kYXRhX2lkXSwgbWFwOiAidmlkZW9zX3ZpZGVvX2RhdGFfaWRfZmtfaWR4IikKfQoKbW9kZWwgdmlkZW9zX2RhdGEgewogIHZpZGVvX2RhdGFfaWQgU3RyaW5nICAgQGlkIEB1bmlxdWUobWFwOiAidmlkZW9fZGF0YV9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICB2aWRlb19kYXRhICAgIEJ5dGVzCiAgdmlkZW9zICAgICAgICB2aWRlb3NbXQp9Cg==",
  "inlineSchemaHash": "913a1ef3f6d6413f61c3daefbb9da7ad74d61ebd6d81ae44c72ef266120e347d",
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

config.runtimeDataModel = JSON.parse("{\"models\":{\"affiliates_relations\":{\"dbName\":null,\"fields\":[{\"name\":\"affiliate_relation_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"affiliate_id_1\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"affiliate_id_2\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"affiliate_relation_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"'2000-01-01 00:00:00'\"]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"affiliate_id_1\",\"affiliate_id_2\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"affiliate_id_1\",\"affiliate_id_2\"]}],\"isGenerated\":false},\"collections\":{\"dbName\":null,\"fields\":[{\"name\":\"collection_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collection_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"collectionsToentities\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections_content\",\"relationName\":\"collectionsTocollections_content\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"collections_content\":{\"dbName\":null,\"fields\":[{\"name\":\"collections_content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collection_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_added\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections\",\"relationName\":\"collectionsTocollections_content\",\"relationFromFields\":[\"collection_id\"],\"relationToFields\":[\"collection_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"content\",\"relationName\":\"collections_contentTocontent\",\"relationFromFields\":[\"content_id\"],\"relationToFields\":[\"content_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"content\":{\"dbName\":null,\"fields\":[{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections_content\",\"relationName\":\"collections_contentTocontent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_content\",\"relationName\":\"contentToentities_content\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_dislikes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_dislikes\",\"relationName\":\"contentToentities_dislikes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_likes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_likes\",\"relationName\":\"contentToentities_likes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities\":{\"dbName\":null,\"fields\":[{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections\",\"relationName\":\"collectionsToentities\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_content\",\"relationName\":\"entitiesToentities_content\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_dislikes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_dislikes\",\"relationName\":\"entitiesToentities_dislikes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_likes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_likes\",\"relationName\":\"entitiesToentities_likes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_references\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_references\",\"relationName\":\"entitiesToentities_references\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups_members\",\"relationName\":\"entitiesTogroups_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images\",\"relationName\":\"entitiesToimages\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations_members\",\"relationName\":\"entitiesToorganizations_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets\",\"relationName\":\"entitiesTosheets\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos\",\"relationName\":\"entitiesTovideos\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities_content\":{\"dbName\":null,\"fields\":[{\"name\":\"entities_content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_added\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"content\",\"relationName\":\"contentToentities_content\",\"relationFromFields\":[\"content_id\"],\"relationToFields\":[\"content_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_content\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities_dislikes\":{\"dbName\":null,\"fields\":[{\"name\":\"dislike_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"content\",\"relationName\":\"contentToentities_dislikes\",\"relationFromFields\":[\"content_id\"],\"relationToFields\":[\"content_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_dislikes\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"entity_id\",\"content_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"entity_id\",\"content_id\"]}],\"isGenerated\":false},\"entities_likes\":{\"dbName\":null,\"fields\":[{\"name\":\"like_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"content\",\"relationName\":\"contentToentities_likes\",\"relationFromFields\":[\"content_id\"],\"relationToFields\":[\"content_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_likes\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"entity_id\",\"content_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"entity_id\",\"content_id\"]}],\"isGenerated\":false},\"entities_references\":{\"dbName\":null,\"fields\":[{\"name\":\"reference_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"author\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_references\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"groups\":{\"dbName\":null,\"fields\":[{\"name\":\"group_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_handle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_currentIssue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_stances\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_picture_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_pictures\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"profile_pictures\",\"relationName\":\"groupsToprofile_pictures\",\"relationFromFields\":[\"profile_picture_id\"],\"relationToFields\":[\"profile_picture_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups_members\",\"relationName\":\"groupsTogroups_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"groups_members\":{\"dbName\":null,\"fields\":[{\"name\":\"groups_members_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesTogroups_members\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups\",\"relationName\":\"groupsTogroups_members\",\"relationFromFields\":[\"group_id\"],\"relationToFields\":[\"group_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"group_id\",\"entity_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"group_id\",\"entity_id\"]}],\"isGenerated\":false},\"images\":{\"dbName\":null,\"fields\":[{\"name\":\"image_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_views\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_date_posted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"'2000-01-01 01:01:01'\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToimages\",\"relationFromFields\":[\"image_creator_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images_data\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images_data\",\"relationName\":\"imagesToimages_data\",\"relationFromFields\":[\"image_data_id\"],\"relationToFields\":[\"image_data_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"images_data\":{\"dbName\":null,\"fields\":[{\"name\":\"image_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images\",\"relationName\":\"imagesToimages_data\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"individuals\":{\"dbName\":null,\"fields\":[{\"name\":\"individual_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_currentIssue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_roles\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_picture_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_credentials\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"user_credentials\",\"relationName\":\"individualsTouser_credentials\",\"relationFromFields\":[\"individual_id\"],\"relationToFields\":[\"user_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_pictures\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"profile_pictures\",\"relationName\":\"individualsToprofile_pictures\",\"relationFromFields\":[\"profile_picture_id\"],\"relationToFields\":[\"profile_picture_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"organizations\":{\"dbName\":null,\"fields\":[{\"name\":\"organization_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_handle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_currentIssue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_stances\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_picture_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_pictures\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"profile_pictures\",\"relationName\":\"organizationsToprofile_pictures\",\"relationFromFields\":[\"profile_picture_id\"],\"relationToFields\":[\"profile_picture_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations_members\",\"relationName\":\"organizationsToorganizations_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"organizations_members\":{\"dbName\":null,\"fields\":[{\"name\":\"organizations_members_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToorganizations_members\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations\",\"relationName\":\"organizationsToorganizations_members\",\"relationFromFields\":[\"organization_id\"],\"relationToFields\":[\"organization_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"profile_pictures\":{\"dbName\":null,\"fields\":[{\"name\":\"profile_picture_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_picture_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile_picture_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups\",\"relationName\":\"groupsToprofile_pictures\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individuals\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"individuals\",\"relationName\":\"individualsToprofile_pictures\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations\",\"relationName\":\"organizationsToprofile_pictures\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"sheets\":{\"dbName\":null,\"fields\":[{\"name\":\"sheet_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_author_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_subject\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_views\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_date_posted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"'2000-01-01 01:01:01'\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesTosheets\",\"relationFromFields\":[\"sheet_author_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets_data\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets_data\",\"relationName\":\"sheetsTosheets_data\",\"relationFromFields\":[\"sheet_data_id\"],\"relationToFields\":[\"sheet_data_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"sheets_data\":{\"dbName\":null,\"fields\":[{\"name\":\"sheet_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets\",\"relationName\":\"sheetsTosheets_data\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"user_credentials\":{\"dbName\":null,\"fields\":[{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_first_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_last_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_phone_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individuals\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"individuals\",\"relationName\":\"individualsTouser_credentials\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"videos\":{\"dbName\":null,\"fields\":[{\"name\":\"video_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_views\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_date_posted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"'2000-01-01 01:01:01'\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesTovideos\",\"relationFromFields\":[\"video_creator_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos_data\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos_data\",\"relationName\":\"videosTovideos_data\",\"relationFromFields\":[\"video_data_id\"],\"relationToFields\":[\"video_data_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"videos_data\":{\"dbName\":null,\"fields\":[{\"name\":\"video_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos\",\"relationName\":\"videosTovideos_data\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
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
