import { IDUtil, UseCase } from '../../../../libraries/core';

import { EmbeddingModel } from '../models';
import { EmbeddingInsertException } from '../exceptions';
import { EmbeddingRepository } from '../embedding-repository';

export class EmbeddingInsertManyUseCase
  implements UseCase<Promise<EmbeddingModel[]>, [string, EmbeddingModel[]]>
{
  public constructor(private readonly repository: EmbeddingRepository) {}

  public async execute(
    resourceId: string,
    embeddings: EmbeddingModel[],
  ): Promise<EmbeddingModel[]> {
    const models: EmbeddingModel[] = [];
    for (const embedding of embeddings) {
      embedding.id = IDUtil.createRandomID();
      embedding.resourceId = resourceId;
      if (embedding.content !== '') {
        try {
          const model = await this.repository.insert(embedding);
          models.push(model!!);
        } catch (_) {
          console.log(new EmbeddingInsertException());
        }
      }
    }
    return models;
  }
}
