export class EmbeddingDeleteException extends Error {
  constructor() {
    super('An error on deleting the embeddings');
    this.name = 'EmbeddingDeleteException';
  }
}
