import { createSelectSchema } from 'drizzle-zod';

import { ResourceSchema } from './resource-schema';

export const ResourceInsertSchema = createSelectSchema(ResourceSchema)
  .extend({})
  .omit({ createdAt: true, updatedAt: true });
