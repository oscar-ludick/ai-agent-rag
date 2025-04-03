import { cosineDistance, desc, sql, gt } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { EmbeddingInsertSchema, EmbeddingSchema, PostgresConnection } from '../../../../database';

import { EmbeddingEntity } from '../entities';

export class EmbeddingPostgresDatasource {
  private readonly connection!: PostgresJsDatabase;

  public constructor() {
    this.connection = PostgresConnection.connect();
  }

  public insert(input: EmbeddingEntity): Promise<EmbeddingEntity[]> {
    const values = EmbeddingInsertSchema.parse(input);
    return this.connection.insert(EmbeddingSchema).values(values).returning();
  }

  public delete(): Promise<EmbeddingEntity[]> {
    return this.connection.delete(EmbeddingSchema).returning();
  }

  public findSimilarityByEmbeddings(
    embeddings: number[],
    options: { max: number; limit: number },
  ): Promise<EmbeddingEntity[]> {
    const similarity = sql<number>`1 - (${cosineDistance(EmbeddingSchema.embedding, embeddings)})`;
    const query = {
      id: EmbeddingSchema.id,
      embedding: EmbeddingSchema.embedding,
      resourceId: EmbeddingSchema.resourceId,
      content: EmbeddingSchema.content,
      similarity,
    };
    return this.connection
      .select(query)
      .from(EmbeddingSchema)
      .where(gt(similarity, options.max))
      .orderBy((t) => desc(t.similarity))
      .limit(options.limit);
  }
}
