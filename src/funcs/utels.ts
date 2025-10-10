export function hasAllKeys<T extends object>(
  obj: Partial<T>,
  keys: (keyof T)[]
): obj is T {
  return keys.every(key => obj[key] !== undefined)
};
