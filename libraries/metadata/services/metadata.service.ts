import { Metadata } from '../metadata';
import { MetadataResult, MetadataOption } from '../interfaces';

import { MetadataChunkService } from './metadata-chunk.service';

export class MetadataService extends Metadata {
  private readonly metadataChunkService = new MetadataChunkService();

  public createMetadata(entries: Map<string, string>, options: MetadataOption): MetadataResult[] {
    const metadata: MetadataResult[] = [];
    const assertedOptions = this.assertOptions(options);
    for (const [source, content] of entries) {
      const chunks = this.createChunks(content, assertedOptions);
      metadata.push({ source, content, chunks });
    }
    return metadata;
  }

  private createChunks(content: string, options: MetadataOption): string[] {
    const { size, split } = options;
    const splitRegex = split as RegExp;
    if (size) {
      this.metadataChunkService.createComplexChunks(content, splitRegex, size);
    }
    return this.metadataChunkService.createSimpleChunks(content, splitRegex);
  }

  private assertOptions(options: MetadataOption): MetadataOption {
    const defaultOptions = { split: /\s+/g };
    let { split, size } = Object.assign({}, defaultOptions, options);
    if (typeof split === 'string') {
      split = new RegExp(split, 'g');
    }
    return { split, size };
  }
}
