import * as readline from 'node:readline';

import { Scanner } from '../scanner';
import { ScannerEvent } from '../enums';
import { ScannerPrompt } from '../types';
import { ScannerBuilderModel } from '../models';

export class ScannerService extends Scanner {
  private scanner!: readline.Interface;

  private readonly scannerBuilderModel!: ScannerBuilderModel;

  public constructor() {
    super();
    this.scannerBuilderModel = new ScannerBuilderModel();
  }

  public setInputProcess(input: NodeJS.ReadableStream): Scanner {
    this.scannerBuilderModel.input = input;
    return this;
  }

  public setOutputProcess(output: NodeJS.WritableStream): Scanner {
    this.scannerBuilderModel.output = output;
    return this;
  }

  public setPromptMessage(message: string): Scanner {
    this.scannerBuilderModel.message = message;
    return this;
  }

  public setPromptAction(onPrompt: ScannerPrompt): Scanner {
    this.scannerBuilderModel.action = onPrompt.bind(this);
    return this;
  }

  public start(): void {
    const { message, input, output } = this.scannerBuilderModel;
    const onStdout = (content: string): void => {
      this.scannerBuilderModel.output.write(content);
    };
    this.scanner = readline.createInterface({ input, output });
    this.scanner.on(ScannerEvent.LINE, async (prompt: string): Promise<void> => {
      await this.scannerBuilderModel.action(prompt, onStdout);
      this.scanner.prompt();
    });
    this.scanner.question(message, () => this.scanner.prompt());
  }
}
