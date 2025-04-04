import { EmbeddingRepository, EmbeddingModel } from '../domain';

import { EmbeddingPostgresDatasource } from './datasources';
import { EmbeddingEntityMapper, EmbeddingModelMapper } from './mappers';

export class EmbeddingDataRepository extends EmbeddingRepository {
  private readonly datasource!: EmbeddingPostgresDatasource;

  public constructor() {
    super();
    this.datasource = new EmbeddingPostgresDatasource();
  }

  public async delete(): Promise<void> {
    await this.datasource.delete();
  }

  public async insert(model: EmbeddingModel): Promise<EmbeddingModel> {
    const entity = EmbeddingModelMapper.toEntity(model);
    const [embedding] = await this.datasource.insert(entity);
    return EmbeddingEntityMapper.toModel(embedding);
  }

  public async findSimilarityByEmbeddings(embeddings: number[]): Promise<EmbeddingModel[]> {
    const options = { max: 0.3, limit: 10 };
    const entities = await this.datasource.findSimilarityByEmbeddings(embeddings, options);
    return entities.map((entity) => EmbeddingEntityMapper.toModel(entity));
  }
}
