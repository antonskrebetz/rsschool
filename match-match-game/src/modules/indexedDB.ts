export class IndexedDB {
  public db: IDBDatabase | undefined;

  constructor() {
    this.init('antonskrebetz');
  }

  init(dbName: string, version?: number) {
    const iDB = window.indexedDB;
    const openRequest = iDB.open(dbName, version);
    openRequest.onupgradeneeded = () => {
      const database = openRequest.result;

      if (!database.objectStoreNames.contains('users')) {
        const users = database.createObjectStore('users',
          { keyPath: 'email' });
      }

      if (!database.objectStoreNames.contains('results')) {
        const notesOS = database.createObjectStore('results',
          { autoIncrement: true });
      }
      this.db = database;
    };
    openRequest.onsuccess = () => {
      this.db = openRequest.result;
    };
  }

  setData(objStore: string, email:string, firstName: string, lastName: string, avatar: string, score?: number) {
    if (!this.db) throw new Error('IndexedDB initialization error');
    const transaction = this.db.transaction(objStore, 'readwrite');
    const store = transaction.objectStore(objStore);
    const result = store.put({
      email,
      firstName,
      lastName,
      avatar,
      score,
    });

    result.onsuccess = () => {
      console.log('complete');
    };
    result.onerror = () => {
      console.log('error');
    };
  }

  async getData(objStore: string) {
    return new Promise((res, rej) => {
      if (!this.db) throw new Error('IndexedDB initialization error');
      const transaction = this.db.transaction(objStore, 'readonly');
      const store = transaction.objectStore(objStore);
      const result = store.getAll();
      transaction.oncomplete = () => {
        const arr: Array<any> = result.result;
        arr.sort((prev: any, next: any) => next.score - prev.score);
        res(arr);
      };
      transaction.onerror = () => {
        rej(result.error);
      };
    });
  }
}
