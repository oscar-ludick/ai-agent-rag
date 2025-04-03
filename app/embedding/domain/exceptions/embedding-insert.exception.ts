export class EmbeddingInsertException extends Error {
  constructor() {
    super('An error on inserting the embedding');
    this.name = 'EmbeddingInsertException';
  }
}
