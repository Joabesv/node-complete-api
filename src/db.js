import { readFile, writeFile } from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  // db generico, as keys seriam como "tabelas"
  // database = { users: [], log: [], qualquerCoisa: [] }
  #database = {};

  constructor() {
    readFile(databasePath, 'utf8')
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        // guarantee that the file will exists even if theres no data
        this.#persist();
      });
  }

  #persist() {
    writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }
}
