import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { ResourceInsertSchema, ResourceSchema, PostgresConnection } from '../../../../database';

import { ResourceEntity } from '../entities';

export class ResourcePostgresDatasource {
  private readonly connection!: PostgresJsDatabase;

  public constructor() {
    this.connection = PostgresConnection.connect();
  }

  public insert(input: ResourceEntity): Promise<ResourceEntity[]> {
    const values = ResourceInsertSchema.parse(input);
    return this.connection.insert(ResourceSchema).values(values).returning();
  }

  public delete(): Promise<ResourceEntity[]> {
    return this.connection.delete(ResourceSchema).returning();
  }
}
