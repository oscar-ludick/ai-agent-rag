import { readFileSync, readdirSync } from 'fs';

import { Parser } from '../parser';
import { ParserFile } from '../enums';

export class ParserTextService extends Parser {
  private readonly textEncoding = 'utf-8';

  public parse(directory: string): Map<string, string> {
    const map = new Map<string, string>();
    const files = this.readTxtFiles(directory);
    for (const file of files) {
      const value = this.readTxtContent(file);
      map.set(file, value);
    }
    return map;
  }

  private readTxtFiles(directory: string): string[] {
    const files = readdirSync(directory, { recursive: true, encoding: this.textEncoding });
    const txtFiles = files.filter((file) => file.match(ParserFile.TXT));
    return txtFiles.map((file) => `${directory}/${file}`);
  }

  private readTxtContent(file: string): string {
    const content = readFileSync(file, { encoding: this.textEncoding });
    if (content && content.length > 1) {
      return content;
    }
    return 'No information found. Please try again later.';
  }
}
