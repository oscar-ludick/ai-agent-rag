import { ResourceModel } from './models';

export abstract class ResourceRepository {
  public abstract delete(): Promise<void>;

  public abstract insert(model: ResourceModel): Promise<ResourceModel | null>;
}
