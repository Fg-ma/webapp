import React, { createContext, useContext } from "react";
import {
  CONTACTS_TABLE,
  CONVERSATIONS_TABLE,
  PROFILE_PICTURES_TABLE,
  TABLES_TABLE,
  THUMBNAILS_TABLE,
  useIndexedDB,
} from "@IDB/IDBService";
import {
  IndexedDBProviderProps,
  IDBService,
  Contact,
  Group,
  Individual,
  Organization,
  Thumbnail,
  Conversation,
  Table,
} from "@FgTypes/contextTypes";

const IndexedDBContext = createContext<IDBService | undefined>(undefined);

export const useIndexedDBContext = (): IDBService => {
  const context = useContext(IndexedDBContext);
  if (!context) {
    throw new Error(
      "useIndexedDBContext must be used within an IndexedDBProvider",
    );
  }
  return context;
};

export const IndexedDBProvider = ({ children }: IndexedDBProviderProps) => {
  const indexedDBService = useIndexedDB();

  const storeAffiliatedEntity = async (
    table: string,
    index: number,
    affiliatedEntity: Individual | Group | Organization,
  ): Promise<void> => {
    try {
      await indexedDBService.addItem(table, index, affiliatedEntity);
    } catch (error) {
      console.error("Error storing affiliated entity in IndexedDB:", error);
    }
  };

  const getStoredAffiliatedEntities = async (
    table: string,
  ): Promise<unknown[]> => {
    try {
      const storedEntities = await indexedDBService.getAllItemsFromTable(table);
      return storedEntities;
    } catch (error) {
      console.error(
        "Error getting stored affiliated entities from IndexedDB:",
        error,
      );
      return [];
    }
  };

  const storeAffiliatedEntities = async (
    table: string,
    sortedData: Individual[] | Group[] | Organization[],
  ) => {
    try {
      for (let i = 0; i < sortedData.length; i++) {
        await storeAffiliatedEntity(table, i, sortedData[i]);
      }
    } catch (error) {
      console.error("Error storing affiliated entities in IndexedDB:", error);
    }
  };

  const deleteStoredAffiliatedEntities = async (
    table: string,
  ): Promise<void> => {
    try {
      await indexedDBService.deleteAllItemsFromTable(table);
    } catch (error) {
      console.error(
        "Error deleting stored affiliated entities from IndexedDB:",
        error,
      );
    }
  };

  const storeProfilePicture = async (
    index: string,
    blob: Blob,
  ): Promise<void> => {
    try {
      await indexedDBService.addItem(PROFILE_PICTURES_TABLE, index, blob);
    } catch (error) {
      console.error("Error storing profile picture in IndexedDB:", error);
    }
  };

  const getStoredProfilePicture = async (
    index: string,
  ): Promise<Blob | null> => {
    try {
      const returnedProfilePicture =
        await indexedDBService.getItemByIndexFromTable(
          PROFILE_PICTURES_TABLE,
          index,
        );
      return returnedProfilePicture as Blob | null;
    } catch (error) {
      console.error(
        "Error getting stored profile picture in IndexedDB:",
        error,
      );
      return null;
    }
  };

  const storeThumbnail = async (
    index: string,
    thumbnail: Thumbnail,
  ): Promise<void> => {
    try {
      await indexedDBService.addItem(THUMBNAILS_TABLE, index, thumbnail);
    } catch (error) {
      console.error("Error storing thumbnail in IndexedDB:", error);
    }
  };

  const getStoredThumbnail = async (
    index: string,
  ): Promise<Thumbnail | null> => {
    try {
      const returnedImage = await indexedDBService.getItemByIndexFromTable(
        THUMBNAILS_TABLE,
        index,
      );
      return returnedImage as Thumbnail | null;
    } catch (error) {
      console.error("Error getting stored thumbnail in IndexedDB:", error);
      return null;
    }
  };

  const getStoredContacts = async (): Promise<Contact[]> => {
    try {
      const contacts =
        await indexedDBService.getAllItemsFromTable(CONTACTS_TABLE);
      return contacts as Contact[];
    } catch (error) {
      console.error("Error getting stored contacts in IndexedDB:", error);
      return [];
    }
  };

  const storeContacts = async (contacts: Contact[]): Promise<void> => {
    try {
      for (let i = 0; i < contacts.length; i++) {
        await indexedDBService.addItem(
          CONTACTS_TABLE,
          contacts[i].contact_id,
          contacts[i],
        );
      }
    } catch (error) {
      console.error("Error storing contacts in IndexedDB:", error);
    }
  };

  const storeContact = async (contact: Contact): Promise<void> => {
    try {
      await indexedDBService.addItem(
        CONTACTS_TABLE,
        contact.contact_id,
        contact,
      );
    } catch (error) {
      console.error("Error storing contact in IndexedDB:", error);
    }
  };

  const deleteStoredContacts = async (): Promise<void> => {
    try {
      await indexedDBService.deleteAllItemsFromTable(CONTACTS_TABLE);
    } catch (error) {
      console.error("Error deleting stored contacts from IndexedDB:", error);
    }
  };

  const getStoredConversations = async (): Promise<Conversation[]> => {
    try {
      const conversations =
        await indexedDBService.getAllItemsFromTable(CONVERSATIONS_TABLE);
      return conversations as Conversation[];
    } catch (error) {
      console.error("Error getting stored conversations in IndexedDB:", error);
      return [];
    }
  };

  const storeConversations = async (
    conversations: Conversation[],
  ): Promise<void> => {
    try {
      for (let i = 0; i < conversations.length; i++) {
        await indexedDBService.addItem(
          CONVERSATIONS_TABLE,
          conversations[i].conversation_id,
          conversations[i],
        );
      }
    } catch (error) {
      console.error("Error storing converstaions in IndexedDB:", error);
    }
  };

  const storeConversation = async (
    conversation: Conversation,
  ): Promise<void> => {
    try {
      await indexedDBService.addItem(
        CONVERSATIONS_TABLE,
        conversation.conversation_id,
        conversation,
      );
    } catch (error) {
      console.error("Error storing conversation in IndexedDB:", error);
    }
  };

  const deleteStoredConversations = async (): Promise<void> => {
    try {
      await indexedDBService.deleteAllItemsFromTable(CONVERSATIONS_TABLE);
    } catch (error) {
      console.error(
        "Error deleting stored conversations from IndexedDB:",
        error,
      );
    }
  };

  const getStoredTables = async (): Promise<Table[]> => {
    try {
      const tables = await indexedDBService.getAllItemsFromTable(TABLES_TABLE);
      return tables as Table[];
    } catch (error) {
      console.error("Error getting stored tables in IndexedDB:", error);
      return [];
    }
  };

  const storeTables = async (tables: Table[]): Promise<void> => {
    try {
      for (let i = 0; i < tables.length; i++) {
        await indexedDBService.addItem(
          TABLES_TABLE,
          tables[i].table_id,
          tables[i],
        );
      }
    } catch (error) {
      console.error("Error storing tables in IndexedDB:", error);
    }
  };

  const storeTable = async (table: Table): Promise<void> => {
    try {
      await indexedDBService.addItem(TABLES_TABLE, table.table_id, table);
    } catch (error) {
      console.error("Error storing table in IndexedDB:", error);
    }
  };

  const deleteStoredTables = async (): Promise<void> => {
    try {
      await indexedDBService.deleteAllItemsFromTable(TABLES_TABLE);
    } catch (error) {
      console.error("Error deleting stored tables from IndexedDB:", error);
    }
  };

  const value: IDBService = {
    db: indexedDBService.db,
    addItem: indexedDBService.addItem,
    getAllItemsFromTable: indexedDBService.getAllItemsFromTable,
    getItemByIndexFromTable: indexedDBService.getItemByIndexFromTable,
    deleteAllItemsFromTable: indexedDBService.deleteAllItemsFromTable,
    clearAllIndexedDBData: indexedDBService.clearAllIndexedDBData,
    storeAffiliatedEntity: storeAffiliatedEntity,
    getStoredAffiliatedEntities: getStoredAffiliatedEntities,
    storeAffiliatedEntities: storeAffiliatedEntities,
    deleteStoredAffiliatedEntities: deleteStoredAffiliatedEntities,
    storeProfilePicture: storeProfilePicture,
    getStoredProfilePicture: getStoredProfilePicture,
    storeThumbnail: storeThumbnail,
    getStoredThumbnail: getStoredThumbnail,
    getStoredContacts: getStoredContacts,
    storeContacts: storeContacts,
    storeContact: storeContact,
    deleteStoredContacts: deleteStoredContacts,
    getStoredConversations: getStoredConversations,
    storeConversations: storeConversations,
    storeConversation: storeConversation,
    deleteStoredConversations: deleteStoredConversations,
    getStoredTables: getStoredTables,
    storeTables: storeTables,
    storeTable: storeTable,
    deleteStoredTables: deleteStoredTables,
  };

  return (
    <IndexedDBContext.Provider value={value}>
      {children}
    </IndexedDBContext.Provider>
  );
};

export default IndexedDBContext;
