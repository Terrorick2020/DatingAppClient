import { 
  getCloudStorageItem, 
  setCloudStorageItem, 
  deleteCloudStorageItem 
} from '@telegram-apps/sdk';

// Создаем адаптер для работы с CloudStorage
const createTelegramCloudStorage = () => {
  return {
    getItem: async (key: string): Promise<string | null> => {
      try {
        if (getCloudStorageItem.isAvailable()) {
          const value = await getCloudStorageItem(key);
          return value || null;
        }
        // Резервный вариант для тестирования или если API недоступен
        return sessionStorage.getItem(key);
      } catch (error) {
        console.error('Error getting item from CloudStorage:', error);
        return null;
      }
    },
    setItem: async (key: string, value: string): Promise<boolean> => {
      try {
        if (setCloudStorageItem.isAvailable()) {
          await setCloudStorageItem(key, value);
          return true;
        }
        // Резервный вариант для тестирования или если API недоступен
        sessionStorage.setItem(key, value);
        return true;
      } catch (error) {
        console.error('Error setting item to CloudStorage:', error);
        return false;
      }
    },
    removeItem: async (key: string): Promise<boolean> => {
      try {
        if (deleteCloudStorageItem.isAvailable()) {
          await deleteCloudStorageItem(key);
          return true;
        }
        // Резервный вариант для тестирования или если API недоступен
        sessionStorage.removeItem(key);
        return true;
      } catch (error) {
        console.error('Error removing item from CloudStorage:', error);
        return false;
      }
    }
  };
};

export default createTelegramCloudStorage();