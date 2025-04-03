import { MessageRepository, MessageModel } from '../domain';

import { MessagePostgresDatasource } from './datasources';
import { MessageEntityMapper, MessageModelMapper } from './mappers';

export class MessageDataRepository extends MessageRepository {
  private readonly datasource!: MessagePostgresDatasource;

  public constructor() {
    super();
    this.datasource = new MessagePostgresDatasource();
  }

  public findByAll(): Promise<MessageModel[]> {
    return this.datasource.findByAll();
  }

  public async insert(model: MessageModel): Promise<MessageModel> {
    const entity = MessageModelMapper.toEntity(model);
    const [embedding] = await this.datasource.insert(entity);
    return MessageEntityMapper.toModel(embedding);
  }
}
