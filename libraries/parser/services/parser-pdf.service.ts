import { readFileSync, readdirSync } from 'fs';

import { Parser } from '../parser';
import { ParserFile } from '../enums';
import { StringUtil } from '../../core';

export class ParserPDFService extends Parser {
  private readonly textEncoding = 'utf-8';

  public async parse(directory: string): Promise<Map<string, string>> {
    const map = new Map<string, string>();
    const files = this.readPDFFiles(directory);
    for (const file of files) {
      const content = await this.readPDFContent(file);
      map.set(file, content);
    }
    return map;
  }

  private readPDFFiles(directory: string): string[] {
    const files = readdirSync(directory, { recursive: true, encoding: this.textEncoding });
    const txtFiles = files.filter((file) => file.match(ParserFile.PDF));
    return txtFiles.map((file) => `${directory}/${file}`);
  }

  private async readPDFContent(file: string): Promise<string> {
    const buffer = readFileSync(file);
    const dataBuffer = new Uint8Array(buffer);
    let content = '';
    const pdfjsLib = await import('../../../pdf.js/v2.0.550/build/pdf.cjs');
    const document = await pdfjsLib.getDocument({ data: dataBuffer }).promise;
    for (let i = 1; i <= document.numPages; i++) {
      const page = await document.getPage(i);
      const textContent = await page.getTextContent();
      content += textContent.items.map((item: any) => item.str).join(' ');
    }
    return StringUtil.normalizeText(content);
  }
}
