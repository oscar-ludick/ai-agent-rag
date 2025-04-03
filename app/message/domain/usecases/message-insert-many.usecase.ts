import { IDUtil, UseCase } from '../../../../libraries/core';

import { MessageModel } from '../models';
import { MessageInsertException } from '../exceptions';
import { MessageRepository } from '../message-repository';

export class MessageInsertManyUseCase
  implements UseCase<Promise<MessageModel[]>, [MessageModel[]]>
{
  public constructor(private readonly repository: MessageRepository) {}

  public async execute(messages: MessageModel[]): Promise<MessageModel[]> {
    const models: MessageModel[] = [];
    for (const message of messages) {
      message.id = IDUtil.createRandomID();
      try {
        const model = await this.repository.insert(message);
        models.push(model!!);
      } catch (_) {
        console.log(new MessageInsertException());
      }
    }
    return models;
  }
}
