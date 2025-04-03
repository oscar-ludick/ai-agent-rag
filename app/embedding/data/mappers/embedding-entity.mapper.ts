import { EmbeddingModel } from '../../domain';

import { EmbeddingEntity } from '../entities';

export class EmbeddingEntityMapper {
  public static toModel(entity: EmbeddingEntity): EmbeddingModel {
    return {
      id: entity.id,
      content: entity.content,
      embedding: entity.embedding,
      resourceId: entity.resourceId,
      similarity: entity.similarity,
    };
  }
}
