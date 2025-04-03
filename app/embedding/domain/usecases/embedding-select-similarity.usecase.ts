import { UseCase } from '../../../../libraries/core';

import { EmbeddingModel } from '../models';
import { EmbeddingDeleteException } from '../exceptions';
import { EmbeddingRepository } from '../embedding-repository';

export class EmbeddingSelectSimilarityUseCase
  implements UseCase<Promise<EmbeddingModel[]>, [number[]]>
{
  public constructor(private readonly repository: EmbeddingRepository) {}

  public async execute(embeddings: number[]): Promise<EmbeddingModel[]> {
    try {
      return this.repository.findSimilarityByEmbeddings(embeddings);
    } catch (_) {
      console.log(new EmbeddingDeleteException());
      return [];
    }
  }
}
