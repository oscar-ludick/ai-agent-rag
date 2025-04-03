import postgres from 'postgres';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { EnvUtil } from '../../libraries/core';

export class PostgresConnection {
  private static db: postgres.Sql<{}>;

  private static connection: PostgresJsDatabase;

  private constructor() {}

  public static async reset(): Promise<void> {
    if (this.db) {
      await this.db.end();
      this.db = null as never;
      this.connection = null as never;
    }
  }

  public static connect(): PostgresJsDatabase {
    if (!this.connection) {
      const url = EnvUtil.load('DATABASE_URL');
      const database = EnvUtil.load('DATABASE_NAME');
      this.db = postgres(url, { database, max: 1 });
      this.connection = drizzle({ client: this.db });
    }
    return this.connection;
  }

  public static connectPostgres(): PostgresJsDatabase {
    if (!this.connection) {
      const url = EnvUtil.load('DATABASE_URL');
      const database = 'postgres';
      this.db = postgres(url, { database, max: 1 });
      this.connection = drizzle({ client: this.db });
    }
    return this.connection;
  }
}
