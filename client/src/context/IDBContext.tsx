import React, { createContext, useContext } from "react";
import { useIndexedDB } from "@IDB/IDBService";
import { IndexedDBProviderProps, IDBService } from "@FgTypes/contextTypes";
import { Group, Individual, Organization } from "@FgTypes/leftTypes";
import { table } from "console";

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
    if (indexedDBService.db) {
      try {
        const storedEntities =
          await indexedDBService.getAllItemsFromTable(table);
        return storedEntities;
      } catch (error) {
        console.error("Error getting stored entities from IndexedDB:", error);
        return [];
      }
    } else {
      return [];
    }
  };

  const storeAffiliatedEntities = async (
    table: string,
    sortedData: Individual[] | Group[] | Organization[],
  ) => {
    if (indexedDBService.db) {
      try {
        for (let i = 0; i < sortedData.length; i++) {
          await storeAffiliatedEntity(table, i, sortedData[i]);
        }
      } catch (error) {
        console.error("Error storing sorted individuals in IndexedDB:", error);
      }
    }
  };

  const deleteStoredAffiliatedEntities = async (
    table: string,
  ): Promise<void> => {
    if (indexedDBService.db) {
      try {
        await indexedDBService.deleteAllItemsFromTable(table);
      } catch (error) {
        console.error("Error deleting stored entities from IndexedDB:", error);
      }
    }
  };

  const value: IDBService = {
    db: indexedDBService.db,
    addItem: indexedDBService.addItem,
    getAllItemsFromTable: indexedDBService.getAllItemsFromTable,
    storeAffiliatedEntity: storeAffiliatedEntity,
    getStoredAffiliatedEntities: getStoredAffiliatedEntities,
    storeAffiliatedEntities: storeAffiliatedEntities,
    deleteStoredAffiliatedEntities: deleteStoredAffiliatedEntities,
  };

  return (
    <IndexedDBContext.Provider value={value}>
      {children}
    </IndexedDBContext.Provider>
  );
};

export default IndexedDBContext;
