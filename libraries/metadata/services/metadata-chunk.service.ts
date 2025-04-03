import { MetadataChunk } from '../interfaces';

export class MetadataChunkService {
  public createSimpleChunks(text: string, split: RegExp): string[] {
    const chunks = text.trim().split(split);
    return chunks.filter((chunk) => chunk !== '') || [];
  }

  public createComplexChunks(text: string, split: RegExp, size: number): string[] {
    const chunks: string[] = [];
    const words = this.createSimpleChunks(text, split);
    const chunk = this.calculateChunks(words, size);
    for (const _ of chunk.iterations) {
      const partition = words.splice(0, chunk.length);
      chunks.push(partition.join(' '));
    }
    chunks.push(words.join(' '));
    return chunks;
  }

  private calculateChunks(words: string[], size: number): MetadataChunk {
    const total = Math.floor(words.length / size);
    const length = Math.floor(words.length / total);
    const iterations = Array(total);
    return { total, length, iterations };
  }
}
