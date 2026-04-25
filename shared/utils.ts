import { randomBytes } from 'node:crypto';

export const randBase64 = (length: number) => randomBytes(length).toString('base64');
