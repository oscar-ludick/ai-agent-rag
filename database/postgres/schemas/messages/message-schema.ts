import { sql } from 'drizzle-orm';
import { text, varchar, timestamp, pgTable } from 'drizzle-orm/pg-core';

export const MessageSchema = pgTable('messages', {
  id: varchar('id', { length: 191 }).primaryKey(),
  chatId: text('chat_id').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at')
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp('updated_at')
    .notNull()
    .default(sql`now()`),
});
