import { MessageModel } from '../../domain';

import { MessageEntity } from '../entities';

export class MessageModelMapper {
  public static toEntity(model: MessageModel): MessageEntity {
    return {
      id: model.id!!,
      message: model.message,
      chatId: model.chatId,
    };
  }
}
