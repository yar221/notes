class DBService {
  // Відкриття підключення до бази даних
  openDB = () => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("MyDatabase", 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Создание объектного хранилища "Note" с полями id, title, text, date
        const noteStore = db.createObjectStore("Note", {
          keyPath: "id",
          autoIncrement: true,
        });
        noteStore.createIndex("titleIndex", "title", { unique: false });
        noteStore.createIndex("dateIndex", "date", { unique: false });
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        resolve(db);
      };

      request.onerror = (event) => {
        reject("Ошибка при открытии базы данных");
      };
    });
  };

  // Отримання всіх записів
  getAllNotes = () => {
    return new Promise((resolve, reject) => {
      this.openDB()
        .then((db) => {
          const transaction = db.transaction("Note", "readonly");
          const noteStore = transaction.objectStore("Note");
          const getAllRequest = noteStore.getAll();

          getAllRequest.onsuccess = (event) => {
            resolve(event.target.result);
          };

          getAllRequest.onerror = (event) => {
            reject("Ошибка при получении записей");
          };
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  addNote = (note) => {
    return new Promise((resolve, reject) => {
      this.openDB()
        .then((db) => {
          const transaction = db.transaction("Note", "readwrite");
          const noteStore = transaction.objectStore("Note");
          const addRequest = noteStore.add(note);

          addRequest.onsuccess = (event) => {
            const newId = event.target.result;
            resolve(newId);
          };

          addRequest.onerror = (event) => {
            reject("Ошибка при добавлении записи");
          };
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // Оновлення запису
  updateNote = (note) => {
    return new Promise((resolve, reject) => {
      this.openDB()
        .then((db) => {
          const transaction = db.transaction("Note", "readwrite");
          const noteStore = transaction.objectStore("Note");
          const updateRequest = noteStore.put(note);

          updateRequest.onsuccess = (event) => {
            resolve("Запись успешно обновлена");
          };

          updateRequest.onerror = (event) => {
            reject("Ошибка при обновлении записи");
          };
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  deleteNote = (id) => {
    return new Promise((resolve, reject) => {
      this.openDB()
        .then((db) => {
          const transaction = db.transaction("Note", "readwrite");
          const noteStore = transaction.objectStore("Note");

          // Проверка на существование записи перед удалением
          const getRequest = noteStore.get(id);
          getRequest.onsuccess = (event) => {
            const existingRecord = event.target.result;
            if (existingRecord) {
              const deleteRequest = noteStore.delete(id);

              deleteRequest.onsuccess = (event) => {
                resolve("Запись успешно удалена");
              };

              deleteRequest.onerror = (event) => {
                reject("Ошибка при удалении записи");
              };
            } else {
              reject("Запись не существует");
            }
          };

          getRequest.onerror = (event) => {
            reject("Ошибка при получении записи");
          };
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export const DBServiceI = new DBService();
