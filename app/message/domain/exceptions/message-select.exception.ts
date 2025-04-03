export class MessageSelectException extends Error {
  constructor() {
    super('An error on selecting the messages');
    this.name = 'MessageSelectException';
  }
}
