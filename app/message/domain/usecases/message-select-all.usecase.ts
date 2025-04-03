import { UseCase } from '../../../../libraries/core';

import { MessageSelectException } from '../exceptions';
import { MessageRepository } from '../message-repository';
import { MessageModel } from '../models';

export class MessageSelectAllUseCase implements UseCase<Promise<MessageModel[]>> {
  public constructor(private readonly repository: MessageRepository) {}

  public async execute(): Promise<MessageModel[]> {
    try {
      return this.repository.findByAll();
    } catch (_) {
      console.log(new MessageSelectException());
      return [];
    }
  }
}
