import { UseCase } from '../../../../libraries/core';

import { ResourceDeleteException } from '../exceptions';
import { ResourceRepository } from '../resource-repository';

export class ResourceDeleteManyUseCase implements UseCase<Promise<void>> {
  public constructor(private readonly repository: ResourceRepository) {}

  public async execute(): Promise<void> {
    try {
      await this.repository.delete();
    } catch (_) {
      console.log(new ResourceDeleteException());
    }
  }
}
