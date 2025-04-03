export class MessageInsertException extends Error {
  constructor() {
    super('An error on inserting the message');
    this.name = 'MessageInsertException';
  }
}
