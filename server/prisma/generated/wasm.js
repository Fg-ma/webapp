
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  detectRuntime,
} = require('./runtime/index-browser.js')


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

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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

exports.Prisma.ContactsScalarFieldEnum = {
  contact_id: 'contact_id',
  conversation_id: 'conversation_id',
  contact_id_root: 'contact_id_root',
  contact_id_target: 'contact_id_target',
  contact_creation_date: 'contact_creation_date',
  last_message: 'last_message',
  last_contact_date: 'last_contact_date',
  contacts_pictures_id: 'contacts_pictures_id'
};

exports.Prisma.Contacts_picturesScalarFieldEnum = {
  contacts_pictures_id: 'contacts_pictures_id',
  contact_picture_data: 'contact_picture_data',
  contact_picture_filename: 'contact_picture_filename'
};

exports.Prisma.ContentScalarFieldEnum = {
  content_id: 'content_id',
  content_type: 'content_type'
};

exports.Prisma.ConversationsScalarFieldEnum = {
  conversation_id: 'conversation_id',
  conversation_name: 'conversation_name',
  conversation_creation_date: 'conversation_creation_date',
  last_message: 'last_message',
  last_message_date: 'last_message_date',
  conversations_pictures_id: 'conversations_pictures_id'
};

exports.Prisma.Conversations_membersScalarFieldEnum = {
  conversations_members_id: 'conversations_members_id',
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

exports.Prisma.Conversations_picturesScalarFieldEnum = {
  conversations_pictures_id: 'conversations_pictures_id',
  conversation_picture_data: 'conversation_picture_data',
  conversation_picture_filename: 'conversation_picture_filename'
};

exports.Prisma.EntitiesScalarFieldEnum = {
  entity_id: 'entity_id',
  entity_username: 'entity_username',
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
  group_current_issue: 'group_current_issue',
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
  individual_current_issue: 'individual_current_issue',
  individual_roles: 'individual_roles',
  individual_description: 'individual_description',
  profile_picture_id: 'profile_picture_id'
};

exports.Prisma.OrganizationsScalarFieldEnum = {
  organization_id: 'organization_id',
  organization_handle: 'organization_handle',
  organization_name: 'organization_name',
  organization_current_issue: 'organization_current_issue',
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
  sheet_thumbnail_filename: 'sheet_thumbnail_filename',
  sheet_thumbnail_description: 'sheet_thumbnail_description'
};

exports.Prisma.TablesScalarFieldEnum = {
  table_id: 'table_id',
  table_name: 'table_name',
  table_creation_date: 'table_creation_date',
  last_message: 'last_message',
  last_message_date: 'last_message_date',
  tables_pictures_id: 'tables_pictures_id'
};

exports.Prisma.Tables_membersScalarFieldEnum = {
  tables_members_id: 'tables_members_id',
  table_id: 'table_id',
  member_id: 'member_id',
  table_position: 'table_position'
};

exports.Prisma.Tables_messages_logsScalarFieldEnum = {
  tables_messages_logs_id: 'tables_messages_logs_id',
  table_id: 'table_id',
  entity_id: 'entity_id',
  message: 'message',
  message_date: 'message_date'
};

exports.Prisma.Tables_picturesScalarFieldEnum = {
  tables_pictures_id: 'tables_pictures_id',
  table_picture_data: 'table_picture_data',
  table_picture_filename: 'table_picture_filename'
};

exports.Prisma.Tables_tabletopsScalarFieldEnum = {
  tables_tabletops_id: 'tables_tabletops_id',
  content_data: 'content_data',
  content_filename: 'content_filename',
  content_date_posted: 'content_date_posted',
  content_x_position: 'content_x_position',
  content_y_position: 'content_y_position',
  content_rotation: 'content_rotation'
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
  video_thumbnail_filename: 'video_thumbnail_filename',
  video_thumbnail_description: 'video_thumbnail_description'
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
  contacts: 'contacts',
  contacts_pictures: 'contacts_pictures',
  content: 'content',
  conversations: 'conversations',
  conversations_members: 'conversations_members',
  conversations_messages_logs: 'conversations_messages_logs',
  conversations_pictures: 'conversations_pictures',
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
  tables: 'tables',
  tables_members: 'tables_members',
  tables_messages_logs: 'tables_messages_logs',
  tables_pictures: 'tables_pictures',
  tables_tabletops: 'tables_tabletops',
  user_credentials: 'user_credentials',
  videos: 'videos',
  videos_data: 'videos_data',
  videos_thumbnails: 'videos_thumbnails'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        const runtime = detectRuntime()
        const edgeRuntimeName = {
          'workerd': 'Cloudflare Workers',
          'deno': 'Deno and Deno Deploy',
          'netlify': 'Netlify Edge Functions',
          'edge-light': 'Vercel Edge Functions or Edge Middleware',
        }[runtime]

        let message = 'PrismaClient is unable to run in '
        if (edgeRuntimeName !== undefined) {
          message += edgeRuntimeName + '. As an alternative, try Accelerate: https://pris.ly/d/accelerate.'
        } else {
          message += 'this browser environment, or has been bundled for the browser (running in `' + runtime + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
