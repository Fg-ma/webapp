import { ReactNode } from "react";

// Global

/*
  IDBContext.tsx
*/

interface ConversationMember {
  conversation_id: string;
  individual_data?: {
    individual_name: string | null;
    individual_username: string;
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

export interface Conversation {
  conversation_id: string;
  conversation_name: string | null;
  conversation_creation_date: string;
  last_message: string | null;
  last_message_date: string | null;
  conversations_pictures_id: string | null;
  members: ConversationMember[];
}

export interface Contact {
  animate?: boolean;
  contact_id: string;
  conversation_name: string | null;
  conversation_id: string;
  contact_name: string | null;
  contact_username_root: string;
  contact_username_target: string;
  contact_creation_date: string;
  last_message: string | null;
  last_contact_date: string | null;
  contacts_pictures_id: string | null;
  entity_type: number;
}

export interface Individual {
  individual_name: string | null;
  individual_username: string;
  individual_current_issue: string;
  individual_description: string;
  individual_roles: string;
  affiliate_relation_date: string;
  animate?: boolean;
}

export interface Group {
  group_name: string | null;
  group_handle: string;
  group_current_issue: string;
  group_description: string;
  group_stances: string;
  affiliate_relation_date: string;
  animate?: boolean;
}

export interface Organization {
  organization_name: string | null;
  organization_handle: string;
  organization_current_issue: string;
  organization_description: string;
  organization_stances: string;
  affiliate_relation_date: string;
  animate?: boolean;
}

export interface Thumbnail {
  blob: Blob;
  description: string;
}

export interface Table {
  animate?: boolean;
  table_id: string;
  table_name: string | null;
  table_creation_date: string;
  last_message: string | null;
  last_message_date: string | null;
  tables_pictures_id: string | null;
  members: TableMember[];
}

export interface TableMember {
  table_id: string;
  individual_data?: {
    individual_name: string | null;
    individual_username: string;
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

export interface IndexedDBProviderProps {
  children: ReactNode;
}

export interface IDBService {
  db: IDBDatabase | null;
  addItem: (
    table: string,
    index: number | string,
    item: any,
  ) => Promise<number>;
  getAllItemsFromTable: (table: string) => Promise<unknown[]>;
  getItemByIndexFromTable: <T>(
    table: string,
    index: string | number,
  ) => Promise<T | null>;
  deleteAllItemsFromTable: (table: string) => Promise<void>;
  clearAllIndexedDBData: () => Promise<void>;
  storeAffiliatedEntity: (
    table: string,
    index: number,
    affiliatedEntity: Individual | Group | Organization,
  ) => Promise<void>;
  getStoredAffiliatedEntities: (table: string) => Promise<unknown[]>;
  storeAffiliatedEntities: (
    table: string,
    sortedData: Individual[] | Group[] | Organization[],
  ) => Promise<void>;
  deleteStoredAffiliatedEntities: (table: string) => Promise<void>;
  storeProfilePicture: (index: string, blob: Blob) => Promise<void>;
  getStoredProfilePicture: (index: string) => Promise<Blob | null>;
  storeThumbnail: (index: string, thumbnail: Thumbnail) => Promise<void>;
  getStoredThumbnail: (index: string) => Promise<Thumbnail | null>;
  getStoredContacts: () => Promise<Contact[]>;
  storeContacts: (contact: Contact[]) => Promise<void>;
  storeContact: (contact: Contact) => Promise<void>;
  deleteStoredContacts: () => Promise<void>;
  getStoredConversations: () => Promise<Conversation[]>;
  storeConversations: (conversations: Conversation[]) => Promise<void>;
  storeConversation: (conversation: Conversation) => Promise<void>;
  deleteStoredConversations: () => Promise<void>;
  getStoredTables: () => Promise<Table[]>;
  storeTables: (tables: Table[]) => Promise<void>;
  storeTable: (table: Table) => Promise<void>;
  deleteStoredTables: () => Promise<void>;
}

/*
  AffiliateContext.tsx
*/

export interface AffiliateContextProviderProps {
  children: ReactNode;
}

export interface AffiliateContextType {
  affiliateRelation: {
    action: string;
    affiliate_username_root: string;
    affiliate_username_target: string;
    affiliate_relation_date: string;
    affiliate_relation_id: string;
    entity_type: number;
  };
  setAffiliateRelation: React.Dispatch<
    React.SetStateAction<{
      action: string;
      affiliate_username_root: string;
      affiliate_username_target: string;
      affiliate_relation_date: string;
      affiliate_relation_id: string;
      entity_type: number;
    }>
  >;
}

/*
  LastMessageContext.tsx
*/

export interface LastMessageContextProviderProps {
  children: ReactNode;
}

export interface LastMessageContextType {
  lastMessage: {
    conversation: {
      conversation_id: string | null;
      last_message: string | null;
    };
    table: {
      table_id: string | null;
      last_message: string | null;
    };
  };
  setLastMessage: React.Dispatch<
    React.SetStateAction<{
      conversation: {
        conversation_id: string | null;
        last_message: string | null;
      };
      table: {
        table_id: string | null;
        last_message: string | null;
      };
    }>
  >;
}

/*
  LiveUpdatesContext.tsx
*/

export interface LiveUpdatesSocketProviderProps {
  children: ReactNode;
}

/*
  PinnedContext.tsx
*/

export interface PinnedProviderProps {
  children: ReactNode;
}

export interface PinnedContextType {
  pinnedState: { relation_id: string; type: string };
  setPinnedState: React.Dispatch<
    React.SetStateAction<{
      relation_id: string;
      type: string;
    }>
  >;
}

/*
  ContactContext.tsx
*/

export interface ContactContextProviderProps {
  children: ReactNode;
}

export interface ContactContextType {
  fluxContact: {
    action: string;
    contact_id: string;
  };
  setFluxContact: React.Dispatch<
    React.SetStateAction<{
      action: string;
      contact_id: string;
    }>
  >;
}

/*
  ConversationContext.tsx
*/

export interface ConversationContextProviderProps {
  children: ReactNode;
}

export interface ConversationContextType {
  fluxConversation: {
    action: string;
    conversation_id: string;
  };
  setFluxConversation: React.Dispatch<
    React.SetStateAction<{
      action: string;
      conversation_id: string;
    }>
  >;
}

/*
  TableContext.tsx
*/

export interface TableContextProviderProps {
  children: ReactNode;
}

export interface TableContextType {
  fluxTable: {
    action: string;
    table_id: string;
  };
  setFluxTable: React.Dispatch<
    React.SetStateAction<{
      action: string;
      table_id: string;
    }>
  >;
}
