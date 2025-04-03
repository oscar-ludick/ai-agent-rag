import type { Config } from 'drizzle-kit';

export default {
  dialect: 'postgresql',
  schema: [
    './database/postgres/schemas/messages/message-schema.ts',
    './database/postgres/schemas/resources/resource-schema.ts',
    './database/postgres/schemas/embeddings/embedding-schema.ts',
  ],
  out: './database/postgres/migrations',
  dbCredentials: {
    url: `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`,
  },
} satisfies Config;
