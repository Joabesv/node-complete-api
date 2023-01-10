import { writeFile } from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  // db generico, as keys seriam como "tabelas"
  // database = { users: [], log: [], qualquerCoisa: [] }
  #database = {};

  async #persist() {
    await writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];

    return data;
  }

  async insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    await this.#persist();

    return data;
  }
}
