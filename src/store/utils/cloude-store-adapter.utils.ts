import { Storage } from 'redux-persist';
import { cloudStorage  } from '@telegram-apps/sdk';


export const cloudStorageAdapter: Storage = {
  async getItem(key: string): Promise<string | null> {
    if (!cloudStorage.getItem.isAvailable()) return null;
    const value = await cloudStorage.getItem(key);
    return value ?? null;
  },

  async setItem(key: string, value: string): Promise<void> {
    if (!cloudStorage.setItem.isAvailable()) return;
    await cloudStorage.setItem(key, value);
  },

  async removeItem(key: string): Promise<void> {
    if (!cloudStorage.deleteItem.isAvailable()) return;
    await cloudStorage.deleteItem(key);
  },
};
