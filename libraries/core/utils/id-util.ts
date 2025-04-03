import * as nanoid from "nanoid";

export class IDUtil {
  public static createRandomID(): string {
    return nanoid.customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789")();
  }
}
