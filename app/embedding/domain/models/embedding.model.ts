export interface EmbeddingModel {
  id?: string;
  similarity?: number;
  resourceId?: string | null;
  content: string;
  embedding: number[];
}
