import { ScannerPrompt, ScannerConstructor } from "./types";

export abstract class Scanner {
  private static instance: Scanner;

  public static builder(clazz: ScannerConstructor): Scanner {
    if (!this.instance) {
      this.instance = new clazz();
    }
    return this.instance;
  }

  public abstract setInputProcess(input: NodeJS.ReadableStream): Scanner;

  public abstract setOutputProcess(output: NodeJS.WritableStream): Scanner;

  public abstract setPromptMessage(message: string): Scanner;

  public abstract setPromptAction(onPrompt: ScannerPrompt): Scanner;

  public abstract start(): void;
}
