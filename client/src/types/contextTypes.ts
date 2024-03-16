import { ReactNode } from "react";
import { Group, Individual, Organization } from "./leftTypes";

// Global

/*
  IDBContext.tsx
*/

export interface IndexedDBProviderProps {
  children: ReactNode;
}

export interface IDBService {
  db: IDBDatabase | null;
  addItem: (table: string, index: number, item: any) => Promise<number>;
  getAllItemsFromTable: (table: string) => Promise<unknown[]>;
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
    affiliate_id_root: string;
    affiliate_id_target: string;
    affiliate_relation_date: string;
    affiliate_relation_id: string;
    entity_type: number;
  };
  setAffiliateRelation: React.Dispatch<
    React.SetStateAction<{
      action: string;
      affiliate_id_root: string;
      affiliate_id_target: string;
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
