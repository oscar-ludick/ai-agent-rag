export class StringUtil {
  public static normalizeText(text: string): string {
    return text.replace(/\n/g, ' ').replace(/\t/g, '').toLowerCase();
  }
}
