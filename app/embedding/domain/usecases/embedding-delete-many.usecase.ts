import { UseCase } from '../../../../libraries/core';

import { EmbeddingDeleteException } from '../exceptions';
import { EmbeddingRepository } from '../embedding-repository';

export class EmbeddingDeleteManyUseCase implements UseCase<Promise<void>> {
  public constructor(private readonly repository: EmbeddingRepository) {}

  public async execute(): Promise<void> {
    try {
      await this.repository.delete();
    } catch (_) {
      console.log(new EmbeddingDeleteException().message);
    }
  }
}
