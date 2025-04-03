import { UseCase } from '../../libraries/core';

import { MessageDataRepository } from './data';
import { MessageInsertManyUseCase, MessageModel, MessageSelectAllUseCase } from './domain';

export class MessageFacade {
  public readonly selectAllUseCase!: UseCase<Promise<MessageModel[]>>;

  public readonly insertManyUseCase!: UseCase<Promise<MessageModel[]>, [MessageModel[]]>;

  public constructor() {
    const repository = new MessageDataRepository();
    this.insertManyUseCase = new MessageInsertManyUseCase(repository);
    this.selectAllUseCase = new MessageSelectAllUseCase(repository);
  }
}
