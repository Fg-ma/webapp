import { useState, useEffect, useRef } from "react";

export const IDB_NAME = "FgIDB";
export const IDB_VERSION = 1;
export const AFFILIATED_INDIVIDUALS_TABLE = "affiliatedIndividuals";
export const AFFILIATED_GROUPS_TABLE = "affiliatedGroups";
export const AFFILIATED_ORGANIZATIONS_TABLE = "affiliatedOrganizations";
export const PROFILE_PICTURES = "profilePictures";

export function useIndexedDB() {
  const db = useRef<IDBDatabase | null>(null);

  let indexedDBInstance: IDBDatabase | null = null;

  const init = async () => {
    try {
      const request = window.indexedDB.open(IDB_NAME, IDB_VERSION);

      request.onerror = (event: Event) => {
        console.error("Error opening database");
      };

      const dbPromise = new Promise<void>((resolve, reject) => {
        request.onsuccess = (event: Event) => {
          indexedDBInstance = (event.target as IDBRequest<IDBDatabase>).result;
          db.current = indexedDBInstance;
          resolve();
        };
      });

      await dbPromise;

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
          !indexedDBInstance.objectStoreNames.contains(AFFILIATED_GROUPS_TABLE)
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
    } catch (error) {
      console.error("Error initializing IndexedDB:", error);
    }
  };

  // Close indexedDBInstance
  useEffect(() => {
    return () => {
      if (indexedDBInstance) {
        indexedDBInstance.close();
      }
    };
  }, []);

  const addItem = async <T>(
    table: string,
    index: number | string,
    item: T,
  ): Promise<number> => {
    if (!db.current) {
      await init();
    }

    if (!db.current) {
      throw new Error("No db");
    }

    const transaction = db.current.transaction([table], "readwrite");
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

  const getAllItemsFromTable = async <T>(table: string): Promise<T[]> => {
    if (!db.current) {
      await init();
    }

    if (!db.current) {
      throw new Error("No db");
    }

    const transaction = db.current.transaction([table], "readonly");
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
    if (!db.current) {
      await init();
    }

    if (!db.current) {
      throw new Error("No db");
    }

    const transaction = db.current.transaction([table], "readonly");
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
    if (!db.current) {
      await init();
    }

    if (!db.current) {
      throw new Error("No db");
    }

    const transaction = db.current.transaction([table], "readwrite");
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
      if (!db.current) {
        await init();
        console.log("wqorsl", db.current);
      }

      if (!db.current) {
        console.log("eonslf");
        throw new Error("No db");
      }

      const transaction = db.current.transaction(
        db.current.objectStoreNames,
        "readwrite",
      );

      for (const storeName of Array.from(db.current.objectStoreNames)) {
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
    db: db.current,
    addItem,
    getAllItemsFromTable,
    getItemByIndexFromTable,
    deleteAllItemsFromTable,
    clearAllIndexedDBData,
  };
}
