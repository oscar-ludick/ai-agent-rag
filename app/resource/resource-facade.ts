import { UseCase } from '../../libraries/core';

import { ResourceDataRepository } from './data';
import { ResourceInsertOneUseCase, ResourceDeleteManyUseCase, ResourceModel } from './domain';

export class ResourceFacade {
  public readonly insertOneUseCase!: UseCase<Promise<ResourceModel | null>, [ResourceModel]>;

  public readonly deleteManyUseCase!: UseCase<Promise<void>>;

  public constructor() {
    const repository = new ResourceDataRepository();
    this.insertOneUseCase = new ResourceInsertOneUseCase(repository);
    this.deleteManyUseCase = new ResourceDeleteManyUseCase(repository);
  }
}
