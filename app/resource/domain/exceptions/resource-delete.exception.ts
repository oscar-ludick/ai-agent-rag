export class ResourceDeleteException extends Error {
  constructor() {
    super('An error on deleting the resources');
    this.name = 'ResourceDeleteException';
  }
}
