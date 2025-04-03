export interface MessageEntity {
  readonly id: string;
  readonly chatId: string;
  readonly message: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
