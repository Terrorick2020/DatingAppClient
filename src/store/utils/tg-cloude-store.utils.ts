import { 
  getCloudStorageItem, 
  setCloudStorageItem, 
  deleteCloudStorageItem,
  init
} from '@telegram-apps/sdk';

// Проверяем, был ли SDK инициализирован
let isInitialized = false;
const initSDK = async () => {
  if (!isInitialized) {
    try {
      await init();
      isInitialized = true;
      console.log('Telegram SDK initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Telegram SDK:', error);
    }
  }
};

// Создаем адаптер для работы с CloudStorage
const createTelegramCloudStorage = () => {
  return {
    getItem: async (key: string): Promise<string | null> => {
      try {
        await initSDK();
        
        if (getCloudStorageItem && getCloudStorageItem.isAvailable && getCloudStorageItem.isAvailable()) {
          console.log(`Getting item from CloudStorage: ${key}`);
          const value = await getCloudStorageItem(key);
          console.log(`Got value from CloudStorage: ${value ? value.substring(0, 50) + '...' : 'null'}`);
          return value || null;
        }
        
        // Резервный вариант
        console.log(`Using sessionStorage fallback for key: ${key}`);
        return sessionStorage.getItem(key);
      } catch (error) {
        console.error('Error getting item from CloudStorage:', error);
        return sessionStorage.getItem(key);
      }
    },
    setItem: async (key: string, value: string): Promise<boolean> => {
      try {
        await initSDK();
        
        if (setCloudStorageItem && setCloudStorageItem.isAvailable && setCloudStorageItem.isAvailable()) {
          console.log(`Setting item to CloudStorage: ${key}`);
          console.log(`Value: ${value ? value.substring(0, 50) + '...' : 'null'}`);
          await setCloudStorageItem(key, value);
          return true;
        }
        
        // Резервный вариант
        console.log(`Using sessionStorage fallback for setting key: ${key}`);
        sessionStorage.setItem(key, value);
        return true;
      } catch (error) {
        console.error('Error setting item to CloudStorage:', error);
        // Всё равно пытаемся сохранить в sessionStorage
        try {
          sessionStorage.setItem(key, value);
        } catch (e) {
          console.error('Also failed to save to sessionStorage:', e);
        }
        return false;
      }
    },
    removeItem: async (key: string): Promise<boolean> => {
      try {
        await initSDK();
        
        if (deleteCloudStorageItem && deleteCloudStorageItem.isAvailable && deleteCloudStorageItem.isAvailable()) {
          console.log(`Removing item from CloudStorage: ${key}`);
          await deleteCloudStorageItem(key);
          return true;
        }
        
        // Резервный вариант
        console.log(`Using sessionStorage fallback for removing key: ${key}`);
        sessionStorage.removeItem(key);
        return true;
      } catch (error) {
        console.error('Error removing item from CloudStorage:', error);
        try {
          sessionStorage.removeItem(key);
        } catch (e) {
          console.error('Also failed to remove from sessionStorage:', e);
        }
        return false;
      }
    }
  };
};

export default createTelegramCloudStorage();