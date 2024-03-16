import { useState, useEffect } from "react";

export const IDB_NAME = "FgIDB";
export const IDB_VERSION = 1;
export const AFFILIATED_INDIVIDUALS_TABLE = "affiliatedIndividuals";
export const AFFILIATED_GROUPS_TABLE = "affiliatedGroups";
export const AFFILIATED_ORGANIZATIONS_TABLE = "affiliatedOrganizations";

export function useIndexedDB() {
  const [db, setDb] = useState<IDBDatabase | null>(null);

  useEffect(() => {
    let indexedDBInstance: IDBDatabase;

    function initDB() {
      return new Promise<IDBDatabase>((resolve, reject) => {
        const request = window.indexedDB.open(IDB_NAME, IDB_VERSION);

        request.onerror = (event: Event) => {
          reject("Error opening database");
        };

        request.onsuccess = (event: Event) => {
          indexedDBInstance = (event.target as IDBRequest<IDBDatabase>).result;
          setDb(indexedDBInstance);
          resolve(indexedDBInstance);
        };

        request.onupgradeneeded = (event: Event) => {
          indexedDBInstance = (event.target as IDBRequest<IDBDatabase>).result;
          if (
            !indexedDBInstance.objectStoreNames.contains(
              AFFILIATED_INDIVIDUALS_TABLE,
            )
          ) {
            indexedDBInstance.createObjectStore(AFFILIATED_INDIVIDUALS_TABLE);
          }
          if (
            !indexedDBInstance.objectStoreNames.contains(
              AFFILIATED_GROUPS_TABLE,
            )
          ) {
            indexedDBInstance.createObjectStore(AFFILIATED_GROUPS_TABLE);
          }
          if (
            !indexedDBInstance.objectStoreNames.contains(
              AFFILIATED_ORGANIZATIONS_TABLE,
            )
          ) {
            indexedDBInstance.createObjectStore(AFFILIATED_ORGANIZATIONS_TABLE);
          }
        };
      });
    }

    initDB();

    return () => {
      if (db) {
        db.close();
      }
    };
  }, []);

  async function addItem<T>(
    table: string,
    index: number,
    item: T,
  ): Promise<number> {
    if (!db) {
      throw new Error("Database is not initialized");
    }

    const transaction = db.transaction([table], "readwrite");
    const store = transaction.objectStore(table);

    if (!store) {
      throw new Error("Object store is not available");
    }

    const addRequest = store.add(item, index);

    return new Promise<number>((resolve, reject) => {
      addRequest.onsuccess = (event: Event) => {
        const addEvent = event.target as IDBRequest<IDBValidKey>;
        resolve(addEvent.result as number);
      };

      addRequest.onerror = (event: Event) => {
        reject("Error adding item to database");
      };
    });
  }

  async function getAllItemsFromTable<T>(table: string): Promise<T[]> {
    if (!db) {
      throw new Error("Database is not initialized");
    }

    const transaction = db.transaction([table], "readonly");
    const store = transaction.objectStore(table);

    const getAllRequest = store.getAll();

    return new Promise<T[]>((resolve, reject) => {
      getAllRequest.onsuccess = (event: Event) => {
        const getAllEvent = event.target as IDBRequest<T[]>;
        resolve(getAllEvent.result as T[]);
      };

      getAllRequest.onerror = (event: Event) => {
        reject("Error getting items from database");
      };
    });
  }

  async function deleteAllItemsFromTable(table: string): Promise<void> {
    if (!db) {
      throw new Error("Database is not initialized");
    }

    const transaction = db.transaction([table], "readwrite");
    const store = transaction.objectStore(table);

    const clearRequest = store.clear();

    return new Promise<void>((resolve, reject) => {
      clearRequest.onsuccess = () => {
        resolve();
      };

      clearRequest.onerror = (event: Event) => {
        reject("Error clearing items from table");
      };
    });
  }

  return {
    db,
    addItem,
    getAllItemsFromTable,
    deleteAllItemsFromTable,
  };
}
