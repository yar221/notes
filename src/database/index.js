// const indexedDB = window.indexedDB || window.mozIndexedDB || window.webKitIndexedDB || window.msIndexedDB || window.shimIndexedDB

// // Let us open our database
// const request = indexedDB.open("NotesDB  ", 1);

// let db;
// request.onerror = (event) => {
//     console.error("Why didn't you allow my web app to use IndexedDB?!");
// };
// request.onsuccess = (event) => {
//     db = event.target.result;
// };

// // This event is only implemented in recent browsers
// request.onupgradeneeded = (event) => {
//     // Save the IDBDatabase interface
//     const db = event.target.result;
  
//     // Create an objectStore for this database
//     const objectStore = db.createObjectStore("notes", { keyPath: "id" });
// };
  