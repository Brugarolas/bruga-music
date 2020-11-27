import fetch from '@/api/utils/fetch.js'; // If you don't have fetch polyfill, you can skip this line

/* Variables */
const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const transaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
const keyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
const safeTimeout = 50; // ms

const DATABASE_NAME = 'localFetchCache';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'requests';

let databaseSupport = Boolean(indexedDB && transaction && keyRange);
let fetchDatabase;

/* Database functions */
const openDatabasePromise = () => {
  return new Promise((resolve, reject) => {
    if (!databaseSupport) {
      reject(new Error('IndexedDB is not supported in this browser'));
    }

    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    // On open
    request.onsuccess = function (event) {
      const database = event.target.result;

      setTimeout(() => {
        resolve(database);
      }, safeTimeout);
    };

    // On error
    request.onerror = (event) => {
      databaseSupport = false;
      reject(new Error('Error while using IndexedDB. Disabling support. Check and debug your code.'));
    };

    // When database model need upgrade - first version, it only needs to create object store and index
    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      const store = database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'url', autoIncrement: false });
      store.createIndex('request_url_id', 'url', { unique: true });
    };
  });
};

const openDatabaseWithErrorHandling = async () => {
  if (!databaseSupport) {
    return { notSupported: true };
  }

  try {
    const database = await openDatabasePromise();

    if (!databaseSupport || !database) {
      return { notSupported: true };
    }

    return database;
  } catch (error) {
    return { notSupported: true, error };
  }
};

const openTransaction = (database, mode) => {
  const transaction = database.transaction(OBJECT_STORE_NAME, mode);
  return transaction.objectStore(OBJECT_STORE_NAME);
};

const openDatabase = async () => {
  const database = await openDatabaseWithErrorHandling();

  if (database.notSupported) {
    return database;
  }

  return {
    read: (url) => new Promise((resolve, reject) => {
      const store = openTransaction(database, 'readonly');

      store.get(url).onsuccess = (event) => {
        resolve(event.target.result);
      };
    }),
    write: (item, overwrite = false) => new Promise((resolve, reject) => {
      const store = openTransaction(database, 'readwrite');
      const operation = overwrite ? store.put(item) : store.add(item);

      operation.onsuccess = (event) => { resolve(true); };
      operation.onerror = (event) => { reject(new Error(event)); };
    }),
    notSupported: false
  };
};

/* Singleton pattern - only one database instance */
const getDatabase = async () => {
  if (!fetchDatabase) {
    fetchDatabase = await openDatabase();
  }
  return fetchDatabase;
};

/* Aux functions */
const cacheIsValid = (cache, options) => {
  if (options.localCache === true) {
    return true;
  }

  const now = Date.now();

  return now - cache.time <= options.localCache;
};

const cacheResponse = (json) => {
  return { json: () => json };
};

/* Main fetch functions */
const tryFech = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    // If response is not ok (HTTP status 2xx) - better to throw an error
    if (!response.ok) {
      throw new Error(`Error ${response.status} ${response.statusText}: ${json.name} - ${json.message}`);
    }

    return { json, success: true };
  } catch (error) {
    return { error, success: false };
  }
};

const fetchCache = async (url, options) => {
  // No local cache options - use default fetch
  if (!options || !options.localCache) {
    return await fetch(url, options);
  }

  // Try to load database
  const database = await getDatabase();

  // IndexedDB database not supported - use default fetch
  if (database.notSupported) {
    return await fetch(url, options);
  }

  // Search URL in cache
  const cache = await database.read(url);

  if (cache && cacheIsValid(cache, options)) {
    // Return saved cache in database
    return cacheResponse(cache.response);
  } else {
    // If request does not exist en cache - fetch with default API
    const response = await tryFech(url, options);

    if (!response.success) {
      throw response.error;
    }

    // Save URL (key) and response in cache database
    setTimeout(async () => {
      database.write({ url, response: response.json, time: Date.now() }, true);
    }, safeTimeout);

    // Return an object with fetch() function to emulate native fetch default response
    return cacheResponse(response.json);
  }
};

export default fetchCache;
