export interface UseCase<T, R extends any[] = any[]> {
  readonly execute: (...args: R) => T;
}
