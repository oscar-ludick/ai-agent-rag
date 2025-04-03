export interface ResourceEntity {
  readonly id: string;
  readonly source: string;
  readonly content: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
