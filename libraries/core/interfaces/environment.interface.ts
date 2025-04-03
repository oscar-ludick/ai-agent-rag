export interface Environment {
  readonly OPEN_AI_KEY: string;
  readonly DATABASE_URL: string;
  readonly DATABASE_NAME: string;
  readonly DATA_DIRECTORY: string;
  readonly CHUNK_SIZE: string;
  readonly CHUNK_SPLIT: string;
  readonly AI_MODEL: string;
  readonly AI_ALIVE: string;
}
