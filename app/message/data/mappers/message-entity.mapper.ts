import { MessageModel } from '../../domain';

import { MessageEntity } from '../entities';

export class MessageEntityMapper {
  public static toModel(entity: MessageEntity): MessageModel {
    return {
      id: entity.id,
      message: entity.message,
      chatId: entity.chatId,
    };
  }
}
