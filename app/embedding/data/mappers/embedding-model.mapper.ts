import { EmbeddingModel } from '../../domain';

import { EmbeddingEntity } from '../entities';

export class EmbeddingModelMapper {
  public static toEntity(model: EmbeddingModel): EmbeddingEntity {
    return {
      id: model.id!!,
      resourceId: model.resourceId!!,
      embedding: model.embedding,
      content: model.content,
      similarity: undefined,
    };
  }
}
