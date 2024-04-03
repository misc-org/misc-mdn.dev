import { INFO } from "$lib/assets/info";

export async function waitMs(ms: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

type Entries<T> = Array<
  keyof T extends infer U ? (U extends keyof T ? [U, T[U]] : never) : never
>;
export function getKeys<T extends Record<string, unknown>>(
  obj: T,
): Array<keyof T> {
  return Object.keys(obj);
}
export function getValues<T extends Record<string, any>>(
  obj: T,
): Array<T[keyof T]> {
  return Object.values(obj);
}
export function getEntries<T extends Record<string, unknown>>(
  obj: T,
): Entries<T> {
  return Object.entries(obj) as Entries<T>;
}
export function fromEntries<T extends Record<string, unknown>>(
  entries: Entries<T>,
): T {
  return Object.fromEntries(entries) as T;
}

export function getLocalStorageKey(key: string, trailingColon = false): string {
  const { id, localStorageVersion } = INFO.internal;
  return `${id}.v${localStorageVersion}.${key}${trailingColon ? ":" : ""}`;
}
