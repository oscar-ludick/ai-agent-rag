export abstract class Parser {
  public abstract parse(path: string): Map<string, string>;
}
