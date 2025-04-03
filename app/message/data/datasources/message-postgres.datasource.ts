import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { MessageInsertSchema, MessageSchema, PostgresConnection } from '../../../../database';

import { MessageEntity } from '../entities';

export class MessagePostgresDatasource {
  private readonly connection!: PostgresJsDatabase;

  public constructor() {
    this.connection = PostgresConnection.connect();
  }

  public findByAll(): Promise<MessageEntity[]> {
    return this.connection.select().from(MessageSchema);
  }

  public insert(input: MessageEntity): Promise<MessageEntity[]> {
    const values = MessageInsertSchema.parse(input);
    return this.connection.insert(MessageSchema).values(values).returning();
  }
}
