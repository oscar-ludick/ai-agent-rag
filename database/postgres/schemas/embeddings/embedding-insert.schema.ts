import { createInsertSchema } from 'drizzle-zod';

import { EmbeddingSchema } from './embedding-schema';

export const EmbeddingInsertSchema = createInsertSchema(EmbeddingSchema).extend({}).omit({});
