export abstract class Parser {
  public abstract parse(path: string): Promise<Map<string, string>>;
}
