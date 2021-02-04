import { LocalStorageService } from "./local-storage.model";

export function useLocalStorage(): LocalStorageService {
  function get<T = any>(key: string): T {
    if (process.client) {
      const data = localStorage.getItem(key) || "";
      return JSON.parse(data) as T;
    }

    return {} as T;
  }

  function set(key: string, value: any): void {
    if (process.client) {
      const data = JSON.stringify(value);
      localStorage.setItem(key, data);
    }
  }

  function reset(): void {
    if (process.client) {
      localStorage.clear();
    }
  }

  function isExist(key: string): boolean {
    if (process.client) {
      return !!localStorage.getItem(key);
    }

    return false;
  }

  return { get, isExist, reset, set };
}
