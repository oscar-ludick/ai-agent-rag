import { ScannerPrompt } from "../types";

export class ScannerBuilderModel {
  public message!: string;
  public action!: ScannerPrompt;
  public input!: NodeJS.ReadableStream
  public output!: NodeJS.WritableStream
}