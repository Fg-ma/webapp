
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
  collections_content: 'collections_content',
  content: 'content',
  entities: 'entities',
  entities_content: 'entities_content',
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
  "inlineSchema": "Z2VuZXJhdG9yIGNsaWVudCB7CiAgcHJvdmlkZXIgPSAicHJpc21hLWNsaWVudC1qcyIKICBvdXRwdXQgICA9ICIuL2dlbmVyYXRlZCIKfQoKZGF0YXNvdXJjZSBkYiB7CiAgcHJvdmlkZXIgPSAibXlzcWwiCiAgdXJsICAgICAgPSBlbnYoIkRBVEFCQVNFX1VSTCIpCn0KCm1vZGVsIGFmZmlsaWF0ZXNfcmVsYXRpb25zIHsKICBhZmZpbGlhdGVfcmVsYXRpb25faWQgU3RyaW5nIEBpZCBAdW5pcXVlKG1hcDogImFmZmlsaWF0ZV9yZWxhdGlvbl9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBhZmZpbGlhdGVfaWRfMSAgICAgICAgU3RyaW5nIEBkYi5DaGFyKDM2KQogIGFmZmlsaWF0ZV9pZF8yICAgICAgICBTdHJpbmcgQGRiLkNoYXIoMzYpCgogIEBAdW5pcXVlKFthZmZpbGlhdGVfaWRfMSwgYWZmaWxpYXRlX2lkXzJdLCBtYXA6ICJ1bmlxdWVfYWZmaWxpYXRlX2NvbWJpbmF0aW9uIikKfQoKbW9kZWwgY29sbGVjdGlvbnMgewogIGNvbGxlY3Rpb25faWQgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgIEBpZCBAdW5pcXVlKG1hcDogInRlbXBfY29sbGVjdGlvbl9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBjb2xsZWN0aW9uX25hbWUgICAgIFN0cmluZyAgICAgICAgICAgICAgICBAZGIuVmFyQ2hhcigyNTYpCiAgZW50aXR5X2lkICAgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgQGRiLkNoYXIoMzYpCiAgZW50aXRpZXMgICAgICAgICAgICBlbnRpdGllcyAgICAgICAgICAgICAgQHJlbGF0aW9uKGZpZWxkczogW2VudGl0eV9pZF0sIHJlZmVyZW5jZXM6IFtlbnRpdHlfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiY29sbGVjdGlvbnNfZW50aXR5X2lkX2ZrIikKICBjb2xsZWN0aW9uc19jb250ZW50IGNvbGxlY3Rpb25zX2NvbnRlbnRbXQoKICBAQGluZGV4KFtlbnRpdHlfaWRdLCBtYXA6ICJjb2xsZWN0aW9uc19lbnRpdHlfaWRfZmtfaWR4IikKfQoKbW9kZWwgY29sbGVjdGlvbnNfY29udGVudCB7CiAgY29sbGVjdGlvbnNfY29udGVudF9pZCBTdHJpbmcgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJjb2xsZWN0aW9uc19jb250ZW50X2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGNvbGxlY3Rpb25faWQgICAgICAgICAgU3RyaW5nICAgICAgQGRiLkNoYXIoMzYpCiAgY29udGVudF9pZCAgICAgICAgICAgICBTdHJpbmcgICAgICBAZGIuQ2hhcigzNikKICBkYXRlX2FkZGVkICAgICAgICAgICAgIERhdGVUaW1lICAgIEBkYi5UaW1lc3RhbXAoMCkKICBwaW5uZWQgICAgICAgICAgICAgICAgIEJvb2xlYW4KICBkYXRlX3Bpbm5lZCAgICAgICAgICAgIERhdGVUaW1lPyAgIEBkYi5UaW1lc3RhbXAoMCkKICBjb2xsZWN0aW9ucyAgICAgICAgICAgIGNvbGxlY3Rpb25zIEByZWxhdGlvbihmaWVsZHM6IFtjb2xsZWN0aW9uX2lkXSwgcmVmZXJlbmNlczogW2NvbGxlY3Rpb25faWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiY29sbGVjdGlvbnNfY29udGVudF9jb2xsZWN0aW9uX2lkX2ZrIikKICBjb250ZW50ICAgICAgICAgICAgICAgIGNvbnRlbnQgICAgIEByZWxhdGlvbihmaWVsZHM6IFtjb250ZW50X2lkXSwgcmVmZXJlbmNlczogW2NvbnRlbnRfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiY29sbGVjdGlvbnNfY29udGVudF9jb250ZW50X2lkX2ZrIikKCiAgQEBpbmRleChbY29sbGVjdGlvbl9pZF0sIG1hcDogImNvbGxlY3Rpb25zX2NvbnRlbnRfY29sbGVjdGlvbl9pZF9ma19pZHgiKQogIEBAaW5kZXgoW2NvbnRlbnRfaWRdLCBtYXA6ICJjb2xsZWN0aW9uc19jb250ZW50X2NvbnRlbnRfaWRfZmtfaWR4IikKfQoKbW9kZWwgY29udGVudCB7CiAgY29udGVudF9pZCAgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgQGlkIEB1bmlxdWUobWFwOiAibWVkaWFfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgY29udGVudF90eXBlICAgICAgICBJbnQ/CiAgY29sbGVjdGlvbnNfY29udGVudCBjb2xsZWN0aW9uc19jb250ZW50W10KICBlbnRpdGllc19jb250ZW50ICAgIGVudGl0aWVzX2NvbnRlbnRbXQogIGVudGl0aWVzX2xpa2VzICAgICAgZW50aXRpZXNfbGlrZXNbXQp9Cgptb2RlbCBlbnRpdGllcyB7CiAgZW50aXR5X2lkICAgICAgICAgICAgIFN0cmluZyAgICAgICAgICAgICAgICAgIEBpZCBAdW5pcXVlKG1hcDogInRlbXBfZW50aXR5X2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGVudGl0eV90eXBlICAgICAgICAgICBJbnQgICAgICAgICAgICAgICAgICAgICBAZGVmYXVsdCgwKQogIGNvbGxlY3Rpb25zICAgICAgICAgICBjb2xsZWN0aW9uc1tdCiAgZW50aXRpZXNfY29udGVudCAgICAgIGVudGl0aWVzX2NvbnRlbnRbXQogIGVudGl0aWVzX2xpa2VzICAgICAgICBlbnRpdGllc19saWtlc1tdCiAgZW50aXRpZXNfcmVmZXJlbmNlcyAgIGVudGl0aWVzX3JlZmVyZW5jZXNbXQogIGdyb3Vwc19tZW1iZXJzICAgICAgICBncm91cHNfbWVtYmVyc1tdCiAgaW1hZ2VzICAgICAgICAgICAgICAgIGltYWdlc1tdCiAgb3JnYW5pemF0aW9uc19tZW1iZXJzIG9yZ2FuaXphdGlvbnNfbWVtYmVyc1tdCiAgc2hlZXRzICAgICAgICAgICAgICAgIHNoZWV0c1tdCiAgdmlkZW9zICAgICAgICAgICAgICAgIHZpZGVvc1tdCn0KCm1vZGVsIGVudGl0aWVzX2NvbnRlbnQgewogIGVudGl0aWVzX2NvbnRlbnRfaWQgU3RyaW5nICAgIEBpZCBAdW5pcXVlKG1hcDogImVudGl0aWVzX2NvbnRlbnRfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgZW50aXR5X2lkICAgICAgICAgICBTdHJpbmcgICAgQGRiLkNoYXIoMzYpCiAgY29udGVudF9pZCAgICAgICAgICBTdHJpbmcgICAgQGRiLkNoYXIoMzYpCiAgZGF0ZV9hZGRlZCAgICAgICAgICBEYXRlVGltZSAgQGRiLlRpbWVzdGFtcCgwKQogIHBpbm5lZCAgICAgICAgICAgICAgQm9vbGVhbgogIGRhdGVfcGlubmVkICAgICAgICAgRGF0ZVRpbWU/IEBkYi5UaW1lc3RhbXAoMCkKICBjb250ZW50ICAgICAgICAgICAgIGNvbnRlbnQgICBAcmVsYXRpb24oZmllbGRzOiBbY29udGVudF9pZF0sIHJlZmVyZW5jZXM6IFtjb250ZW50X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImVudGl0aWVzX2NvbnRlbnRfY29udGVudF9pZCIpCiAgZW50aXRpZXMgICAgICAgICAgICBlbnRpdGllcyAgQHJlbGF0aW9uKGZpZWxkczogW2VudGl0eV9pZF0sIHJlZmVyZW5jZXM6IFtlbnRpdHlfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiZW50aXRpZXNfY29udGVudF9lbnRpdHlfaWQiKQoKICBAQGluZGV4KFtjb250ZW50X2lkXSkKICBAQGluZGV4KFtlbnRpdHlfaWRdKQp9Cgptb2RlbCBlbnRpdGllc19saWtlcyB7CiAgbGlrZV9pZCAgICBTdHJpbmcgICBAaWQgQHVuaXF1ZShtYXA6ICJsaWtlX2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIGVudGl0eV9pZCAgU3RyaW5nICAgQGRiLkNoYXIoMzYpCiAgY29udGVudF9pZCBTdHJpbmcgICBAZGIuQ2hhcigzNikKICBjb250ZW50ICAgIGNvbnRlbnQgIEByZWxhdGlvbihmaWVsZHM6IFtjb250ZW50X2lkXSwgcmVmZXJlbmNlczogW2NvbnRlbnRfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiZW50aXRpZXNfbGlrZXNfY29udGVudF9pZF9mayIpCiAgZW50aXRpZXMgICBlbnRpdGllcyBAcmVsYXRpb24oZmllbGRzOiBbZW50aXR5X2lkXSwgcmVmZXJlbmNlczogW2VudGl0eV9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJlbnRpdGllc19saWtlc19lbnRpdHlfaWRfZmsiKQoKICBAQGluZGV4KFtjb250ZW50X2lkXSwgbWFwOiAiZW50aXRpZXNfbGlrZXNfY29udGVudF9pZF9ma19pZHgiKQogIEBAaW5kZXgoW2VudGl0eV9pZF0sIG1hcDogImVudGl0aWVzX2xpa2VzX2VudGl0eV9pZF9ma19pZHgiKQp9Cgptb2RlbCBlbnRpdGllc19yZWZlcmVuY2VzIHsKICByZWZlcmVuY2VfaWQgU3RyaW5nICAgQGlkIEB1bmlxdWUobWFwOiAidGVtcF9yZWZlcmVuY2VfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgZW50aXR5X2lkICAgIFN0cmluZyAgIEBkYi5DaGFyKDM2KQogIHRpdGxlICAgICAgICBTdHJpbmcgICBAZGIuVmFyQ2hhcigyNTYpCiAgYXV0aG9yICAgICAgIFN0cmluZyAgIEBkYi5WYXJDaGFyKDI1NikKICB1cmwgICAgICAgICAgU3RyaW5nICAgQGRiLlZhckNoYXIoMjU2KQogIGVudGl0aWVzICAgICBlbnRpdGllcyBAcmVsYXRpb24oZmllbGRzOiBbZW50aXR5X2lkXSwgcmVmZXJlbmNlczogW2VudGl0eV9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJlbnRpdGllc19yZWZlcmVuY2VzX2VudGl0eV9pZF9mayIpCgogIEBAaW5kZXgoW2VudGl0eV9pZF0sIG1hcDogImVudGl0aWVzX3JlZmVyZW5jZXNfZW50aXR5X2lkX2ZrX2lkeCIpCn0KCm1vZGVsIGdyb3VwcyB7CiAgZ3JvdXBfaWQgICAgICAgICAgIFN0cmluZyAgICAgICAgICAgQGlkIEB1bmlxdWUobWFwOiAidGVtcF9ncm91cF9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBncm91cF9oYW5kbGUgICAgICAgU3RyaW5nICAgICAgICAgICBAdW5pcXVlKG1hcDogImdyb3VwX2hhbmRsZV9VTklRVUUiKSBAZGIuVmFyQ2hhcigyNTYpCiAgZ3JvdXBfbmFtZSAgICAgICAgIFN0cmluZyAgICAgICAgICAgQGRiLlZhckNoYXIoMjU2KQogIGdyb3VwX2N1cnJlbnRJc3N1ZSBTdHJpbmc/ICAgICAgICAgIEBkYi5UZXh0CiAgZ3JvdXBfc3RhbmNlcyAgICAgIFN0cmluZz8gICAgICAgICAgQGRiLlRleHQKICBncm91cF9kZXNjcmlwdGlvbiAgU3RyaW5nPyAgICAgICAgICBAZGIuVGV4dAogIGdyb3Vwc19tZW1iZXJzICAgICBncm91cHNfbWVtYmVyc1tdCn0KCm1vZGVsIGdyb3Vwc19tZW1iZXJzIHsKICBncm91cHNfbWVtYmVyc19pZCBTdHJpbmcgICBAaWQgQHVuaXF1ZShtYXA6ICJncm91cHNfbWVtYmVyc19pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBncm91cF9pZCAgICAgICAgICBTdHJpbmcgICBAZGIuQ2hhcigzNikKICBlbnRpdHlfaWQgICAgICAgICBTdHJpbmcgICBAZGIuQ2hhcigzNikKICBlbnRpdGllcyAgICAgICAgICBlbnRpdGllcyBAcmVsYXRpb24oZmllbGRzOiBbZW50aXR5X2lkXSwgcmVmZXJlbmNlczogW2VudGl0eV9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJncm91cHNfbWVtYmVyc19lbnRpdHlfaWRfZmsiKQogIGdyb3VwcyAgICAgICAgICAgIGdyb3VwcyAgIEByZWxhdGlvbihmaWVsZHM6IFtncm91cF9pZF0sIHJlZmVyZW5jZXM6IFtncm91cF9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJncm91cHNfbWVtYmVyc19ncm91cF9pZF9mayIpCgogIEBAdW5pcXVlKFtncm91cF9pZCwgZW50aXR5X2lkXSwgbWFwOiAidW5pcXVlX2dyb3VwX21lbWJlcl9jb21iaW5hdGlvbiIpCiAgQEBpbmRleChbZW50aXR5X2lkXSwgbWFwOiAiZ3JvdXBzX21lbWJlcnNfZW50aXR5X2lkX2ZrIikKICBAQGluZGV4KFtncm91cF9pZF0sIG1hcDogImdyb3Vwc19tZW1iZXJzX2dyb3VwX2lkX2ZrX2lkeCIpCn0KCm1vZGVsIGltYWdlcyB7CiAgaW1hZ2VfaWQgICAgICAgICAgU3RyaW5nICAgICAgQGlkIEB1bmlxdWUobWFwOiAidGVtcF9pbWFnZV9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBpbWFnZV9jcmVhdG9yX2lkICBTdHJpbmcgICAgICBAZGIuQ2hhcigzNikKICBpbWFnZV90aXRsZSAgICAgICBTdHJpbmcgICAgICBAZGIuVmFyQ2hhcigyNTYpCiAgaW1hZ2VfZGVzY3JpcHRpb24gU3RyaW5nICAgICAgQGRiLlRleHQKICBpbWFnZV9maWxlbmFtZSAgICBTdHJpbmcgICAgICBAZGIuVmFyQ2hhcigyNTYpCiAgaW1hZ2VfZGF0YV9pZCAgICAgU3RyaW5nICAgICAgQGRiLkNoYXIoMzYpCiAgZW50aXRpZXMgICAgICAgICAgZW50aXRpZXMgICAgQHJlbGF0aW9uKGZpZWxkczogW2ltYWdlX2NyZWF0b3JfaWRdLCByZWZlcmVuY2VzOiBbZW50aXR5X2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImltYWdlc19pbWFnZV9jcmVhdG9yX2lkX2ZrIikKICBpbWFnZXNfZGF0YSAgICAgICBpbWFnZXNfZGF0YSBAcmVsYXRpb24oZmllbGRzOiBbaW1hZ2VfZGF0YV9pZF0sIHJlZmVyZW5jZXM6IFtpbWFnZV9kYXRhX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogImltYWdlc19pbWFnZV9kYXRhX2lkX2ZrIikKCiAgQEBpbmRleChbaW1hZ2VfY3JlYXRvcl9pZF0sIG1hcDogImltYWdlc19pbWFnZV9jcmVhdG9yX2lkX2ZrX2lkeCIpCiAgQEBpbmRleChbaW1hZ2VfZGF0YV9pZF0sIG1hcDogImltYWdlc19pbWFnZV9kYXRhX2lkX2ZrX2lkeCIpCn0KCm1vZGVsIGltYWdlc19kYXRhIHsKICBpbWFnZV9kYXRhX2lkIFN0cmluZyAgIEBpZCBAdW5pcXVlKG1hcDogInRlbXBfaW1hZ2VfZGF0YV9pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBpbWFnZV9kYXRhICAgIEJ5dGVzCiAgaW1hZ2VzICAgICAgICBpbWFnZXNbXQp9Cgptb2RlbCBpbmRpdmlkdWFscyB7CiAgaW5kaXZpZHVhbF9pZCAgICAgICAgICAgU3RyaW5nICAgICAgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJ0ZW1wX2luZGl2aWR1YWxfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgaW5kaXZpZHVhbF91c2VybmFtZSAgICAgU3RyaW5nICAgICAgICAgICBAdW5pcXVlKG1hcDogInVzZXJOYW1lX1VOSVFVRSIpIEBkYi5WYXJDaGFyKDI1NikKICBpbmRpdmlkdWFsX25hbWUgICAgICAgICBTdHJpbmcgICAgICAgICAgIEBkYi5WYXJDaGFyKDI1NikKICBpbmRpdmlkdWFsX2N1cnJlbnRJc3N1ZSBTdHJpbmc/ICAgICAgICAgIEBkYi5UZXh0CiAgaW5kaXZpZHVhbF9yb2xlcyAgICAgICAgU3RyaW5nPyAgICAgICAgICBAZGIuVGV4dAogIGluZGl2aWR1YWxfZGVzY3JpcHRpb24gIFN0cmluZz8gICAgICAgICAgQGRiLlRleHQKICB1c2VyX2NyZWRlbnRpYWxzICAgICAgICB1c2VyX2NyZWRlbnRpYWxzIEByZWxhdGlvbihmaWVsZHM6IFtpbmRpdmlkdWFsX2lkXSwgcmVmZXJlbmNlczogW3VzZXJfaWRdLCBvbkRlbGV0ZTogTm9BY3Rpb24sIG9uVXBkYXRlOiBOb0FjdGlvbiwgbWFwOiAiaW5kaXZpZHVhbHNfaW5kaXZpZHVhbF9pZF9mayIpCn0KCm1vZGVsIG9yZ2FuaXphdGlvbnMgewogIG9yZ2FuaXphdGlvbl9pZCAgICAgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgICAgQGlkIEB1bmlxdWUobWFwOiAidGVtcF9vcmdhbml6YXRpb25faWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgb3JnYW5pemF0aW9uX2hhbmRsZSAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgICBAdW5pcXVlKG1hcDogIm9yZ2FuaXphdGlvbl9oYW5kbGVfVU5JUVVFIikgQGRiLlZhckNoYXIoMjU2KQogIG9yZ2FuaXphdGlvbl9uYW1lICAgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgICAgQGRiLlZhckNoYXIoMjU2KQogIG9yZ2FuaXphdGlvbl9jdXJyZW50SXNzdWUgU3RyaW5nPyAgICAgICAgICAgICAgICAgQGRiLlRleHQKICBvcmdhbml6YXRpb25fc3RhbmNlcyAgICAgIFN0cmluZz8gICAgICAgICAgICAgICAgIEBkYi5UZXh0CiAgb3JnYW5pemF0aW9uX2Rlc2NyaXB0aW9uICBTdHJpbmc/ICAgICAgICAgICAgICAgICBAZGIuVGV4dAogIG9yZ2FuaXphdGlvbnNfbWVtYmVycyAgICAgb3JnYW5pemF0aW9uc19tZW1iZXJzW10KfQoKbW9kZWwgb3JnYW5pemF0aW9uc19tZW1iZXJzIHsKICBvcmdhbml6YXRpb25zX21lbWJlcnNfaWQgU3RyaW5nICAgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJ0ZW1wX29yZ2FuaXphdGlvbnNfbWVtYmVyc19pZF9VTklRVUUiKSBAZGIuQ2hhcigzNikKICBvcmdhbml6YXRpb25faWQgICAgICAgICAgU3RyaW5nICAgICAgICBAZGIuQ2hhcigzNikKICBlbnRpdHlfaWQgICAgICAgICAgICAgICAgU3RyaW5nICAgICAgICBAZGIuQ2hhcigzNikKICBlbnRpdGllcyAgICAgICAgICAgICAgICAgZW50aXRpZXMgICAgICBAcmVsYXRpb24oZmllbGRzOiBbZW50aXR5X2lkXSwgcmVmZXJlbmNlczogW2VudGl0eV9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJvcmdhbml6YXRpb25zX21lbWJlcnNfZW50aXR5X2lkX2ZrIikKICBvcmdhbml6YXRpb25zICAgICAgICAgICAgb3JnYW5pemF0aW9ucyBAcmVsYXRpb24oZmllbGRzOiBbb3JnYW5pemF0aW9uX2lkXSwgcmVmZXJlbmNlczogW29yZ2FuaXphdGlvbl9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJvcmdhbml6YXRpb25zX21lbWJlcnNfb3JnYW5pemF0aW9uX2lkX2ZrIikKCiAgQEBpbmRleChbZW50aXR5X2lkXSwgbWFwOiAib3JnYW5pemF0aW9uc19tZW1iZXJzX2VudGl0eV9pZF9ma19pZHgiKQogIEBAaW5kZXgoW29yZ2FuaXphdGlvbl9pZF0sIG1hcDogIm9yZ2FuaXphdGlvbnNfbWVtYmVyc19vcmdhbml6YXRpb25faWRfZmtfaWR4IikKfQoKbW9kZWwgc2hlZXRzIHsKICBzaGVldF9pZCAgICAgICAgICBTdHJpbmcgICAgICBAaWQgQHVuaXF1ZShtYXA6ICJ0ZW1wX3NoZWV0X2lkX1VOSVFVRSIpIEBkYi5DaGFyKDM2KQogIHNoZWV0X2F1dGhvcl9pZCAgIFN0cmluZyAgICAgIEBkYi5DaGFyKDM2KQogIHNoZWV0X3RpdGxlICAgICAgIFN0cmluZyAgICAgIEBkYi5WYXJDaGFyKDI1NikKICBzaGVldF9zdWJqZWN0ICAgICBTdHJpbmcgICAgICBAZGIuVGV4dAogIHNoZWV0X2ZpbGVuYW1lICAgIFN0cmluZyAgICAgIEBkYi5WYXJDaGFyKDI1NikKICBzaGVldF9kYXRhX2lkICAgICBTdHJpbmcgICAgICBAZGIuQ2hhcigzNikKICBzaGVldF9saWtlcyAgICAgICBJbnQgICAgICAgICBAZGVmYXVsdCgwKQogIHNoZWV0X2Rpc2xpa2VzICAgIEludCAgICAgICAgIEBkZWZhdWx0KDApCiAgc2hlZXRfdmlld3MgICAgICAgSW50ICAgICAgICAgQGRlZmF1bHQoMCkKICBzaGVldF9kYXRlX3Bvc3RlZCBEYXRlVGltZSAgICBAZGVmYXVsdChkYmdlbmVyYXRlZCgiJzIwMDAtMDEtMDEgMDE6MDE6MDEnIikpIEBkYi5UaW1lc3RhbXAoMCkKICBlbnRpdGllcyAgICAgICAgICBlbnRpdGllcyAgICBAcmVsYXRpb24oZmllbGRzOiBbc2hlZXRfYXV0aG9yX2lkXSwgcmVmZXJlbmNlczogW2VudGl0eV9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJzaGVldHNfc2hlZXRfYXV0aG9yX2lkX2ZrIikKICBzaGVldHNfZGF0YSAgICAgICBzaGVldHNfZGF0YSBAcmVsYXRpb24oZmllbGRzOiBbc2hlZXRfZGF0YV9pZF0sIHJlZmVyZW5jZXM6IFtzaGVldF9kYXRhX2lkXSwgb25EZWxldGU6IE5vQWN0aW9uLCBvblVwZGF0ZTogTm9BY3Rpb24sIG1hcDogInNoZWV0c19zaGVldF9kYXRhX2lkX2ZrIikKCiAgQEBpbmRleChbc2hlZXRfZGF0YV9pZF0sIG1hcDogIlNoZWV0c19zaGVldF9kYXRhX2lkX2ZrX2lkeCIpCiAgQEBpbmRleChbc2hlZXRfYXV0aG9yX2lkXSwgbWFwOiAic2hlZXRzX3NoZWV0X2F1dGhvcl9pZF9ma19pZHgiKQp9Cgptb2RlbCBzaGVldHNfZGF0YSB7CiAgc2hlZXRfZGF0YV9pZCBTdHJpbmcgICBAaWQgQHVuaXF1ZShtYXA6ICJ0ZW1wX3NoZWV0X2RhdGFfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgc2hlZXRfZGF0YSAgICBCeXRlcwogIHNoZWV0cyAgICAgICAgc2hlZXRzW10KfQoKbW9kZWwgdXNlcl9jcmVkZW50aWFscyB7CiAgdXNlcl9pZCAgICAgICAgICAgU3RyaW5nICAgICAgIEBpZCBAdW5pcXVlKG1hcDogInVzZXJfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgdXNlcm5hbWUgICAgICAgICAgU3RyaW5nICAgICAgIEB1bmlxdWUobWFwOiAidXNlcm5hbWVfVU5JUVVFIikgQGRiLlZhckNoYXIoMTI4KQogIHVzZXJfcGFzc3dvcmQgICAgIFN0cmluZyAgICAgICBAZGIuVmFyQ2hhcigxMjgpCiAgdXNlcl9maXJzdF9uYW1lICAgU3RyaW5nPyAgICAgIEBkYi5WYXJDaGFyKDEyOCkKICB1c2VyX2xhc3RfbmFtZSAgICBTdHJpbmc/ICAgICAgQGRiLlZhckNoYXIoMTI4KQogIHVzZXJfZW1haWwgICAgICAgIFN0cmluZz8gICAgICBAZGIuVmFyQ2hhcigxMjgpCiAgdXNlcl9waG9uZV9udW1iZXIgU3RyaW5nPyAgICAgIEBkYi5WYXJDaGFyKDE1KQogIGluZGl2aWR1YWxzICAgICAgIGluZGl2aWR1YWxzPwp9Cgptb2RlbCB2aWRlb3MgewogIHZpZGVvX2lkICAgICAgICAgIFN0cmluZyAgICAgIEBpZCBAdW5pcXVlKG1hcDogInRlbXBfdmlkZW9faWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgdmlkZW9fY3JlYXRvcl9pZCAgU3RyaW5nICAgICAgQGRiLkNoYXIoMzYpCiAgdmlkZW9fdGl0bGUgICAgICAgU3RyaW5nICAgICAgQGRiLlZhckNoYXIoMjU2KQogIHZpZGVvX2Rlc2NyaXB0aW9uIFN0cmluZyAgICAgIEBkYi5UZXh0CiAgdmlkZW9fZmlsZW5hbWUgICAgU3RyaW5nICAgICAgQGRiLlZhckNoYXIoMjU2KQogIHZpZGVvX2RhdGFfaWQgICAgIFN0cmluZyAgICAgIEBkYi5DaGFyKDM2KQogIGVudGl0aWVzICAgICAgICAgIGVudGl0aWVzICAgIEByZWxhdGlvbihmaWVsZHM6IFt2aWRlb19jcmVhdG9yX2lkXSwgcmVmZXJlbmNlczogW2VudGl0eV9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJ2aWRlb3NfdmlkZW9fY3JlYXRvcl9pZF9mayIpCiAgdmlkZW9zX2RhdGEgICAgICAgdmlkZW9zX2RhdGEgQHJlbGF0aW9uKGZpZWxkczogW3ZpZGVvX2RhdGFfaWRdLCByZWZlcmVuY2VzOiBbdmlkZW9fZGF0YV9pZF0sIG9uRGVsZXRlOiBOb0FjdGlvbiwgb25VcGRhdGU6IE5vQWN0aW9uLCBtYXA6ICJ2aWRlb3NfdmlkZW9fZGF0YV9pZF9mayIpCgogIEBAaW5kZXgoW3ZpZGVvX2NyZWF0b3JfaWRdLCBtYXA6ICJ2aWRlb3NfdmlkZW9fY3JlYXRvcl9pZF9ma19pZHgiKQogIEBAaW5kZXgoW3ZpZGVvX2RhdGFfaWRdLCBtYXA6ICJ2aWRlb3NfdmlkZW9fZGF0YV9pZF9ma19pZHgiKQp9Cgptb2RlbCB2aWRlb3NfZGF0YSB7CiAgdmlkZW9fZGF0YV9pZCBTdHJpbmcgICBAaWQgQHVuaXF1ZShtYXA6ICJ0ZW1wX3ZpZGVvX2RhdGFfaWRfVU5JUVVFIikgQGRiLkNoYXIoMzYpCiAgdmlkZW9fZGF0YSAgICBCeXRlcwogIHZpZGVvcyAgICAgICAgdmlkZW9zW10KfQo=",
  "inlineSchemaHash": "c951cc9e10279c7821acea4e37acfd63b73bbbdbd02ce2966be8e175ab01f441",
  "noEngine": false
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"affiliates_relations\":{\"dbName\":null,\"fields\":[{\"name\":\"affiliate_relation_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"affiliate_id_1\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"affiliate_id_2\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"affiliate_id_1\",\"affiliate_id_2\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"affiliate_id_1\",\"affiliate_id_2\"]}],\"isGenerated\":false},\"collections\":{\"dbName\":null,\"fields\":[{\"name\":\"collection_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collection_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"collectionsToentities\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections_content\",\"relationName\":\"collectionsTocollections_content\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"collections_content\":{\"dbName\":null,\"fields\":[{\"name\":\"collections_content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collection_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_added\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections\",\"relationName\":\"collectionsTocollections_content\",\"relationFromFields\":[\"collection_id\"],\"relationToFields\":[\"collection_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"content\",\"relationName\":\"collections_contentTocontent\",\"relationFromFields\":[\"content_id\"],\"relationToFields\":[\"content_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"content\":{\"dbName\":null,\"fields\":[{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections_content\",\"relationName\":\"collections_contentTocontent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_content\",\"relationName\":\"contentToentities_content\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_likes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_likes\",\"relationName\":\"contentToentities_likes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities\":{\"dbName\":null,\"fields\":[{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"collections\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"collections\",\"relationName\":\"collectionsToentities\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_content\",\"relationName\":\"entitiesToentities_content\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_likes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_likes\",\"relationName\":\"entitiesToentities_likes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities_references\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities_references\",\"relationName\":\"entitiesToentities_references\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups_members\",\"relationName\":\"entitiesTogroups_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images\",\"relationName\":\"entitiesToimages\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations_members\",\"relationName\":\"entitiesToorganizations_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets\",\"relationName\":\"entitiesTosheets\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos\",\"relationName\":\"entitiesTovideos\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities_content\":{\"dbName\":null,\"fields\":[{\"name\":\"entities_content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_added\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date_pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"content\",\"relationName\":\"contentToentities_content\",\"relationFromFields\":[\"content_id\"],\"relationToFields\":[\"content_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_content\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities_likes\":{\"dbName\":null,\"fields\":[{\"name\":\"like_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"content\",\"relationName\":\"contentToentities_likes\",\"relationFromFields\":[\"content_id\"],\"relationToFields\":[\"content_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_likes\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"entities_references\":{\"dbName\":null,\"fields\":[{\"name\":\"reference_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"author\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToentities_references\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"groups\":{\"dbName\":null,\"fields\":[{\"name\":\"group_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_handle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_currentIssue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_stances\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups_members\",\"relationName\":\"groupsTogroups_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"groups_members\":{\"dbName\":null,\"fields\":[{\"name\":\"groups_members_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesTogroups_members\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"groups\",\"relationName\":\"groupsTogroups_members\",\"relationFromFields\":[\"group_id\"],\"relationToFields\":[\"group_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"group_id\",\"entity_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"group_id\",\"entity_id\"]}],\"isGenerated\":false},\"images\":{\"dbName\":null,\"fields\":[{\"name\":\"image_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToimages\",\"relationFromFields\":[\"image_creator_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images_data\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images_data\",\"relationName\":\"imagesToimages_data\",\"relationFromFields\":[\"image_data_id\"],\"relationToFields\":[\"image_data_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"images_data\":{\"dbName\":null,\"fields\":[{\"name\":\"image_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"images\",\"relationName\":\"imagesToimages_data\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"individuals\":{\"dbName\":null,\"fields\":[{\"name\":\"individual_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_currentIssue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_roles\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individual_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_credentials\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"user_credentials\",\"relationName\":\"individualsTouser_credentials\",\"relationFromFields\":[\"individual_id\"],\"relationToFields\":[\"user_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"organizations\":{\"dbName\":null,\"fields\":[{\"name\":\"organization_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_handle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_currentIssue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_stances\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations_members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations_members\",\"relationName\":\"organizationsToorganizations_members\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"organizations_members\":{\"dbName\":null,\"fields\":[{\"name\":\"organizations_members_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesToorganizations_members\",\"relationFromFields\":[\"entity_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizations\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"organizations\",\"relationName\":\"organizationsToorganizations_members\",\"relationFromFields\":[\"organization_id\"],\"relationToFields\":[\"organization_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"sheets\":{\"dbName\":null,\"fields\":[{\"name\":\"sheet_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_author_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_subject\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_dislikes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_views\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_date_posted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"'2000-01-01 01:01:01'\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesTosheets\",\"relationFromFields\":[\"sheet_author_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets_data\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets_data\",\"relationName\":\"sheetsTosheets_data\",\"relationFromFields\":[\"sheet_data_id\"],\"relationToFields\":[\"sheet_data_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"sheets_data\":{\"dbName\":null,\"fields\":[{\"name\":\"sheet_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheet_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sheets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"sheets\",\"relationName\":\"sheetsTosheets_data\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"user_credentials\":{\"dbName\":null,\"fields\":[{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_first_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_last_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_phone_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"individuals\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"individuals\",\"relationName\":\"individualsTouser_credentials\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"videos\":{\"dbName\":null,\"fields\":[{\"name\":\"video_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entities\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"entities\",\"relationName\":\"entitiesTovideos\",\"relationFromFields\":[\"video_creator_id\"],\"relationToFields\":[\"entity_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos_data\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos_data\",\"relationName\":\"videosTovideos_data\",\"relationFromFields\":[\"video_data_id\"],\"relationToFields\":[\"video_data_id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"videos_data\":{\"dbName\":null,\"fields\":[{\"name\":\"video_data_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"video_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"videos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"videos\",\"relationName\":\"videosTovideos_data\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
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

