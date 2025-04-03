import { MetadataOption, MetadataResult } from './interfaces';

export abstract class Metadata {
  public abstract createMetadata(
    entries: Map<string, string>,
    options: MetadataOption,
  ): MetadataResult[];
}
