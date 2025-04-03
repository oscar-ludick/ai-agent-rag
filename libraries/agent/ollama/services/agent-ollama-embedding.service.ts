import ollama from 'ollama';

import { AgentEmbedding } from '../../interfaces';
import { AgentOllamaModel } from '../enums';

export class AgentOllamaEmbeddingService {
  public async create(chunks: string[]): Promise<AgentEmbedding[]> {
    const input: string[] = chunks.slice();
    const model: AgentOllamaModel = AgentOllamaModel.NOMIC;
    const { embeddings } = await ollama.embed({ model, input });
    return embeddings.map((embedding: number[], index: number): AgentEmbedding => {
      return { embedding, content: chunks[index] };
    });
  }
}
