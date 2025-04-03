export class ResourceInsertException extends Error {
  constructor() {
    super('An error on inserting the resource');
    this.name = 'ResourceInsertException';
  }
}
