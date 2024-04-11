import React, { createContext, useContext } from "react";
import {
  CONTACTS_TABLE,
  PROFILE_PICTURES_TABLE,
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
      console.error("Error storing entity in IndexedDB:", error);
    }
  };

  const getStoredAffiliatedEntities = async (
    table: string,
  ): Promise<unknown[]> => {
    try {
      const storedEntities = await indexedDBService.getAllItemsFromTable(table);
      return storedEntities;
    } catch (error) {
      console.error("Error getting stored entities from IndexedDB:", error);
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
      console.error("Error storing sorted individuals in IndexedDB:", error);
    }
  };

  const deleteStoredAffiliatedEntities = async (
    table: string,
  ): Promise<void> => {
    try {
      await indexedDBService.deleteAllItemsFromTable(table);
    } catch (error) {
      console.error("Error deleting stored entities from IndexedDB:", error);
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
      console.error("Error storing profile picture in IndexedDB:", error);
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
      console.error("Error storing profile picture in IndexedDB:", error);
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
      console.error("Error storing profile picture in IndexedDB:", error);
      return null;
    }
  };

  const getStoredContacts = async (): Promise<Contact[]> => {
    try {
      const contacts =
        await indexedDBService.getAllItemsFromTable(CONTACTS_TABLE);
      return contacts as Contact[];
    } catch (error) {
      console.error("Error storing profile picture in IndexedDB:", error);
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
      console.error("Error storing profile picture in IndexedDB:", error);
    }
  };

  const deleteStoredContacts = async (): Promise<void> => {
    try {
      await indexedDBService.deleteAllItemsFromTable(CONTACTS_TABLE);
    } catch (error) {
      console.error("Error deleting stored entities from IndexedDB:", error);
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
    deleteStoredContacts: deleteStoredContacts,
  };

  return (
    <IndexedDBContext.Provider value={value}>
      {children}
    </IndexedDBContext.Provider>
  );
};

export default IndexedDBContext;
