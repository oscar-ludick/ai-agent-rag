import { generateId } from 'ai';

import { UseCase } from '../../../../libraries/core';

import { ResourceModel } from '../models';
import { ResourceInsertException } from '../exceptions';
import { ResourceRepository } from '../resource-repository';

export class ResourceInsertOneUseCase
  implements UseCase<Promise<ResourceModel | null>, [ResourceModel]>
{
  public constructor(private readonly repository: ResourceRepository) {}

  public async execute(resource: ResourceModel): Promise<ResourceModel | null> {
    try {
      resource.id = generateId();
      return await this.repository.insert(resource);
    } catch (_) {
      console.log(new ResourceInsertException());
      return null;
    }
  }
}
