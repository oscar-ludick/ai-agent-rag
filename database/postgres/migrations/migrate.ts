import 'dotenv/config';

import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { PostgresConnection } from '../postgres-connection';

const createDatabase = async (database: string): Promise<boolean> => {
  try {
    await PostgresConnection.reset();
    await PostgresConnection.connectPostgres().execute(`CREATE DATABASE ${database}`);
    console.log(`Database created successfully.`);
    return true;
  } catch (error) {
    console.error('Error creating the database:', error);
    return false;
  } finally {
    await PostgresConnection.reset();
  }
};

const validateDatabase = async (database: string): Promise<boolean> => {
  try {
    await PostgresConnection.reset();
    const result = await PostgresConnection.connectPostgres().execute(
      `SELECT 1 FROM pg_database WHERE datname = '${database}';`,
    );
    console.log(`There are ${result.length} databases in postgres`);
    return result.length > 0;
  } catch (error) {
    console.error('Error checking database existence:', error);
    return false;
  } finally {
    await PostgresConnection.reset();
  }
};

const runMigrate = async () => {
  const url = process.env.DATABASE_URL;
  const name = process.env.DATABASE_NAME;
  if (!url || !name) {
    throw new Error('DATABASE_URL and DATABASE_NAME are not defined in the environment');
  }
  const databaseExists = await validateDatabase(name);
  if (!databaseExists) {
    await createDatabase(name);
  }
  const connection = PostgresConnection.connect();
  console.log('⏳ Running migrations...');
  const start = Date.now();
  await migrate(connection, { migrationsFolder: './database/postgres/migrations' });
  const end = Date.now();
  console.log('✅ Migrations completed in', end - start, 'ms');
  process.exit(0);
};

runMigrate().catch((err) => {
  console.error('❌ Migration failed');
  console.error(err);
  process.exit(1);
});
