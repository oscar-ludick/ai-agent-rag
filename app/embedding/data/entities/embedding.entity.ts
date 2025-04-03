export interface EmbeddingEntity {
  readonly id: string;
  readonly content: string;
  readonly embedding: number[];
  readonly resourceId?: string | null;
  readonly similarity?: number;
}
