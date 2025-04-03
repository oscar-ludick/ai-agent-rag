import { ResourceRepository, ResourceModel } from '../domain';

import { ResourcePostgresDatasource } from './datasources';
import { ResourceEntityMapper, ResourceModelMapper } from './mappers';

export class ResourceDataRepository extends ResourceRepository {
  private readonly datasource!: ResourcePostgresDatasource;

  public constructor() {
    super();
    this.datasource = new ResourcePostgresDatasource();
  }

  public async delete(): Promise<void> {
    await this.datasource.delete();
  }

  public async insert(model: ResourceModel): Promise<ResourceModel> {
    const entity = ResourceModelMapper.toEntity(model);
    const [resource] = await this.datasource.insert(entity);
    return ResourceEntityMapper.toModel(resource);
  }
}
