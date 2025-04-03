import { UseCase } from '../../libraries/core';

import { EmbeddingDataRepository } from './data';
import {
  EmbeddingInsertManyUseCase,
  EmbeddingDeleteManyUseCase,
  EmbeddingSelectSimilarityUseCase,
  EmbeddingModel,
} from './domain';

export class EmbeddingFacade {
  public readonly insertManyUseCase!: UseCase<
    Promise<EmbeddingModel[]>,
    [string, EmbeddingModel[]]
  >;

  public readonly deleteManyUseCase!: UseCase<Promise<void>>;

  public readonly selectSimilarityUseCase!: UseCase<Promise<EmbeddingModel[]>, [number[]]>;

  public constructor() {
    const repository = new EmbeddingDataRepository();
    this.insertManyUseCase = new EmbeddingInsertManyUseCase(repository);
    this.deleteManyUseCase = new EmbeddingDeleteManyUseCase(repository);
    this.selectSimilarityUseCase = new EmbeddingSelectSimilarityUseCase(repository);
  }
}
