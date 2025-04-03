import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { MessageSchema } from './message-schema';

export const MessageInsertSchema = createInsertSchema(MessageSchema)
  .extend({})
  .omit({ createdAt: true, updatedAt: true });
