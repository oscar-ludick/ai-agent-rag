import 'dotenv/config';

import { Environment } from '../interfaces';

export class EnvUtil {
  public static load(key: keyof Environment): string {
    return process.env[key] || '';
  }
}
