import { MessageModel } from './models';

export abstract class MessageRepository {
  public abstract findByAll(): Promise<MessageModel[]>;

  public abstract insert(model: MessageModel): Promise<MessageModel | null>;
}
