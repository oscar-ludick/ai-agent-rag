import { ResourceModel } from '../../domain';

import { ResourceEntity } from '../entities';

export class ResourceModelMapper {
  public static toEntity(model: ResourceModel): ResourceEntity {
    return {
      id: model.id!!,
      content: model.content,
      source: model.source,
    };
  }
}
