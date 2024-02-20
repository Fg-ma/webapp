
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
  affiliate_id_2: 'affiliate_id_2'
};

exports.Prisma.CollectionsScalarFieldEnum = {
  collection_id: 'collection_id',
  collection_name: 'collection_name',
  entity_id: 'entity_id'
};

exports.Prisma.Collections_imagesScalarFieldEnum = {
  collections_images_id: 'collections_images_id',
  collection_id: 'collection_id',
  image_id: 'image_id',
  date_added: 'date_added',
  pinned: 'pinned',
  date_pinned: 'date_pinned'
};

exports.Prisma.Collections_sheetsScalarFieldEnum = {
  collections_sheets_id: 'collections_sheets_id',
  collection_id: 'collection_id',
  sheet_id: 'sheet_id',
  date_added: 'date_added',
  pinned: 'pinned',
  date_pinned: 'date_pinned'
};

exports.Prisma.Collections_videosScalarFieldEnum = {
  collections_videos_id: 'collections_videos_id',
  collection_id: 'collection_id',
  video_id: 'video_id',
  date_added: 'date_added',
  pinned: 'pinned',
  date_pinned: 'date_pinned'
};

exports.Prisma.EntitiesScalarFieldEnum = {
  entity_id: 'entity_id',
  entity_type: 'entity_type'
};

exports.Prisma.Entities_imagesScalarFieldEnum = {
  entities_images_id: 'entities_images_id',
  entity_id: 'entity_id',
  image_id: 'image_id',
  date_added: 'date_added',
  pinned: 'pinned',
  date_pinned: 'date_pinned'
};

exports.Prisma.Entities_referencesScalarFieldEnum = {
  reference_id: 'reference_id',
  entity_id: 'entity_id',
  title: 'title',
  author: 'author',
  url: 'url'
};

exports.Prisma.Entities_sheetsScalarFieldEnum = {
  entities_sheets_id: 'entities_sheets_id',
  entity_id: 'entity_id',
  sheet_id: 'sheet_id',
  date_added: 'date_added',
  pinned: 'pinned',
  date_pinned: 'date_pinned'
};

exports.Prisma.Entities_videosScalarFieldEnum = {
  entities_videos_id: 'entities_videos_id',
  entity_id: 'entity_id',
  video_id: 'video_id',
  date_added: 'date_added',
  pinned: 'pinned',
  date_pinned: 'date_pinned'
};

exports.Prisma.GroupsScalarFieldEnum = {
  group_id: 'group_id',
  group_handle: 'group_handle',
  group_name: 'group_name',
  group_currentIssue: 'group_currentIssue',
  group_stances: 'group_stances',
  group_description: 'group_description'
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
  image_data_id: 'image_data_id'
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
  individual_description: 'individual_description'
};

exports.Prisma.OrganizationsScalarFieldEnum = {
  organization_id: 'organization_id',
  organization_handle: 'organization_handle',
  organization_name: 'organization_name',
  organization_currentIssue: 'organization_currentIssue',
  organization_stances: 'organization_stances',
  organization_description: 'organization_description'
};

exports.Prisma.Organizations_membersScalarFieldEnum = {
  organizations_members_id: 'organizations_members_id',
  organization_id: 'organization_id',
  entity_id: 'entity_id'
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
  video_data_id: 'video_data_id'
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
  collections_images: 'collections_images',
  collections_sheets: 'collections_sheets',
  collections_videos: 'collections_videos',
  entities: 'entities',
  entities_images: 'entities_images',
  entities_references: 'entities_references',
  entities_sheets: 'entities_sheets',
  entities_videos: 'entities_videos',
  groups: 'groups',
  groups_members: 'groups_members',
  images: 'images',
  images_data: 'images_data',
  individuals: 'individuals',
  organizations: 'organizations',
  organizations_members: 'organizations_members',
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
  "inlineSchema": "Z2VuZXJhdG9yIGNsaWVudCB7CiAgcHJvdmlkZXIgPSAicHJpc21hLWNsaWVudC1qcyIKICBvdXRwdXQgICA9ICIuL2dlbmVyYXRlZCIKfQoKZGF0YXNvdXJjZSBkYiB7CiAgcHJvdmlkZXIgPSAibXlzcWwiCiAgdXJsICAgICAgPSBlbnYoIkRBVEFCQVNFX1VSTCIpCn0KCm1vZGVsIGFmZmlsaWF0ZXNfcmVsYXRpb25zIHsKICBhZmZpbGlhdGVfcmVsYXRpb25faWQgU3RyaW5nIEBpZCBAdW5pcXVlKG1hcDogImFmZmlsaWF0ZV9yZWxhdGlvbl9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBhZmZpbGlhdGVfaWRfMSAgICAgICAgU3RyaW5nIEBkYi5DaGFyKDM2KQogIGFmZmlsaWF0ZV9pZF8yICAgICAgICBTdHJpbmcgQGRiLkNoYXIoMzYpCgogIEBAdW5pcXVlKFthZmZpbGlhdGVfaWRfMSwgYWZmaWxpYXRlX2lkXzJdLCBtYXA6ICJ1bmlxdWVfYWZmaWxpYXRlX2NvbWJpbmF0aW9uIikKfQoKbW9kZWwgY29sbGVjdGlvbnMgewogIGNvbGxlY3Rpb25faWQgICAgICBTdHJpbmcgICAgICAgICAgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJ0ZW1wX2NvbGxlY3Rpb25faWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgY29sbGVjdGlvbl9uYW1lICAgIFN0cmluZyAgICAgICAgICAgICAgIEBkYi5WYXJDaGFyKDI1NikKICBlbnRpdHlfaWQgICAgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgQGRiLkNoYXIoMzYpCiAgZW50aXRpZXMgICAgICAgICAgIGVudGl0aWVzICAgICAgICAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtlbnRpdHlfaWRdLCByZWZlcmVuY2VzOiBbZW50aXR5X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImNvbGxlY3Rpb25zX2VudGl0eV9pZF9mayIpCiAgY29sbGVjdGlvbnNfaW1hZ2VzIGNvbGxlY3Rpb25zX2ltYWdlc1tdCiAgY29sbGVjdGlvbnNfc2hlZXRzIGNvbGxlY3Rpb25zX3NoZWV0c1tdCiAgY29sbGVjdGlvbnNfdmlkZW9zIGNvbGxlY3Rpb25zX3ZpZGVvc1tdCgogIEBAaW5kZXgoW2VudGl0eV9pZF0sIG1hcDogImNvbGxlY3Rpb25zX2VudGl0eV9pZF9ma19pZHgiKQp9Cgptb2RlbCBjb2xsZWN0aW9uc19pbWFnZXMgewogIGNvbGxlY3Rpb25zX2ltYWdlc19pZCBTdHJpbmcgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJ0ZW1wX2NvbGxlY3Rpb25zX2ltYWdlc19pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBjb2xsZWN0aW9uX2lkICAgICAgICAgU3RyaW5nICAgICAgQGRiLkNoYXIoMzYpCiAgaW1hZ2VfaWQgICAgICAgICAgICAgIFN0cmluZyAgICAgIEBkYi5DaGFyKDM2KQogIGRhdGVfYWRkZWQgICAgICAgICAgICBEYXRlVGltZSAgICBAZGIuVGltZXN0YW1wKDApCiAgcGlubmVkICAgICAgICAgICAgICAgIEJvb2xlYW4KICBkYXRlX3Bpbm5lZCAgICAgICAgICAgRGF0ZVRpbWU/ICAgQGRiLlRpbWVzdGFtcCgwKQogIGNvbGxlY3Rpb25zICAgICAgICAgICBjb2xsZWN0aW9ucyBAcmVsYXRpb24oZmllbGRzOiBbY29sbGVjdGlvbl9pZF0sIHJlZmVyZW5jZXM6IFtjb2xsZWN0aW9uX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImNvbGxlY3Rpb25zX2ltYWdlc19jb2xsZWN0aW9uX2lkX2ZrIikKICBpbWFnZXMgICAgICAgICAgICAgICAgaW1hZ2VzICAgICAgQHJlbGF0aW9uKGZpZWxkczogW2ltYWdlX2lkXSwgcmVmZXJlbmNlczogW2ltYWdlX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImNvbGxlY3Rpb25zX2ltYWdlc19pbWFnZV9pZF9mayIpCgogIEBAaW5kZXgoW2NvbGxlY3Rpb25faWRdLCBtYXA6ICJjb2xsZWN0aW9uc19pbWFnZXNfY29sbGVjdGlvbl9pZF9ma19pZHgiKQogIEBAaW5kZXgoW2ltYWdlX2lkXSkKfQoKbW9kZWwgY29sbGVjdGlvbnNfc2hlZXRzIHsKICBjb2xsZWN0aW9uc19zaGVldHNfaWQgU3RyaW5nICAgICAgQGlkIEB1bmlxdWUobWFwOiAidGVtcF9jb2xsZWN0aW9uc19zaGVldHNfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgY29sbGVjdGlvbl9pZCAgICAgICAgIFN0cmluZyAgICAgIEBkYi5DaGFyKDM2KQogIHNoZWV0X2lkICAgICAgICAgICAgICBTdHJpbmcgICAgICBAZGIuQ2hhcigzNikKICBkYXRlX2FkZGVkICAgICAgICAgICAgRGF0ZVRpbWUgICAgQGRiLlRpbWVzdGFtcCgwKQogIHBpbm5lZCAgICAgICAgICAgICAgICBCb29sZWFuCiAgZGF0ZV9waW5uZWQgICAgICAgICAgIERhdGVUaW1lPyAgIEBkYi5UaW1lc3RhbXAoMCkKICBjb2xsZWN0aW9ucyAgICAgICAgICAgY29sbGVjdGlvbnMgQHJlbGF0aW9uKGZpZWxkczogW2NvbGxlY3Rpb25faWRdLCByZWZlcmVuY2VzOiBbY29sbGVjdGlvbl9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJjb2xsZWN0aW9uc19zaGVldHNfY29sbGVjdGlvbl9pZF9mayIpCiAgc2hlZXRzICAgICAgICAgICAgICAgIHNoZWV0cyAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtzaGVldF9pZF0sIHJlZmVyZW5jZXM6IFtzaGVldF9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJjb2xsZWN0aW9uc19zaGVldHNfc2hlZXRfaWRfZmsiKQoKICBAQGluZGV4KFtjb2xsZWN0aW9uX2lkXSwgbWFwOiAiY29sbGVjdGlvbnNfc2hlZXRzX2NvbGxlY3Rpb25faWRfZmtfaWR4IikKICBAQGluZGV4KFtzaGVldF9pZF0sIG1hcDogImNvbGxlY3Rpb25zX3NoZWV0c19zaGVldF9pZF9ma19pZHgiKQp9Cgptb2RlbCBjb2xsZWN0aW9uc192aWRlb3MgewogIGNvbGxlY3Rpb25zX3ZpZGVvc19pZCBTdHJpbmcgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJ0ZW1wX2NvbGxlY3Rpb25zX3ZpZGVvc19pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBjb2xsZWN0aW9uX2lkICAgICAgICAgU3RyaW5nICAgICAgQGRiLkNoYXIoMzYpCiAgdmlkZW9faWQgICAgICAgICAgICAgIFN0cmluZyAgICAgIEBkYi5DaGFyKDM2KQogIGRhdGVfYWRkZWQgICAgICAgICAgICBEYXRlVGltZSAgICBAZGIuVGltZXN0YW1wKDApCiAgcGlubmVkICAgICAgICAgICAgICAgIEJvb2xlYW4KICBkYXRlX3Bpbm5lZCAgICAgICAgICAgRGF0ZVRpbWU/ICAgQGRiLlRpbWVzdGFtcCgwKQogIGNvbGxlY3Rpb25zICAgICAgICAgICBjb2xsZWN0aW9ucyBAcmVsYXRpb24oZmllbGRzOiBbY29sbGVjdGlvbl9pZF0sIHJlZmVyZW5jZXM6IFtjb2xsZWN0aW9uX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImNvbGxlY3Rpb25zX3ZpZGVvc19jb2xsZWN0aW9uX2lkX2ZrIikKICB2aWRlb3MgICAgICAgICAgICAgICAgdmlkZW9zICAgICAgQHJlbGF0aW9uKGZpZWxkczogW3ZpZGVvX2lkXSwgcmVmZXJlbmNlczogW3ZpZGVvX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImNvbGxlY3Rpb25zX3ZpZGVvc192aWRlb19pZF9mayIpCgogIEBAaW5kZXgoW2NvbGxlY3Rpb25faWRdLCBtYXA6ICJjb2xsZWN0aW9uc192aWRlb3NfY29sbGVjdGlvbl9pZF9ma19pZHgiKQogIEBAaW5kZXgoW3ZpZGVvX2lkXSwgbWFwOiAiY29sbGVjdGlvbnNfdmlkZW9zX3ZpZGVvX2lkX2ZrX2lkeCIpCn0KCm1vZGVsIGVudGl0aWVzIHsKICBlbnRpdHlfaWQgICAgICAgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgICAgQGlkIEB1bmlxdWUobWFwOiAidGVtcF9lbnRpdHlfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgZW50aXR5X3R5cGUgICAgICAgICAgIEludCAgICAgICAgICAgICAgICAgICAgIEBkZWZhdWx0KDApCiAgY29sbGVjdGlvbnMgICAgICAgICAgIGNvbGxlY3Rpb25zW10KICBlbnRpdGllc19pbWFnZXMgICAgICAgZW50aXRpZXNfaW1hZ2VzW10KICBlbnRpdGllc19yZWZlcmVuY2VzICAgZW50aXRpZXNfcmVmZXJlbmNlc1tdCiAgZW50aXRpZXNfc2hlZXRzICAgICAgIGVudGl0aWVzX3NoZWV0c1tdCiAgZW50aXRpZXNfdmlkZW9zICAgICAgIGVudGl0aWVzX3ZpZGVvc1tdCiAgZ3JvdXBzX21lbWJlcnMgICAgICAgIGdyb3Vwc19tZW1iZXJzW10KICBpbWFnZXMgICAgICAgICAgICAgICAgaW1hZ2VzW10KICBvcmdhbml6YXRpb25zX21lbWJlcnMgb3JnYW5pemF0aW9uc19tZW1iZXJzW10KICBzaGVldHMgICAgICAgICAgICAgICAgc2hlZXRzW10KICB2aWRlb3MgICAgICAgICAgICAgICAgdmlkZW9zW10KfQoKbW9kZWwgZW50aXRpZXNfaW1hZ2VzIHsKICBlbnRpdGllc19pbWFnZXNfaWQgU3RyaW5nICAgIEBpZCBAdW5pcXVlKG1hcDogInRlbXBfZW50aXRpZXNfaW1hZ2VzX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGVudGl0eV9pZCAgICAgICAgICBTdHJpbmcgICAgQGRiLkNoYXIoMzYpCiAgaW1hZ2VfaWQgICAgICAgICAgIFN0cmluZyAgICBAZGIuQ2hhcigzNikKICBkYXRlX2FkZGVkICAgICAgICAgRGF0ZVRpbWUgIEBkYi5UaW1lc3RhbXAoMCkKICBwaW5uZWQgICAgICAgICAgICAgQm9vbGVhbgogIGRhdGVfcGlubmVkICAgICAgICBEYXRlVGltZT8gQGRiLlRpbWVzdGFtcCgwKQogIGVudGl0aWVzICAgICAgICAgICBlbnRpdGllcyAgQHJlbGF0aW9uKGZpZWxkczogW2VudGl0eV9pZF0sIHJlZmVyZW5jZXM6IFtlbnRpdHlfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiZW50aXRpZXNfaW1hZ2VzX2VudGl0eV9pZF9mayIpCiAgaW1hZ2VzICAgICAgICAgICAgIGltYWdlcyAgICBAcmVsYXRpb24oZmllbGRzOiBbaW1hZ2VfaWRdLCByZWZlcmVuY2VzOiBbaW1hZ2VfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiZW50aXRpZXNfaW1hZ2VzX2ltYWdlX2lkX2ZrIikKCiAgQEBpbmRleChbZW50aXR5X2lkXSwgbWFwOiAiZW50aXRpZXNfaW1hZ2VzX2VudGl0eV9pZF9ma19pZHgiKQogIEBAaW5kZXgoW2ltYWdlX2lkXSwgbWFwOiAiZW50aXRpZXNfaW1hZ2VzX2ltYWdlX2lkX2ZrX2lkeCIpCn0KCm1vZGVsIGVudGl0aWVzX3JlZmVyZW5jZXMgewogIHJlZmVyZW5jZV9pZCBTdHJpbmcgICBAaWQgQHVuaXF1ZShtYXA6ICJ0ZW1wX3JlZmVyZW5jZV9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBlbnRpdHlfaWQgICAgU3RyaW5nICAgQGRiLkNoYXIoMzYpCiAgdGl0bGUgICAgICAgIFN0cmluZyAgIEBkYi5WYXJDaGFyKDI1NikKICBhdXRob3IgICAgICAgU3RyaW5nICAgQGRiLlZhckNoYXIoMjU2KQogIHVybCAgICAgICAgICBTdHJpbmcgICBAZGIuVmFyQ2hhcigyNTYpCiAgZW50aXRpZXMgICAgIGVudGl0aWVzIEByZWxhdGlvbihmaWVsZHM6IFtlbnRpdHlfaWRdLCByZWZlcmVuY2VzOiBbZW50aXR5X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImVudGl0aWVzX3JlZmVyZW5jZXNfZW50aXR5X2lkX2ZrIikKCiAgQEBpbmRleChbZW50aXR5X2lkXSwgbWFwOiAiZW50aXRpZXNfcmVmZXJlbmNlc19lbnRpdHlfaWRfZmtfaWR4IikKfQoKbW9kZWwgZW50aXRpZXNfc2hlZXRzIHsKICBlbnRpdGllc19zaGVldHNfaWQgU3RyaW5nICAgIEBpZCBAdW5pcXVlKG1hcDogInRlbXBfZW50aXRpZXNfc2hlZXRzX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGVudGl0eV9pZCAgICAgICAgICBTdHJpbmcgICAgQGRiLkNoYXIoMzYpCiAgc2hlZXRfaWQgICAgICAgICAgIFN0cmluZyAgICBAZGIuQ2hhcigzNikKICBkYXRlX2FkZGVkICAgICAgICAgRGF0ZVRpbWUgIEBkYi5UaW1lc3RhbXAoMCkKICBwaW5uZWQgICAgICAgICAgICAgQm9vbGVhbgogIGRhdGVfcGlubmVkICAgICAgICBEYXRlVGltZT8gQGRiLlRpbWVzdGFtcCgwKQogIGVudGl0aWVzICAgICAgICAgICBlbnRpdGllcyAgQHJlbGF0aW9uKGZpZWxkczogW2VudGl0eV9pZF0sIHJlZmVyZW5jZXM6IFtlbnRpdHlfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiZW50aXRpZXNfc2hlZXRzX2VudGl0eV9pZCIpCiAgc2hlZXRzICAgICAgICAgICAgIHNoZWV0cyAgICBAcmVsYXRpb24oZmllbGRzOiBbc2hlZXRfaWRdLCByZWZlcmVuY2VzOiBbc2hlZXRfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiZW50aXRpZXNfc2hlZXRzX3NoZWV0X2lkIikKCiAgQEBpbmRleChbZW50aXR5X2lkXSkKICBAQGluZGV4KFtzaGVldF9pZF0pCn0KCm1vZGVsIGVudGl0aWVzX3ZpZGVvcyB7CiAgZW50aXRpZXNfdmlkZW9zX2lkIFN0cmluZyAgICBAaWQgQHVuaXF1ZShtYXA6ICJ0ZW1wX2VudGl0aWVzX3ZpZGVvc19pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBlbnRpdHlfaWQgICAgICAgICAgU3RyaW5nICAgIEBkYi5DaGFyKDM2KQogIHZpZGVvX2lkICAgICAgICAgICBTdHJpbmcgICAgQGRiLkNoYXIoMzYpCiAgZGF0ZV9hZGRlZCAgICAgICAgIERhdGVUaW1lICBAZGIuVGltZXN0YW1wKDApCiAgcGlubmVkICAgICAgICAgICAgIEJvb2xlYW4KICBkYXRlX3Bpbm5lZCAgICAgICAgRGF0ZVRpbWU/IEBkYi5UaW1lc3RhbXAoMCkKICBlbnRpdGllcyAgICAgICAgICAgZW50aXRpZXMgIEByZWxhdGlvbihmaWVsZHM6IFtlbnRpdHlfaWRdLCByZWZlcmVuY2VzOiBbZW50aXR5X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImVudGl0aWVzX3ZpZGVvc19lbnRpdHlfaWRfZmsiKQogIHZpZGVvcyAgICAgICAgICAgICB2aWRlb3MgICAgQHJlbGF0aW9uKGZpZWxkczogW3ZpZGVvX2lkXSwgcmVmZXJlbmNlczogW3ZpZGVvX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImVudGl0aWVzX3ZpZGVvc192aWRlb19pZF9mayIpCgogIEBAaW5kZXgoW2VudGl0eV9pZF0sIG1hcDogImVudGl0aWVzX3ZpZGVvc19lbnRpdHlfaWRfZmtfaWR4IikKICBAQGluZGV4KFt2aWRlb19pZF0sIG1hcDogImVudGl0aWVzX3ZpZGVvc192aWRlb19pZF9ma19pZHgiKQp9Cgptb2RlbCBncm91cHMgewogIGdyb3VwX2lkICAgICAgICAgICBTdHJpbmcgICAgICAgICAgIEBpZCBAdW5pcXVlKG1hcDogInRlbXBfZ3JvdXBfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgZ3JvdXBfaGFuZGxlICAgICAgIFN0cmluZyAgICAgICAgICAgQHVuaXF1ZShtYXA6ICJncm91cF9oYW5kbGVfVU5JUVVFIikgQGRiLlZhckNoYXIoMjU2KQogIGdyb3VwX25hbWUgICAgICAgICBTdHJpbmcgICAgICAgICAgIEBkYi5WYXJDaGFyKDI1NikKICBncm91cF9jdXJyZW50SXNzdWUgU3RyaW5nPyAgICAgICAgICBAZGIuVGV4dAogIGdyb3VwX3N0YW5jZXMgICAgICBTdHJpbmc/ICAgICAgICAgIEBkYi5UZXh0CiAgZ3JvdXBfZGVzY3JpcHRpb24gIFN0cmluZz8gICAgICAgICAgQGRiLlRleHQKICBncm91cHNfbWVtYmVycyAgICAgZ3JvdXBzX21lbWJlcnNbXQp9Cgptb2RlbCBncm91cHNfbWVtYmVycyB7CiAgZ3JvdXBzX21lbWJlcnNfaWQgU3RyaW5nICAgQGlkIEB1bmlxdWUobWFwOiAiZ3JvdXBzX21lbWJlcnNfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgZ3JvdXBfaWQgICAgICAgICAgU3RyaW5nICAgQGRiLkNoYXIoMzYpCiAgZW50aXR5X2lkICAgICAgICAgU3RyaW5nICAgQGRiLkNoYXIoMzYpCiAgZW50aXRpZXMgICAgICAgICAgZW50aXRpZXMgQHJlbGF0aW9uKGZpZWxkczogW2VudGl0eV9pZF0sIHJlZmVyZW5jZXM6IFtlbnRpdHlfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiZ3JvdXBzX21lbWJlcnNfZW50aXR5X2lkX2ZrIikKICBncm91cHMgICAgICAgICAgICBncm91cHMgICBAcmVsYXRpb24oZmllbGRzOiBbZ3JvdXBfaWRdLCByZWZlcmVuY2VzOiBbZ3JvdXBfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiZ3JvdXBzX21lbWJlcnNfZ3JvdXBfaWRfZmsiKQoKICBAQHVuaXF1ZShbZ3JvdXBfaWQsIGVudGl0eV9pZF0sIG1hcDogInVuaXF1ZV9ncm91cF9tZW1iZXJfY29tYmluYXRpb24iKQogIEBAaW5kZXgoW2VudGl0eV9pZF0sIG1hcDogImdyb3Vwc19tZW1iZXJzX2VudGl0eV9pZF9mayIpCiAgQEBpbmRleChbZ3JvdXBfaWRdLCBtYXA6ICJncm91cHNfbWVtYmVyc19ncm91cF9pZF9ma19pZHgiKQp9Cgptb2RlbCBpbWFnZXMgewogIGltYWdlX2lkICAgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJ0ZW1wX2ltYWdlX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGltYWdlX2NyZWF0b3JfaWQgICBTdHJpbmcgICAgICAgICAgICAgICBAZGIuQ2hhcigzNikKICBpbWFnZV90aXRsZSAgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgQGRiLlZhckNoYXIoMjU2KQogIGltYWdlX2Rlc2NyaXB0aW9uICBTdHJpbmcgICAgICAgICAgICAgICBAZGIuVGV4dAogIGltYWdlX2ZpbGVuYW1lICAgICBTdHJpbmcgICAgICAgICAgICAgICBAZGIuVmFyQ2hhcigyNTYpCiAgaW1hZ2VfZGF0YV9pZCAgICAgIFN0cmluZyAgICAgICAgICAgICAgIEBkYi5DaGFyKDM2KQogIGNvbGxlY3Rpb25zX2ltYWdlcyBjb2xsZWN0aW9uc19pbWFnZXNbXQogIGVudGl0aWVzX2ltYWdlcyAgICBlbnRpdGllc19pbWFnZXNbXQogIGVudGl0aWVzICAgICAgICAgICBlbnRpdGllcyAgICAgICAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbaW1hZ2VfY3JlYXRvcl9pZF0sIHJlZmVyZW5jZXM6IFtlbnRpdHlfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiaW1hZ2VzX2ltYWdlX2NyZWF0b3JfaWRfZmsiKQogIGltYWdlc19kYXRhICAgICAgICBpbWFnZXNfZGF0YSAgICAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbaW1hZ2VfZGF0YV9pZF0sIHJlZmVyZW5jZXM6IFtpbWFnZV9kYXRhX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImltYWdlc19pbWFnZV9kYXRhX2lkX2ZrIikKCiAgQEBpbmRleChbaW1hZ2VfY3JlYXRvcl9pZF0sIG1hcDogImltYWdlc19pbWFnZV9jcmVhdG9yX2lkX2ZrX2lkeCIpCiAgQEBpbmRleChbaW1hZ2VfZGF0YV9pZF0sIG1hcDogImltYWdlc19pbWFnZV9kYXRhX2lkX2ZrX2lkeCIpCn0KCm1vZGVsIGltYWdlc19kYXRhIHsKICBpbWFnZV9kYXRhX2lkIFN0cmluZyAgIEBpZCBAdW5pcXVlKG1hcDogInRlbXBfaW1hZ2VfZGF0YV9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBpbWFnZV9kYXRhICAgIEJ5dGVzCiAgaW1hZ2VzICAgICAgICBpbWFnZXNbXQp9Cgptb2RlbCBpbmRpdmlkdWFscyB7CiAgaW5kaXZpZHVhbF9pZCAgICAgICAgICAgU3RyaW5nICAgICAgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJ0ZW1wX2luZGl2aWR1YWxfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgaW5kaXZpZHVhbF91c2VybmFtZSAgICAgU3RyaW5nICAgICAgICAgICBAdW5pcXVlKG1hcDogInVzZXJOYW1lX1VOSVFVRSIpIEBkYi5WYXJDaGFyKDI1NikKICBpbmRpdmlkdWFsX25hbWUgICAgICAgICBTdHJpbmcgICAgICAgICAgIEBkYi5WYXJDaGFyKDI1NikKICBpbmRpdmlkdWFsX2N1cnJlbnRJc3N1ZSBTdHJpbmc/ICAgICAgICAgIEBkYi5UZXh0CiAgaW5kaXZpZHVhbF9yb2xlcyAgICAgICAgU3RyaW5nPyAgICAgICAgICBAZGIuVGV4dAogIGluZGl2aWR1YWxfZGVzY3JpcHRpb24gIFN0cmluZz8gICAgICAgICAgQGRiLlRleHQKICB1c2VyX2NyZWRlbnRpYWxzICAgICAgICB1c2VyX2NyZWRlbnRpYWxzIEByZWxhdGlvbihmaWVsZHM6IFtpbmRpdmlkdWFsX2lkXSwgcmVmZXJlbmNlczogW3VzZXJfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiaW5kaXZpZHVhbHNfaW5kaXZpZHVhbF9pZF9mayIpCn0KCm1vZGVsIG9yZ2FuaXphdGlvbnMgewogIG9yZ2FuaXphdGlvbl9pZCAgICAgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgICAgQGlkIEB1bmlxdWUobWFwOiAidGVtcF9vcmdhbml6YXRpb25faWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgb3JnYW5pemF0aW9uX2hhbmRsZSAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgICBAdW5pcXVlKG1hcDogIm9yZ2FuaXphdGlvbl9oYW5kbGVfVU5JUVVFIikgQGRiLlZhckNoYXIoMjU2KQogIG9yZ2FuaXphdGlvbl9uYW1lICAgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgICAgQGRiLlZhckNoYXIoMjU2KQogIG9yZ2FuaXphdGlvbl9jdXJyZW50SXNzdWUgU3RyaW5nPyAgICAgICAgICAgICAgICAgQGRiLlRleHQKICBvcmdhbml6YXRpb25fc3RhbmNlcyAgICAgIFN0cmluZz8gICAgICAgICAgICAgICAgIEBkYi5UZXh0CiAgb3JnYW5pemF0aW9uX2Rlc2NyaXB0aW9uICBTdHJpbmc/ICAgICAgICAgICAgICAgICBAZGIuVGV4dAogIG9yZ2FuaXphdGlvbnNfbWVtYmVycyAgICAgb3JnYW5pemF0aW9uc19tZW1iZXJzW10KfQoKbW9kZWwgb3JnYW5pemF0aW9uc19tZW1iZXJzIHsKICBvcmdhbml6YXRpb25zX21lbWJlcnNfaWQgU3RyaW5nICAgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJ0ZW1wX29yZ2FuaXphdGlvbnNfbWVtYmVyc19pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBvcmdhbml6YXRpb25faWQgICAgICAgICAgU3RyaW5nICAgICAgICBAZGIuQ2hhcigzNikKICBlbnRpdHlfaWQgICAgICAgICAgICAgICAgU3RyaW5nICAgICAgICBAZGIuQ2hhcigzNikKICBlbnRpdGllcyAgICAgICAgICAgICAgICAgZW50aXRpZXMgICAgICBAcmVsYXRpb24oZmllbGRzOiBbZW50aXR5X2lkXSwgcmVmZXJlbmNlczogW2VudGl0eV9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJvcmdhbml6YXRpb25zX21lbWJlcnNfZW50aXR5X2lkX2ZrIikKICBvcmdhbml6YXRpb25zICAgICAgICAgICAgb3JnYW5pemF0aW9ucyBAcmVsYXRpb24oZmllbGRzOiBbb3JnYW5pemF0aW9uX2lkXSwgcmVmZXJlbmNlczogW29yZ2FuaXphdGlvbl9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJvcmdhbml6YXRpb25zX21lbWJlcnNfb3JnYW5pemF0aW9uX2lkX2ZrIikKCiAgQEBpbmRleChbZW50aXR5X2lkXSwgbWFwOiAib3JnYW5pemF0aW9uc19tZW1iZXJzX2VudGl0eV9pZF9ma19pZHgiKQogIEBAaW5kZXgoW29yZ2FuaXphdGlvbl9pZF0sIG1hcDogIm9yZ2FuaXphdGlvbnNfbWVtYmVyc19vcmdhbml6YXRpb25faWRfZmtfaWR4IikKfQoKbW9kZWwgc2hlZXRzIHsKICBzaGVldF9pZCAgICAgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgQGlkIEB1bmlxdWUobWFwOiAidGVtcF9zaGVldF9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBzaGVldF9hdXRob3JfaWQgICAgU3RyaW5nICAgICAgICAgICAgICAgQGRiLkNoYXIoMzYpCiAgc2hlZXRfdGl0bGUgICAgICAgIFN0cmluZyAgICAgICAgICAgICAgIEBkYi5WYXJDaGFyKDI1NikKICBzaGVldF9zdWJqZWN0ICAgICAgU3RyaW5nICAgICAgICAgICAgICAgQGRiLlRleHQKICBzaGVldF9maWxlbmFtZSAgICAgU3RyaW5nICAgICAgICAgICAgICAgQGRiLlZhckNoYXIoMjU2KQogIHNoZWV0X2RhdGFfaWQgICAgICBTdHJpbmcgICAgICAgICAgICAgICBAZGIuQ2hhcigzNikKICBzaGVldF9saWtlcyAgICAgICAgSW50ICAgICAgICAgICAgICAgICAgQGRlZmF1bHQoMCkKICBzaGVldF9kaXNsaWtlcyAgICAgSW50ICAgICAgICAgICAgICAgICAgQGRlZmF1bHQoMCkKICBzaGVldF92aWV3cyAgICAgICAgSW50ICAgICAgICAgICAgICAgICAgQGRlZmF1bHQoMCkKICBzaGVldF9kYXRlX3Bvc3RlZCAgRGF0ZVRpbWUgICAgICAgICAgICAgQGRlZmF1bHQoZGJnZW5lcmF0ZWQoIicyMDAwLTAxLTAxIDAxOjAxOjAxJyIpKSBAZGIuVGltZXN0YW1wKDApCiAgY29sbGVjdGlvbnNfc2hlZXRzIGNvbGxlY3Rpb25zX3NoZWV0c1tdCiAgZW50aXRpZXNfc2hlZXRzICAgIGVudGl0aWVzX3NoZWV0c1tdCiAgZW50aXRpZXMgICAgICAgICAgIGVudGl0aWVzICAgICAgICAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtzaGVldF9hdXRob3JfaWRdLCByZWZlcmVuY2VzOiBbZW50aXR5X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogInNoZWV0c19zaGVldF9hdXRob3JfaWRfZmsiKQogIHNoZWV0c19kYXRhICAgICAgICBzaGVldHNfZGF0YSAgICAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbc2hlZXRfZGF0YV9pZF0sIHJlZmVyZW5jZXM6IFtzaGVldF9kYXRhX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogInNoZWV0c19zaGVldF9kYXRhX2lkX2ZrIikKCiAgQEBpbmRleChbc2hlZXRfZGF0YV9pZF0sIG1hcDogIlNoZWV0c19zaGVldF9kYXRhX2lkX2ZrX2lkeCIpCiAgQEBpbmRleChbc2hlZXRfYXV0aG9yX2lkXSwgbWFwOiAic2hlZXRzX3NoZWV0X2F1dGhvcl9pZF9ma19pZHgiKQp9Cgptb2RlbCBzaGVldHNfZGF0YSB7CiAgc2hlZXRfZGF0YV9pZCBTdHJpbmcgICBAaWQgQHVuaXF1ZShtYXA6ICJ0ZW1wX3NoZWV0X2RhdGFfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgc2hlZXRfZGF0YSAgICBCeXRlcwogIHNoZWV0cyAgICAgICAgc2hlZXRzW10KfQoKbW9kZWwgdXNlcl9jcmVkZW50aWFscyB7CiAgdXNlcl9pZCAgICAgICAgICAgU3RyaW5nICAgICAgIEBpZCBAdW5pcXVlKG1hcDogInVzZXJfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgdXNlcm5hbWUgICAgICAgICAgU3RyaW5nICAgICAgIEB1bmlxdWUobWFwOiAidXNlcm5hbWVfVU5JUVVFIikgQGRiLlZhckNoYXIoMTI4KQogIHVzZXJfcGFzc3dvcmQgICAgIFN0cmluZyAgICAgICBAZGIuVmFyQ2hhcigxMjgpCiAgdXNlcl9maXJzdF9uYW1lICAgU3RyaW5nPyAgICAgIEBkYi5WYXJDaGFyKDEyOCkKICB1c2VyX2xhc3RfbmFtZSAgICBTdHJpbmc/ICAgICAgQGRiLlZhckNoYXIoMTI4KQogIHVzZXJfZW1haWwgICAgICAgIFN0cmluZz8gICAgICBAZGIuVmFyQ2hhcigxMjgpCiAgdXNlcl9waG9uZV9udW1iZXIgU3RyaW5nPyAgICAgIEBkYi5WYXJDaGFyKDE1KQogIGluZGl2aWR1YWxzICAgICAgIGluZGl2aWR1YWxzPwp9Cgptb2RlbCB2aWRlb3MgewogIHZpZGVvX2lkICAgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJ0ZW1wX3ZpZGVvX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIHZpZGVvX2NyZWF0b3JfaWQgICBTdHJpbmcgICAgICAgICAgICAgICBAZGIuQ2hhcigzNikKICB2aWRlb190aXRsZSAgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgQGRiLlZhckNoYXIoMjU2KQogIHZpZGVvX2Rlc2NyaXB0aW9uICBTdHJpbmcgICAgICAgICAgICAgICBAZGIuVGV4dAogIHZpZGVvX2ZpbGVuYW1lICAgICBTdHJpbmcgICAgICAgICAgICAgICBAZGIuVmFyQ2hhcigyNTYpCiAgdmlkZW9fZGF0YV9pZCAgICAgIFN0cmluZyAgICAgICAgICAgICAgIEBkYi5DaGFyKDM2KQogIGNvbGxlY3Rpb25zX3ZpZGVvcyBjb2xsZWN0aW9uc192aWRlb3NbXQogIGVudGl0aWVzX3ZpZGVvcyAgICBlbnRpdGllc192aWRlb3NbXQogIGVudGl0aWVzICAgICAgICAgICBlbnRpdGllcyAgICAgICAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbdmlkZW9fY3JlYXRvcl9pZF0sIHJlZmVyZW5jZXM6IFtlbnRpdHlfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAidmlkZW9zX3ZpZGVvX2NyZWF0b3JfaWRfZmsiKQogIHZpZGVvc19kYXRhICAgICAgICB2aWRlb3NfZGF0YSAgICAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbdmlkZW9fZGF0YV9pZF0sIHJlZmVyZW5jZXM6IFt2aWRlb19kYXRhX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogInZpZGVvc192aWRlb19kYXRhX2lkX2ZrIikKCiAgQEBpbmRleChbdmlkZW9fY3JlYXRvcl9pZF0sIG1hcDogInZpZGVvc192aWRlb19jcmVhdG9yX2lkX2ZrX2lkeCIpCiAgQEBpbmRleChbdmlkZW9fZGF0YV9pZF0sIG1hcDogInZpZGVvc192aWRlb19kYXRhX2lkX2ZrX2lkeCIpCn0KCm1vZGVsIHZpZGVvc19kYXRhIHsKICB2aWRlb19kYXRhX2lkIFN0cmluZyAgIEBpZCBAdW5pcXVlKG1hcDogInRlbXBfdmlkZW9fZGF0YV9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICB2aWRlb19kYXRhICAgIEJ5dGVzCiAgdmlkZW9zICAgICAgICB2aWRlb3NbXQp9Cg==",
  "inlineSchemaHash": "d24208b796a8f9d3f6e61c9e67b90e861dd94b39697eb35a3366eda2f6d52c8b",
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

config.runtimeDataModel = JSON.parse("{\"models\":{\"affiliates_relations\":{\"dbName\":null,\"fields\":[{\"name\":\"affiliate_relation_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"affiliate_id_1\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"affiliate_id_2\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"affiliate_id_1\",\"affiliate_id_2\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"affiliate_id_1\",\"affiliate_id_2\"]}],\"isGenerated\":false},\"collections\":{\"dbName\":null,\"fields\":[{\"name\":\"collection_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collection_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"collectionsToentities\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections_images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections_images\",\"relationName\":\"collectionsTocollections_images\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections_sheets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections_sheets\",\"relationName\":\"collectionsTocollections_sheets\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections_videos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections_videos\",\"relationName\":\"collectionsTocollections_videos\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"collections_images\":{\"dbName\":null,\"fields\":[{\"name\":\"collections_images_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collection_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_added\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections\",\"relationName\":\"collectionsTocollections_images\",\"relationFromFields\":[\"collection_id\"],\"relationToFields\":[\"collection_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images\",\"relationName\":\"collections_imagesToimages\",\"relationFromFields\":[\"image_id\"],\"relationToFields\":[\"image_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"collections_sheets\":{\"dbName\":null,\"fields\":[{\"name\":\"collections_sheets_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collection_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_added\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections\",\"relationName\":\"collectionsTocollections_sheets\",\"relationFromFields\":[\"collection_id\"],\"relationToFields\":[\"collection_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets\",\"relationName\":\"collections_sheetsTosheets\",\"relationFromFields\":[\"sheet_id\"],\"relationToFields\":[\"sheet_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"collections_videos\":{\"dbName\":null,\"fields\":[{\"name\":\"collections_videos_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collection_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_added\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections\",\"relationName\":\"collectionsTocollections_videos\",\"relationFromFields\":[\"collection_id\"],\"relationToFields\":[\"collection_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos\",\"relationName\":\"collections_videosTovideos\",\"relationFromFields\":[\"video_id\"],\"relationToFields\":[\"video_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities\":{\"dbName\":null,\"fields\":[{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections\",\"relationName\":\"collectionsToentities\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_images\",\"relationName\":\"entitiesToentities_images\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_references\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_references\",\"relationName\":\"entitiesToentities_references\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_sheets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_sheets\",\"relationName\":\"entitiesToentities_sheets\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_videos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_videos\",\"relationName\":\"entitiesToentities_videos\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups_members\",\"relationName\":\"entitiesTogroups_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images\",\"relationName\":\"entitiesToimages\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations_members\",\"relationName\":\"entitiesToorganizations_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets\",\"relationName\":\"entitiesTosheets\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos\",\"relationName\":\"entitiesTovideos\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities_images\":{\"dbName\":null,\"fields\":[{\"name\":\"entities_images_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_added\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_images\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images\",\"relationName\":\"entities_imagesToimages\",\"relationFromFields\":[\"image_id\"],\"relationToFields\":[\"image_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities_references\":{\"dbName\":null,\"fields\":[{\"name\":\"reference_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"author\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_references\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities_sheets\":{\"dbName\":null,\"fields\":[{\"name\":\"entities_sheets_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_added\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_sheets\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets\",\"relationName\":\"entities_sheetsTosheets\",\"relationFromFields\":[\"sheet_id\"],\"relationToFields\":[\"sheet_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities_videos\":{\"dbName\":null,\"fields\":[{\"name\":\"entities_videos_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_added\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_videos\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos\",\"relationName\":\"entities_videosTovideos\",\"relationFromFields\":[\"video_id\"],\"relationToFields\":[\"video_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"groups\":{\"dbName\":null,\"fields\":[{\"name\":\"group_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_handle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_currentIssue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_stances\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups_members\",\"relationName\":\"groupsTogroups_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"groups_members\":{\"dbName\":null,\"fields\":[{\"name\":\"groups_members_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesTogroups_members\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups\",\"relationName\":\"groupsTogroups_members\",\"relationFromFields\":[\"group_id\"],\"relationToFields\":[\"group_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"group_id\",\"entity_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"group_id\",\"entity_id\"]}],\"isGenerated\":false},\"images\":{\"dbName\":null,\"fields\":[{\"name\":\"image_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections_images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections_images\",\"relationName\":\"collections_imagesToimages\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_images\",\"relationName\":\"entities_imagesToimages\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToimages\",\"relationFromFields\":[\"image_creator_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images_data\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images_data\",\"relationName\":\"imagesToimages_data\",\"relationFromFields\":[\"image_data_id\"],\"relationToFields\":[\"image_data_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"images_data\":{\"dbName\":null,\"fields\":[{\"name\":\"image_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images\",\"relationName\":\"imagesToimages_data\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"individuals\":{\"dbName\":null,\"fields\":[{\"name\":\"individual_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_currentIssue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_roles\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_credentials\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"user_credentials\",\"relationName\":\"individualsTouser_credentials\",\"relationFromFields\":[\"individual_id\"],\"relationToFields\":[\"user_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"organizations\":{\"dbName\":null,\"fields\":[{\"name\":\"organization_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_handle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_currentIssue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_stances\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations_members\",\"relationName\":\"organizationsToorganizations_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"organizations_members\":{\"dbName\":null,\"fields\":[{\"name\":\"organizations_members_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToorganizations_members\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations\",\"relationName\":\"organizationsToorganizations_members\",\"relationFromFields\":[\"organization_id\"],\"relationToFields\":[\"organization_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"sheets\":{\"dbName\":null,\"fields\":[{\"name\":\"sheet_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_author_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_subject\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_views\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_date_posted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"'2000-01-01 01:01:01'\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections_sheets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections_sheets\",\"relationName\":\"collections_sheetsTosheets\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_sheets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_sheets\",\"relationName\":\"entities_sheetsTosheets\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesTosheets\",\"relationFromFields\":[\"sheet_author_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets_data\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets_data\",\"relationName\":\"sheetsTosheets_data\",\"relationFromFields\":[\"sheet_data_id\"],\"relationToFields\":[\"sheet_data_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"sheets_data\":{\"dbName\":null,\"fields\":[{\"name\":\"sheet_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets\",\"relationName\":\"sheetsTosheets_data\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"user_credentials\":{\"dbName\":null,\"fields\":[{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_first_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_last_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_phone_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individuals\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"individuals\",\"relationName\":\"individualsTouser_credentials\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"videos\":{\"dbName\":null,\"fields\":[{\"name\":\"video_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections_videos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections_videos\",\"relationName\":\"collections_videosTovideos\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_videos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_videos\",\"relationName\":\"entities_videosTovideos\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesTovideos\",\"relationFromFields\":[\"video_creator_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos_data\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos_data\",\"relationName\":\"videosTovideos_data\",\"relationFromFields\":[\"video_data_id\"],\"relationToFields\":[\"video_data_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"videos_data\":{\"dbName\":null,\"fields\":[{\"name\":\"video_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos\",\"relationName\":\"videosTovideos_data\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
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
