import { randomBytes } from 'node:crypto';
import type { CamelCasedProperties } from 'type-fest';

export const randBase64 = (length: number) => randomBytes(length).toString('base64');

const snakeKeyToCamelKey = (key: string): string =>
  key.replaceAll(/_([a-z])/g, (_, char: string) => char.toUpperCase());

export const snakeToCamel = <T extends Record<string, unknown>>(
  value: T
): CamelCasedProperties<T> => {
  const result: Partial<CamelCasedProperties<T>> = {};

  for (const key in value) {
    if (Object.hasOwn(value, key)) {
      const camelKey = snakeKeyToCamelKey(key) as keyof CamelCasedProperties<T>;
      result[camelKey] = value[key] as unknown as CamelCasedProperties<T>[typeof camelKey];
    }
  }

  return result as CamelCasedProperties<T>;
};
