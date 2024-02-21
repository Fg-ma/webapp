
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
} = require('./runtime/edge.js')


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
  "inlineSchema": "Z2VuZXJhdG9yIGNsaWVudCB7CiAgcHJvdmlkZXIgPSAicHJpc21hLWNsaWVudC1qcyIKICBvdXRwdXQgICA9ICIuL2dlbmVyYXRlZCIKfQoKZGF0YXNvdXJjZSBkYiB7CiAgcHJvdmlkZXIgPSAibXlzcWwiCiAgdXJsICAgICAgPSBlbnYoIkRBVEFCQVNFX1VSTCIpCn0KCm1vZGVsIGFmZmlsaWF0ZXNfcmVsYXRpb25zIHsKICBhZmZpbGlhdGVfcmVsYXRpb25faWQgU3RyaW5nIEBpZCBAdW5pcXVlKG1hcDogImFmZmlsaWF0ZV9yZWxhdGlvbl9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBhZmZpbGlhdGVfaWRfMSAgICAgICAgU3RyaW5nIEBkYi5DaGFyKDM2KQogIGFmZmlsaWF0ZV9pZF8yICAgICAgICBTdHJpbmcgQGRiLkNoYXIoMzYpCgogIEBAdW5pcXVlKFthZmZpbGlhdGVfaWRfMSwgYWZmaWxpYXRlX2lkXzJdLCBtYXA6ICJ1bmlxdWVfYWZmaWxpYXRlX2NvbWJpbmF0aW9uIikKfQoKbW9kZWwgY29sbGVjdGlvbnMgewogIGNvbGxlY3Rpb25faWQgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgIEBpZCBAdW5pcXVlKG1hcDogInRlbXBfY29sbGVjdGlvbl9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBjb2xsZWN0aW9uX25hbWUgICAgIFN0cmluZyAgICAgICAgICAgICAgICBAZGIuVmFyQ2hhcigyNTYpCiAgZW50aXR5X2lkICAgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgQGRiLkNoYXIoMzYpCiAgZW50aXRpZXMgICAgICAgICAgICBlbnRpdGllcyAgICAgICAgICAgICAgQHJlbGF0aW9uKGZpZWxkczogW2VudGl0eV9pZF0sIHJlZmVyZW5jZXM6IFtlbnRpdHlfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiY29sbGVjdGlvbnNfZW50aXR5X2lkX2ZrIikKICBjb2xsZWN0aW9uc19jb250ZW50IGNvbGxlY3Rpb25zX2NvbnRlbnRbXQoKICBAQGluZGV4KFtlbnRpdHlfaWRdLCBtYXA6ICJjb2xsZWN0aW9uc19lbnRpdHlfaWRfZmtfaWR4IikKfQoKbW9kZWwgY29sbGVjdGlvbnNfY29udGVudCB7CiAgY29sbGVjdGlvbnNfY29udGVudF9pZCBTdHJpbmcgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJjb2xsZWN0aW9uc19jb250ZW50X2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGNvbGxlY3Rpb25faWQgICAgICAgICAgU3RyaW5nICAgICAgQGRiLkNoYXIoMzYpCiAgY29udGVudF9pZCAgICAgICAgICAgICBTdHJpbmcgICAgICBAZGIuQ2hhcigzNikKICBkYXRlX2FkZGVkICAgICAgICAgICAgIERhdGVUaW1lICAgIEBkYi5UaW1lc3RhbXAoMCkKICBwaW5uZWQgICAgICAgICAgICAgICAgIEJvb2xlYW4KICBkYXRlX3Bpbm5lZCAgICAgICAgICAgIERhdGVUaW1lPyAgIEBkYi5UaW1lc3RhbXAoMCkKICBjb2xsZWN0aW9ucyAgICAgICAgICAgIGNvbGxlY3Rpb25zIEByZWxhdGlvbihmaWVsZHM6IFtjb2xsZWN0aW9uX2lkXSwgcmVmZXJlbmNlczogW2NvbGxlY3Rpb25faWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiY29sbGVjdGlvbnNfY29udGVudF9jb2xsZWN0aW9uX2lkX2ZrIikKICBjb250ZW50ICAgICAgICAgICAgICAgIGNvbnRlbnQgICAgIEByZWxhdGlvbihmaWVsZHM6IFtjb250ZW50X2lkXSwgcmVmZXJlbmNlczogW2NvbnRlbnRfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiY29sbGVjdGlvbnNfY29udGVudF9jb250ZW50X2lkX2ZrIikKCiAgQEBpbmRleChbY29sbGVjdGlvbl9pZF0sIG1hcDogImNvbGxlY3Rpb25zX2NvbnRlbnRfY29sbGVjdGlvbl9pZF9ma19pZHgiKQogIEBAaW5kZXgoW2NvbnRlbnRfaWRdLCBtYXA6ICJjb2xsZWN0aW9uc19jb250ZW50X2NvbnRlbnRfaWRfZmtfaWR4IikKfQoKbW9kZWwgY29udGVudCB7CiAgY29udGVudF9pZCAgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgQGlkIEB1bmlxdWUobWFwOiAibWVkaWFfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgY29udGVudF90eXBlICAgICAgICBJbnQ/CiAgY29sbGVjdGlvbnNfY29udGVudCBjb2xsZWN0aW9uc19jb250ZW50W10KICBlbnRpdGllc19jb250ZW50ICAgIGVudGl0aWVzX2NvbnRlbnRbXQogIGVudGl0aWVzX2Rpc2xpa2VzICAgZW50aXRpZXNfZGlzbGlrZXNbXQogIGVudGl0aWVzX2xpa2VzICAgICAgZW50aXRpZXNfbGlrZXNbXQp9Cgptb2RlbCBlbnRpdGllcyB7CiAgZW50aXR5X2lkICAgICAgICAgICAgIFN0cmluZyAgICAgICAgICAgICAgICAgIEBpZCBAdW5pcXVlKG1hcDogInRlbXBfZW50aXR5X2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGVudGl0eV90eXBlICAgICAgICAgICBJbnQgICAgICAgICAgICAgICAgICAgICBAZGVmYXVsdCgwKQogIGNvbGxlY3Rpb25zICAgICAgICAgICBjb2xsZWN0aW9uc1tdCiAgZW50aXRpZXNfY29udGVudCAgICAgIGVudGl0aWVzX2NvbnRlbnRbXQogIGVudGl0aWVzX2Rpc2xpa2VzICAgICBlbnRpdGllc19kaXNsaWtlc1tdCiAgZW50aXRpZXNfbGlrZXMgICAgICAgIGVudGl0aWVzX2xpa2VzW10KICBlbnRpdGllc19yZWZlcmVuY2VzICAgZW50aXRpZXNfcmVmZXJlbmNlc1tdCiAgZ3JvdXBzX21lbWJlcnMgICAgICAgIGdyb3Vwc19tZW1iZXJzW10KICBpbWFnZXMgICAgICAgICAgICAgICAgaW1hZ2VzW10KICBvcmdhbml6YXRpb25zX21lbWJlcnMgb3JnYW5pemF0aW9uc19tZW1iZXJzW10KICBzaGVldHMgICAgICAgICAgICAgICAgc2hlZXRzW10KICB2aWRlb3MgICAgICAgICAgICAgICAgdmlkZW9zW10KfQoKbW9kZWwgZW50aXRpZXNfY29udGVudCB7CiAgZW50aXRpZXNfY29udGVudF9pZCBTdHJpbmcgICAgQGlkIEB1bmlxdWUobWFwOiAiZW50aXRpZXNfY29udGVudF9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBlbnRpdHlfaWQgICAgICAgICAgIFN0cmluZyAgICBAZGIuQ2hhcigzNikKICBjb250ZW50X2lkICAgICAgICAgIFN0cmluZyAgICBAZGIuQ2hhcigzNikKICBkYXRlX2FkZGVkICAgICAgICAgIERhdGVUaW1lICBAZGIuVGltZXN0YW1wKDApCiAgcGlubmVkICAgICAgICAgICAgICBCb29sZWFuCiAgZGF0ZV9waW5uZWQgICAgICAgICBEYXRlVGltZT8gQGRiLlRpbWVzdGFtcCgwKQogIGNvbnRlbnQgICAgICAgICAgICAgY29udGVudCAgIEByZWxhdGlvbihmaWVsZHM6IFtjb250ZW50X2lkXSwgcmVmZXJlbmNlczogW2NvbnRlbnRfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiZW50aXRpZXNfY29udGVudF9jb250ZW50X2lkIikKICBlbnRpdGllcyAgICAgICAgICAgIGVudGl0aWVzICBAcmVsYXRpb24oZmllbGRzOiBbZW50aXR5X2lkXSwgcmVmZXJlbmNlczogW2VudGl0eV9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJlbnRpdGllc19jb250ZW50X2VudGl0eV9pZCIpCgogIEBAaW5kZXgoW2NvbnRlbnRfaWRdKQogIEBAaW5kZXgoW2VudGl0eV9pZF0pCn0KCm1vZGVsIGVudGl0aWVzX2Rpc2xpa2VzIHsKICBkaXNsaWtlX2lkIFN0cmluZyAgIEBpZCBAdW5pcXVlKG1hcDogImRpc2xpa2VfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgZW50aXR5X2lkICBTdHJpbmcgICBAZGIuQ2hhcigzNikKICBjb250ZW50X2lkIFN0cmluZyAgIEBkYi5DaGFyKDM2KQogIGNvbnRlbnQgICAgY29udGVudCAgQHJlbGF0aW9uKGZpZWxkczogW2NvbnRlbnRfaWRdLCByZWZlcmVuY2VzOiBbY29udGVudF9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJlbnRpdGllc19kaXNsaWtlc19jb250ZW50X2lkX2ZrIikKICBlbnRpdGllcyAgIGVudGl0aWVzIEByZWxhdGlvbihmaWVsZHM6IFtlbnRpdHlfaWRdLCByZWZlcmVuY2VzOiBbZW50aXR5X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImVudGl0aWVzX2Rpc2xpa2VzX2VudGl0eV9pZF9mayIpCgogIEBAdW5pcXVlKFtlbnRpdHlfaWQsIGNvbnRlbnRfaWRdLCBtYXA6ICJlbnRpdGllc19kaXNsaWtlc191bmlxdWVfY29tYmluYXRpb24iKQogIEBAaW5kZXgoW2NvbnRlbnRfaWRdLCBtYXA6ICJlbnRpdGllc19kaXNsaWtlc19jb250ZW50X2lkX2ZrX2lkeCIpCn0KCm1vZGVsIGVudGl0aWVzX2xpa2VzIHsKICBsaWtlX2lkICAgIFN0cmluZyAgIEBpZCBAdW5pcXVlKG1hcDogImxpa2VfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgZW50aXR5X2lkICBTdHJpbmcgICBAZGIuQ2hhcigzNikKICBjb250ZW50X2lkIFN0cmluZyAgIEBkYi5DaGFyKDM2KQogIGNvbnRlbnQgICAgY29udGVudCAgQHJlbGF0aW9uKGZpZWxkczogW2NvbnRlbnRfaWRdLCByZWZlcmVuY2VzOiBbY29udGVudF9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJlbnRpdGllc19saWtlc19jb250ZW50X2lkX2ZrIikKICBlbnRpdGllcyAgIGVudGl0aWVzIEByZWxhdGlvbihmaWVsZHM6IFtlbnRpdHlfaWRdLCByZWZlcmVuY2VzOiBbZW50aXR5X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImVudGl0aWVzX2xpa2VzX2VudGl0eV9pZF9mayIpCgogIEBAdW5pcXVlKFtlbnRpdHlfaWQsIGNvbnRlbnRfaWRdLCBtYXA6ICJlbnRpdGllc19saWtlc191bmlxdWVfY29tYmluYXRpb24iKQogIEBAaW5kZXgoW2NvbnRlbnRfaWRdLCBtYXA6ICJlbnRpdGllc19saWtlc19jb250ZW50X2lkX2ZrX2lkeCIpCiAgQEBpbmRleChbZW50aXR5X2lkXSwgbWFwOiAiZW50aXRpZXNfbGlrZXNfZW50aXR5X2lkX2ZrX2lkeCIpCn0KCm1vZGVsIGVudGl0aWVzX3JlZmVyZW5jZXMgewogIHJlZmVyZW5jZV9pZCBTdHJpbmcgICBAaWQgQHVuaXF1ZShtYXA6ICJ0ZW1wX3JlZmVyZW5jZV9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBlbnRpdHlfaWQgICAgU3RyaW5nICAgQGRiLkNoYXIoMzYpCiAgdGl0bGUgICAgICAgIFN0cmluZyAgIEBkYi5WYXJDaGFyKDI1NikKICBhdXRob3IgICAgICAgU3RyaW5nICAgQGRiLlZhckNoYXIoMjU2KQogIHVybCAgICAgICAgICBTdHJpbmcgICBAZGIuVmFyQ2hhcigyNTYpCiAgZW50aXRpZXMgICAgIGVudGl0aWVzIEByZWxhdGlvbihmaWVsZHM6IFtlbnRpdHlfaWRdLCByZWZlcmVuY2VzOiBbZW50aXR5X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImVudGl0aWVzX3JlZmVyZW5jZXNfZW50aXR5X2lkX2ZrIikKCiAgQEBpbmRleChbZW50aXR5X2lkXSwgbWFwOiAiZW50aXRpZXNfcmVmZXJlbmNlc19lbnRpdHlfaWRfZmtfaWR4IikKfQoKbW9kZWwgZ3JvdXBzIHsKICBncm91cF9pZCAgICAgICAgICAgU3RyaW5nICAgICAgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJ0ZW1wX2dyb3VwX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGdyb3VwX2hhbmRsZSAgICAgICBTdHJpbmcgICAgICAgICAgIEB1bmlxdWUobWFwOiAiZ3JvdXBfaGFuZGxlX1VOSVFVRSIpIEBkYi5WYXJDaGFyKDI1NikKICBncm91cF9uYW1lICAgICAgICAgU3RyaW5nICAgICAgICAgICBAZGIuVmFyQ2hhcigyNTYpCiAgZ3JvdXBfY3VycmVudElzc3VlIFN0cmluZz8gICAgICAgICAgQGRiLlRleHQKICBncm91cF9zdGFuY2VzICAgICAgU3RyaW5nPyAgICAgICAgICBAZGIuVGV4dAogIGdyb3VwX2Rlc2NyaXB0aW9uICBTdHJpbmc/ICAgICAgICAgIEBkYi5UZXh0CiAgZ3JvdXBzX21lbWJlcnMgICAgIGdyb3Vwc19tZW1iZXJzW10KfQoKbW9kZWwgZ3JvdXBzX21lbWJlcnMgewogIGdyb3Vwc19tZW1iZXJzX2lkIFN0cmluZyAgIEBpZCBAdW5pcXVlKG1hcDogImdyb3Vwc19tZW1iZXJzX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGdyb3VwX2lkICAgICAgICAgIFN0cmluZyAgIEBkYi5DaGFyKDM2KQogIGVudGl0eV9pZCAgICAgICAgIFN0cmluZyAgIEBkYi5DaGFyKDM2KQogIGVudGl0aWVzICAgICAgICAgIGVudGl0aWVzIEByZWxhdGlvbihmaWVsZHM6IFtlbnRpdHlfaWRdLCByZWZlcmVuY2VzOiBbZW50aXR5X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImdyb3Vwc19tZW1iZXJzX2VudGl0eV9pZF9mayIpCiAgZ3JvdXBzICAgICAgICAgICAgZ3JvdXBzICAgQHJlbGF0aW9uKGZpZWxkczogW2dyb3VwX2lkXSwgcmVmZXJlbmNlczogW2dyb3VwX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImdyb3Vwc19tZW1iZXJzX2dyb3VwX2lkX2ZrIikKCiAgQEB1bmlxdWUoW2dyb3VwX2lkLCBlbnRpdHlfaWRdLCBtYXA6ICJ1bmlxdWVfZ3JvdXBfbWVtYmVyX2NvbWJpbmF0aW9uIikKICBAQGluZGV4KFtlbnRpdHlfaWRdLCBtYXA6ICJncm91cHNfbWVtYmVyc19lbnRpdHlfaWRfZmsiKQogIEBAaW5kZXgoW2dyb3VwX2lkXSwgbWFwOiAiZ3JvdXBzX21lbWJlcnNfZ3JvdXBfaWRfZmtfaWR4IikKfQoKbW9kZWwgaW1hZ2VzIHsKICBpbWFnZV9pZCAgICAgICAgICBTdHJpbmcgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJ0ZW1wX2ltYWdlX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGltYWdlX2NyZWF0b3JfaWQgIFN0cmluZyAgICAgIEBkYi5DaGFyKDM2KQogIGltYWdlX3RpdGxlICAgICAgIFN0cmluZyAgICAgIEBkYi5WYXJDaGFyKDI1NikKICBpbWFnZV9kZXNjcmlwdGlvbiBTdHJpbmcgICAgICBAZGIuVGV4dAogIGltYWdlX2ZpbGVuYW1lICAgIFN0cmluZyAgICAgIEBkYi5WYXJDaGFyKDI1NikKICBpbWFnZV9kYXRhX2lkICAgICBTdHJpbmcgICAgICBAZGIuQ2hhcigzNikKICBpbWFnZV9saWtlcyAgICAgICBJbnQgICAgICAgICBAZGVmYXVsdCgwKQogIGltYWdlX2Rpc2xpa2VzICAgIEludCAgICAgICAgIEBkZWZhdWx0KDApCiAgaW1hZ2Vfdmlld3MgICAgICAgSW50ICAgICAgICAgQGRlZmF1bHQoMCkKICBpbWFnZV9kYXRlX3Bvc3RlZCBEYXRlVGltZSAgICBAZGVmYXVsdChkYmdlbmVyYXRlZCgiJzIwMDAtMDEtMDEgMDE6MDE6MDEnIikpIEBkYi5UaW1lc3RhbXAoMCkKICBlbnRpdGllcyAgICAgICAgICBlbnRpdGllcyAgICBAcmVsYXRpb24oZmllbGRzOiBbaW1hZ2VfY3JlYXRvcl9pZF0sIHJlZmVyZW5jZXM6IFtlbnRpdHlfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiaW1hZ2VzX2ltYWdlX2NyZWF0b3JfaWRfZmsiKQogIGltYWdlc19kYXRhICAgICAgIGltYWdlc19kYXRhIEByZWxhdGlvbihmaWVsZHM6IFtpbWFnZV9kYXRhX2lkXSwgcmVmZXJlbmNlczogW2ltYWdlX2RhdGFfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiaW1hZ2VzX2ltYWdlX2RhdGFfaWRfZmsiKQoKICBAQGluZGV4KFtpbWFnZV9jcmVhdG9yX2lkXSwgbWFwOiAiaW1hZ2VzX2ltYWdlX2NyZWF0b3JfaWRfZmtfaWR4IikKICBAQGluZGV4KFtpbWFnZV9kYXRhX2lkXSwgbWFwOiAiaW1hZ2VzX2ltYWdlX2RhdGFfaWRfZmtfaWR4IikKfQoKbW9kZWwgaW1hZ2VzX2RhdGEgewogIGltYWdlX2RhdGFfaWQgU3RyaW5nICAgQGlkIEB1bmlxdWUobWFwOiAidGVtcF9pbWFnZV9kYXRhX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGltYWdlX2RhdGEgICAgQnl0ZXMKICBpbWFnZXMgICAgICAgIGltYWdlc1tdCn0KCm1vZGVsIGluZGl2aWR1YWxzIHsKICBpbmRpdmlkdWFsX2lkICAgICAgICAgICBTdHJpbmcgICAgICAgICAgIEBpZCBAdW5pcXVlKG1hcDogInRlbXBfaW5kaXZpZHVhbF9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBpbmRpdmlkdWFsX3VzZXJuYW1lICAgICBTdHJpbmcgICAgICAgICAgIEB1bmlxdWUobWFwOiAidXNlck5hbWVfVU5JUVVFIikgQGRiLlZhckNoYXIoMjU2KQogIGluZGl2aWR1YWxfbmFtZSAgICAgICAgIFN0cmluZyAgICAgICAgICAgQGRiLlZhckNoYXIoMjU2KQogIGluZGl2aWR1YWxfY3VycmVudElzc3VlIFN0cmluZz8gICAgICAgICAgQGRiLlRleHQKICBpbmRpdmlkdWFsX3JvbGVzICAgICAgICBTdHJpbmc/ICAgICAgICAgIEBkYi5UZXh0CiAgaW5kaXZpZHVhbF9kZXNjcmlwdGlvbiAgU3RyaW5nPyAgICAgICAgICBAZGIuVGV4dAogIHVzZXJfY3JlZGVudGlhbHMgICAgICAgIHVzZXJfY3JlZGVudGlhbHMgQHJlbGF0aW9uKGZpZWxkczogW2luZGl2aWR1YWxfaWRdLCByZWZlcmVuY2VzOiBbdXNlcl9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJpbmRpdmlkdWFsc19pbmRpdmlkdWFsX2lkX2ZrIikKfQoKbW9kZWwgb3JnYW5pemF0aW9ucyB7CiAgb3JnYW5pemF0aW9uX2lkICAgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJ0ZW1wX29yZ2FuaXphdGlvbl9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBvcmdhbml6YXRpb25faGFuZGxlICAgICAgIFN0cmluZyAgICAgICAgICAgICAgICAgIEB1bmlxdWUobWFwOiAib3JnYW5pemF0aW9uX2hhbmRsZV9VTklRVUUiKSBAZGIuVmFyQ2hhcigyNTYpCiAgb3JnYW5pemF0aW9uX25hbWUgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgICBAZGIuVmFyQ2hhcigyNTYpCiAgb3JnYW5pemF0aW9uX2N1cnJlbnRJc3N1ZSBTdHJpbmc/ICAgICAgICAgICAgICAgICBAZGIuVGV4dAogIG9yZ2FuaXphdGlvbl9zdGFuY2VzICAgICAgU3RyaW5nPyAgICAgICAgICAgICAgICAgQGRiLlRleHQKICBvcmdhbml6YXRpb25fZGVzY3JpcHRpb24gIFN0cmluZz8gICAgICAgICAgICAgICAgIEBkYi5UZXh0CiAgb3JnYW5pemF0aW9uc19tZW1iZXJzICAgICBvcmdhbml6YXRpb25zX21lbWJlcnNbXQp9Cgptb2RlbCBvcmdhbml6YXRpb25zX21lbWJlcnMgewogIG9yZ2FuaXphdGlvbnNfbWVtYmVyc19pZCBTdHJpbmcgICAgICAgIEBpZCBAdW5pcXVlKG1hcDogInRlbXBfb3JnYW5pemF0aW9uc19tZW1iZXJzX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIG9yZ2FuaXphdGlvbl9pZCAgICAgICAgICBTdHJpbmcgICAgICAgIEBkYi5DaGFyKDM2KQogIGVudGl0eV9pZCAgICAgICAgICAgICAgICBTdHJpbmcgICAgICAgIEBkYi5DaGFyKDM2KQogIGVudGl0aWVzICAgICAgICAgICAgICAgICBlbnRpdGllcyAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtlbnRpdHlfaWRdLCByZWZlcmVuY2VzOiBbZW50aXR5X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogIm9yZ2FuaXphdGlvbnNfbWVtYmVyc19lbnRpdHlfaWRfZmsiKQogIG9yZ2FuaXphdGlvbnMgICAgICAgICAgICBvcmdhbml6YXRpb25zIEByZWxhdGlvbihmaWVsZHM6IFtvcmdhbml6YXRpb25faWRdLCByZWZlcmVuY2VzOiBbb3JnYW5pemF0aW9uX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogIm9yZ2FuaXphdGlvbnNfbWVtYmVyc19vcmdhbml6YXRpb25faWRfZmsiKQoKICBAQGluZGV4KFtlbnRpdHlfaWRdLCBtYXA6ICJvcmdhbml6YXRpb25zX21lbWJlcnNfZW50aXR5X2lkX2ZrX2lkeCIpCiAgQEBpbmRleChbb3JnYW5pemF0aW9uX2lkXSwgbWFwOiAib3JnYW5pemF0aW9uc19tZW1iZXJzX29yZ2FuaXphdGlvbl9pZF9ma19pZHgiKQp9Cgptb2RlbCBzaGVldHMgewogIHNoZWV0X2lkICAgICAgICAgIFN0cmluZyAgICAgIEBpZCBAdW5pcXVlKG1hcDogInRlbXBfc2hlZXRfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgc2hlZXRfYXV0aG9yX2lkICAgU3RyaW5nICAgICAgQGRiLkNoYXIoMzYpCiAgc2hlZXRfdGl0bGUgICAgICAgU3RyaW5nICAgICAgQGRiLlZhckNoYXIoMjU2KQogIHNoZWV0X3N1YmplY3QgICAgIFN0cmluZyAgICAgIEBkYi5UZXh0CiAgc2hlZXRfZmlsZW5hbWUgICAgU3RyaW5nICAgICAgQGRiLlZhckNoYXIoMjU2KQogIHNoZWV0X2RhdGFfaWQgICAgIFN0cmluZyAgICAgIEBkYi5DaGFyKDM2KQogIHNoZWV0X2xpa2VzICAgICAgIEludCAgICAgICAgIEBkZWZhdWx0KDApCiAgc2hlZXRfZGlzbGlrZXMgICAgSW50ICAgICAgICAgQGRlZmF1bHQoMCkKICBzaGVldF92aWV3cyAgICAgICBJbnQgICAgICAgICBAZGVmYXVsdCgwKQogIHNoZWV0X2RhdGVfcG9zdGVkIERhdGVUaW1lICAgIEBkZWZhdWx0KGRiZ2VuZXJhdGVkKCInMjAwMC0wMS0wMSAwMTowMTowMSciKSkgQGRiLlRpbWVzdGFtcCgwKQogIGVudGl0aWVzICAgICAgICAgIGVudGl0aWVzICAgIEByZWxhdGlvbihmaWVsZHM6IFtzaGVldF9hdXRob3JfaWRdLCByZWZlcmVuY2VzOiBbZW50aXR5X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogInNoZWV0c19zaGVldF9hdXRob3JfaWRfZmsiKQogIHNoZWV0c19kYXRhICAgICAgIHNoZWV0c19kYXRhIEByZWxhdGlvbihmaWVsZHM6IFtzaGVldF9kYXRhX2lkXSwgcmVmZXJlbmNlczogW3NoZWV0X2RhdGFfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAic2hlZXRzX3NoZWV0X2RhdGFfaWRfZmsiKQoKICBAQGluZGV4KFtzaGVldF9kYXRhX2lkXSwgbWFwOiAiU2hlZXRzX3NoZWV0X2RhdGFfaWRfZmtfaWR4IikKICBAQGluZGV4KFtzaGVldF9hdXRob3JfaWRdLCBtYXA6ICJzaGVldHNfc2hlZXRfYXV0aG9yX2lkX2ZrX2lkeCIpCn0KCm1vZGVsIHNoZWV0c19kYXRhIHsKICBzaGVldF9kYXRhX2lkIFN0cmluZyAgIEBpZCBAdW5pcXVlKG1hcDogInRlbXBfc2hlZXRfZGF0YV9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBzaGVldF9kYXRhICAgIEJ5dGVzCiAgc2hlZXRzICAgICAgICBzaGVldHNbXQp9Cgptb2RlbCB1c2VyX2NyZWRlbnRpYWxzIHsKICB1c2VyX2lkICAgICAgICAgICBTdHJpbmcgICAgICAgQGlkIEB1bmlxdWUobWFwOiAidXNlcl9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICB1c2VybmFtZSAgICAgICAgICBTdHJpbmcgICAgICAgQHVuaXF1ZShtYXA6ICJ1c2VybmFtZV9VTklRVUUiKSBAZGIuVmFyQ2hhcigxMjgpCiAgdXNlcl9wYXNzd29yZCAgICAgU3RyaW5nICAgICAgIEBkYi5WYXJDaGFyKDEyOCkKICB1c2VyX2ZpcnN0X25hbWUgICBTdHJpbmc/ICAgICAgQGRiLlZhckNoYXIoMTI4KQogIHVzZXJfbGFzdF9uYW1lICAgIFN0cmluZz8gICAgICBAZGIuVmFyQ2hhcigxMjgpCiAgdXNlcl9lbWFpbCAgICAgICAgU3RyaW5nPyAgICAgIEBkYi5WYXJDaGFyKDEyOCkKICB1c2VyX3Bob25lX251bWJlciBTdHJpbmc/ICAgICAgQGRiLlZhckNoYXIoMTUpCiAgaW5kaXZpZHVhbHMgICAgICAgaW5kaXZpZHVhbHM/Cn0KCm1vZGVsIHZpZGVvcyB7CiAgdmlkZW9faWQgICAgICAgICAgU3RyaW5nICAgICAgQGlkIEB1bmlxdWUobWFwOiAidGVtcF92aWRlb19pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICB2aWRlb19jcmVhdG9yX2lkICBTdHJpbmcgICAgICBAZGIuQ2hhcigzNikKICB2aWRlb190aXRsZSAgICAgICBTdHJpbmcgICAgICBAZGIuVmFyQ2hhcigyNTYpCiAgdmlkZW9fZGVzY3JpcHRpb24gU3RyaW5nICAgICAgQGRiLlRleHQKICB2aWRlb19maWxlbmFtZSAgICBTdHJpbmcgICAgICBAZGIuVmFyQ2hhcigyNTYpCiAgdmlkZW9fZGF0YV9pZCAgICAgU3RyaW5nICAgICAgQGRiLkNoYXIoMzYpCiAgdmlkZW9fbGlrZXMgICAgICAgSW50ICAgICAgICAgQGRlZmF1bHQoMCkKICB2aWRlb19kaXNsaWtlcyAgICBJbnQgICAgICAgICBAZGVmYXVsdCgwKQogIHZpZGVvX3ZpZXdzICAgICAgIEludCAgICAgICAgIEBkZWZhdWx0KDApCiAgdmlkZW9fZGF0ZV9wb3N0ZWQgRGF0ZVRpbWU/ICAgQGRlZmF1bHQoZGJnZW5lcmF0ZWQoIicyMDAwLTAxLTAxIDAxOjAxOjAxJyIpKSBAZGIuVGltZXN0YW1wKDApCiAgZW50aXRpZXMgICAgICAgICAgZW50aXRpZXMgICAgQHJlbGF0aW9uKGZpZWxkczogW3ZpZGVvX2NyZWF0b3JfaWRdLCByZWZlcmVuY2VzOiBbZW50aXR5X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogInZpZGVvc192aWRlb19jcmVhdG9yX2lkX2ZrIikKICB2aWRlb3NfZGF0YSAgICAgICB2aWRlb3NfZGF0YSBAcmVsYXRpb24oZmllbGRzOiBbdmlkZW9fZGF0YV9pZF0sIHJlZmVyZW5jZXM6IFt2aWRlb19kYXRhX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogInZpZGVvc192aWRlb19kYXRhX2lkX2ZrIikKCiAgQEBpbmRleChbdmlkZW9fY3JlYXRvcl9pZF0sIG1hcDogInZpZGVvc192aWRlb19jcmVhdG9yX2lkX2ZrX2lkeCIpCiAgQEBpbmRleChbdmlkZW9fZGF0YV9pZF0sIG1hcDogInZpZGVvc192aWRlb19kYXRhX2lkX2ZrX2lkeCIpCn0KCm1vZGVsIHZpZGVvc19kYXRhIHsKICB2aWRlb19kYXRhX2lkIFN0cmluZyAgIEBpZCBAdW5pcXVlKG1hcDogInRlbXBfdmlkZW9fZGF0YV9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICB2aWRlb19kYXRhICAgIEJ5dGVzCiAgdmlkZW9zICAgICAgICB2aWRlb3NbXQp9Cg==",
  "inlineSchemaHash": "6a91d68e0d05de758fe268bc15289be2252779a11b5bf94f7310c17dd8f685c3",
  "noEngine": false
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"affiliates_relations\":{\"dbName\":null,\"fields\":[{\"name\":\"affiliate_relation_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"affiliate_id_1\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"affiliate_id_2\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"affiliate_id_1\",\"affiliate_id_2\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"affiliate_id_1\",\"affiliate_id_2\"]}],\"isGenerated\":false},\"collections\":{\"dbName\":null,\"fields\":[{\"name\":\"collection_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collection_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"collectionsToentities\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections_content\",\"relationName\":\"collectionsTocollections_content\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"collections_content\":{\"dbName\":null,\"fields\":[{\"name\":\"collections_content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collection_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_added\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections\",\"relationName\":\"collectionsTocollections_content\",\"relationFromFields\":[\"collection_id\"],\"relationToFields\":[\"collection_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"content\",\"relationName\":\"collections_contentTocontent\",\"relationFromFields\":[\"content_id\"],\"relationToFields\":[\"content_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"content\":{\"dbName\":null,\"fields\":[{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections_content\",\"relationName\":\"collections_contentTocontent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_content\",\"relationName\":\"contentToentities_content\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_dislikes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_dislikes\",\"relationName\":\"contentToentities_dislikes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_likes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_likes\",\"relationName\":\"contentToentities_likes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities\":{\"dbName\":null,\"fields\":[{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections\",\"relationName\":\"collectionsToentities\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_content\",\"relationName\":\"entitiesToentities_content\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_dislikes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_dislikes\",\"relationName\":\"entitiesToentities_dislikes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_likes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_likes\",\"relationName\":\"entitiesToentities_likes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_references\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_references\",\"relationName\":\"entitiesToentities_references\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups_members\",\"relationName\":\"entitiesTogroups_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images\",\"relationName\":\"entitiesToimages\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations_members\",\"relationName\":\"entitiesToorganizations_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets\",\"relationName\":\"entitiesTosheets\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos\",\"relationName\":\"entitiesTovideos\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities_content\":{\"dbName\":null,\"fields\":[{\"name\":\"entities_content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_added\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"content\",\"relationName\":\"contentToentities_content\",\"relationFromFields\":[\"content_id\"],\"relationToFields\":[\"content_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_content\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities_dislikes\":{\"dbName\":null,\"fields\":[{\"name\":\"dislike_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"content\",\"relationName\":\"contentToentities_dislikes\",\"relationFromFields\":[\"content_id\"],\"relationToFields\":[\"content_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_dislikes\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"entity_id\",\"content_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"entity_id\",\"content_id\"]}],\"isGenerated\":false},\"entities_likes\":{\"dbName\":null,\"fields\":[{\"name\":\"like_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"content\",\"relationName\":\"contentToentities_likes\",\"relationFromFields\":[\"content_id\"],\"relationToFields\":[\"content_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_likes\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"entity_id\",\"content_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"entity_id\",\"content_id\"]}],\"isGenerated\":false},\"entities_references\":{\"dbName\":null,\"fields\":[{\"name\":\"reference_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"author\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_references\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"groups\":{\"dbName\":null,\"fields\":[{\"name\":\"group_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_handle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_currentIssue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_stances\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups_members\",\"relationName\":\"groupsTogroups_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"groups_members\":{\"dbName\":null,\"fields\":[{\"name\":\"groups_members_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesTogroups_members\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups\",\"relationName\":\"groupsTogroups_members\",\"relationFromFields\":[\"group_id\"],\"relationToFields\":[\"group_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"group_id\",\"entity_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"group_id\",\"entity_id\"]}],\"isGenerated\":false},\"images\":{\"dbName\":null,\"fields\":[{\"name\":\"image_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_views\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_date_posted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"'2000-01-01 01:01:01'\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToimages\",\"relationFromFields\":[\"image_creator_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images_data\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images_data\",\"relationName\":\"imagesToimages_data\",\"relationFromFields\":[\"image_data_id\"],\"relationToFields\":[\"image_data_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"images_data\":{\"dbName\":null,\"fields\":[{\"name\":\"image_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images\",\"relationName\":\"imagesToimages_data\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"individuals\":{\"dbName\":null,\"fields\":[{\"name\":\"individual_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_currentIssue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_roles\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_credentials\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"user_credentials\",\"relationName\":\"individualsTouser_credentials\",\"relationFromFields\":[\"individual_id\"],\"relationToFields\":[\"user_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"organizations\":{\"dbName\":null,\"fields\":[{\"name\":\"organization_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_handle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_currentIssue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_stances\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations_members\",\"relationName\":\"organizationsToorganizations_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"organizations_members\":{\"dbName\":null,\"fields\":[{\"name\":\"organizations_members_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToorganizations_members\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations\",\"relationName\":\"organizationsToorganizations_members\",\"relationFromFields\":[\"organization_id\"],\"relationToFields\":[\"organization_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"sheets\":{\"dbName\":null,\"fields\":[{\"name\":\"sheet_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_author_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_subject\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_views\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_date_posted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"'2000-01-01 01:01:01'\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesTosheets\",\"relationFromFields\":[\"sheet_author_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets_data\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets_data\",\"relationName\":\"sheetsTosheets_data\",\"relationFromFields\":[\"sheet_data_id\"],\"relationToFields\":[\"sheet_data_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"sheets_data\":{\"dbName\":null,\"fields\":[{\"name\":\"sheet_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets\",\"relationName\":\"sheetsTosheets_data\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"user_credentials\":{\"dbName\":null,\"fields\":[{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_first_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_last_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_phone_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individuals\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"individuals\",\"relationName\":\"individualsTouser_credentials\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"videos\":{\"dbName\":null,\"fields\":[{\"name\":\"video_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_views\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_date_posted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"'2000-01-01 01:01:01'\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesTovideos\",\"relationFromFields\":[\"video_creator_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos_data\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos_data\",\"relationName\":\"videosTovideos_data\",\"relationFromFields\":[\"video_data_id\"],\"relationToFields\":[\"video_data_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"videos_data\":{\"dbName\":null,\"fields\":[{\"name\":\"video_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos\",\"relationName\":\"videosTovideos_data\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.getQueryEngineWasmModule = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

