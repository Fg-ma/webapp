import { ReactNode } from "react";

// Global

/*
  IDBContext.tsx
*/

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
    conversation_id: string;
    last_message: string;
  };
  setLastMessage: React.Dispatch<
    React.SetStateAction<{
      conversation_id: string;
      last_message: string;
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
