import { StorageEnum } from "@/common/models/StorageEnum";

class StorageService {
  private storage: Storage | null =
    typeof window === "undefined" ? null : window.localStorage;

  get(key: StorageEnum): any {
    return this.storage?.getItem(key);
  }

  set(key: StorageEnum, value: string): void {
    this.storage?.setItem(key, value);
  }

  remove(key: StorageEnum): void {
    this.storage?.removeItem(key);
  }

  clear(): void {
    this.storage?.clear();
  }
}

export const storageService = new StorageService();
