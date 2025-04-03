import { ResourceModel } from '../../domain';

import { ResourceEntity } from '../entities';

export class ResourceEntityMapper {
  public static toModel(entity: ResourceEntity): ResourceModel {
    return {
      id: entity.id,
      content: entity.content,
      source: entity.source,
    };
  }
}
