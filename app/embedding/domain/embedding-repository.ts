import { EmbeddingModel } from './models';

export abstract class EmbeddingRepository {
  public abstract delete(): Promise<void>;

  public abstract insert(model: EmbeddingModel): Promise<EmbeddingModel>;

  public abstract findSimilarityByEmbeddings(embeddings: number[]): Promise<EmbeddingModel[]>;
}
