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
    console.log(`AsyncStorage getItem called for key: ${key}`);
    return telegramCloudStorage.getItem(key)
      .then(value => {
        console.log(`AsyncStorage getItem result for ${key}: ${value ? 'data exists' : 'null'}`);
        // redux-persist ожидает строку или null
        return value === '' ? null : value;
      })
      .catch(error => {
        console.error(`AsyncStorage getItem error for ${key}:`, error);
        return null;
      });
  },
  setItem: (key: string, value: string): Promise<void> => {
    console.log(`AsyncStorage setItem called for key: ${key}`);
    return telegramCloudStorage.setItem(key, value)
      .then(success => {
        console.log(`AsyncStorage setItem result for ${key}: ${success ? 'success' : 'failed'}`);
        return;
      })
      .catch(error => {
        console.error(`AsyncStorage setItem error for ${key}:`, error);
        return;
      });
  },
  removeItem: (key: string): Promise<void> => {
    console.log(`AsyncStorage removeItem called for key: ${key}`);
    return telegramCloudStorage.removeItem(key)
      .then(success => {
        console.log(`AsyncStorage removeItem result for ${key}: ${success ? 'success' : 'failed'}`);
        return;
      })
      .catch(error => {
        console.error(`AsyncStorage removeItem error for ${key}:`, error);
        return;
      });
  }
};

export default asyncStorageEngine;