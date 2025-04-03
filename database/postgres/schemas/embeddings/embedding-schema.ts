import { index, text, varchar, vector, pgTable } from 'drizzle-orm/pg-core';

import { ResourceSchema } from '../resources';

export const EmbeddingSchema = pgTable(
  'embeddings',
  {
    id: varchar('id', { length: 191 }).primaryKey(),
    content: text('content').notNull(),
    embedding: vector('embedding', { dimensions: 768 }).notNull(),
    resourceId: varchar('resource_id', { length: 191 }).references(() => ResourceSchema.id, {
      onDelete: 'cascade',
    }),
  },
  (table) => [index('embeddingIndex').using('hnsw', table.embedding.op('vector_cosine_ops'))],
);
