import telegramCloudStorage from './tg-cloude-store.utils';

// Определим интерфейс для асинхронного хранилища
export interface AsyncStorage {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

// Создаем промежуточный адаптер для redux-persist
const asyncStorageEngine: AsyncStorage = {
  getItem: (key: string): Promise<string | null> => {
    return telegramCloudStorage.getItem(key)
      .then(value => {
        // redux-persist ожидает строку или null
        return value === '' ? null : value;
      });
  },
  setItem: (key: string, value: string): Promise<void> => {
    return telegramCloudStorage.setItem(key, value)
      .then(() => undefined);
  },
  removeItem: (key: string): Promise<void> => {
    return telegramCloudStorage.removeItem(key)
      .then(() => undefined);
  }
};

export default asyncStorageEngine;