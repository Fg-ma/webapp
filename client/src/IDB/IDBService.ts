import { error } from "console";
import { useState, useEffect } from "react";

export const IDB_NAME = "FgIDB";
export const IDB_VERSION = 1;
export const AFFILIATED_INDIVIDUALS_TABLE = "affiliatedIndividuals";
export const AFFILIATED_GROUPS_TABLE = "affiliatedGroups";
export const AFFILIATED_ORGANIZATIONS_TABLE = "affiliatedOrganizations";
export const PROFILE_PICTURES = "profilePictures";

export function useIndexedDB() {
  const [db, setDb] = useState<IDBDatabase | null>(null);

  useEffect(() => {
    let indexedDBInstance: IDBDatabase | null = null;

    const initDB = async () => {
      return new Promise<void>((resolve, reject) => {
        const request = window.indexedDB.open(IDB_NAME, IDB_VERSION);

        request.onerror = (event: Event) => {
          reject("Error opening database");
        };

        request.onsuccess = (event: Event) => {
          indexedDBInstance = (event.target as IDBRequest<IDBDatabase>).result;
          setDb(indexedDBInstance);
          resolve();
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
          if (!indexedDBInstance.objectStoreNames.contains(PROFILE_PICTURES)) {
            indexedDBInstance.createObjectStore(PROFILE_PICTURES);
          }
        };
      });
    };

    const init = async () => {
      try {
        await initDB();
      } catch (error) {
        console.error("Error initializing IndexedDB:", error);
      }
    };

    init();

    return () => {
      if (indexedDBInstance) {
        indexedDBInstance.close();
      }
    };
  }, []);

  const addItem = <T>(
    table: string,
    index: number | string,
    item: T,
  ): Promise<number> => {
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
        resolve(0);
      };
    });
  };

  const getAllItemsFromTable = <T>(table: string): Promise<T[]> => {
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
  };

  const getItemByIndexFromTable = async <T>(
    table: string,
    index: string | number,
  ): Promise<T | null> => {
    if (!db) {
      throw new Error("Database is not initialized");
    }

    const transaction = db.transaction([table], "readonly");
    const store = transaction.objectStore(table);

    const getRequest = store.get(index); // fix

    return new Promise<T | null>((resolve, rejesct) => {
      getRequest.onsuccess = (event: Event) => {
        const getResult = event.target as IDBRequest<T>;
        resolve(getResult.result);
      };

      getRequest.onerror = (event: Event) => {
        resolve(null);
      };
    });
  };

  const deleteAllItemsFromTable = async (table: string): Promise<void> => {
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
  };

  const clearAllIndexedDBData = async () => {
    try {
      console.log("w");

      if (!db) {
        // fix
        await new Promise<void>((resolve) => {
          const checkDBInitialized = setInterval(() => {
            if (db) {
              clearInterval(checkDBInitialized);
              resolve();
            }
          }, 100);
        });
      }

      console.log("w2");

      if (!db) {
        throw new Error("adsad");
      }

      const transaction = db.transaction(db.objectStoreNames, "readwrite");

      for (const storeName of Array.from(db.objectStoreNames)) {
        const store = transaction.objectStore(storeName);

        const range = IDBKeyRange.lowerBound(0);
        const cursorRequest = store.openCursor(range);

        cursorRequest.onsuccess = async (event: Event) => {
          const cursor = (event.target as IDBRequest<IDBCursorWithValue>)
            ?.result;

          if (cursor) {
            cursor.delete();
            cursor.continue();
          }
        };
      }

      await new Promise<void>((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      });
    } catch (error) {
      console.error("Error clearing IndexedDB data:", error);
    }
  };

  return {
    db,
    addItem,
    getAllItemsFromTable,
    getItemByIndexFromTable,
    deleteAllItemsFromTable,
    clearAllIndexedDBData,
  };
}
