import { openDB } from 'idb';

const initdb = async () =>
  openDB('notepad', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('notepad')) {
        console.log('notepad database already exists');
        return;
      }
      db.createObjectStore('notepad', { keyPath: 'id', autoIncrement: true });
      console.log('notepad database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Store values to db');
  const notepadDb = await openDB('notepad', 1);
  const tx = notepadDb.transaction('notepad', 'readwrite');
  const store = tx.objectStore('notepad');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Read values from db');
  const notepadDb = await openDB('notepad', 1);
  const tx = notepadDb.transaction('notepad', 'readonly');
  const store = tx.objectStore('notepad');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  return result;
};




initdb();
