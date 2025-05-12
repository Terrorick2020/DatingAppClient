import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createTransform  } from 'redux-persist';
import { settingsTransform } from './transforms/settings.transform';
import { getCloudStorageItem } from '@telegram-apps/sdk';
import type { IState } from '@/types/store.types';

import adminReducer from './slices/adminSlice';
import chatsReducer from './slices/chatsSlice';
import likesReducer from './slices/likesSlice';
import profileReducer from './slices/profileSlice';
import questionnairesReducer from './slices/questionnairesSlice';
import psychReducer from './slices/psychSlice';
import settingsReducer from './slices/settingsSlice';

import asyncStorageEngine from './utils/async-storage.utils';
import storageSession from 'redux-persist/lib/storage/session';


// Проверяем доступность Telegram Cloud Storage
const checkCloudStorage = () => {
  try {
    return typeof getCloudStorageItem !== 'undefined' && 
      getCloudStorageItem.isAvailable && 
      getCloudStorageItem.isAvailable();
  } catch (e) {
    console.error('Error checking CloudStorage availability:', e);
    return false;
  }
};

const isTelegramCloudAvailable = checkCloudStorage();
console.log('Is Telegram CloudStorage available:', isTelegramCloudAvailable);

// Выбираем хранилище в зависимости от доступности Telegram Cloud Storage
const storage = isTelegramCloudAvailable ? asyncStorageEngine : storageSession;

// Добавляем дебаг-трансформер для логирования сохранения/загрузки
const debugTransform = createTransform(
  // transform state on its way to being serialized and persisted
  (inboundState, key) => {
    console.log(`Saving state for key: ${String(key)}`, inboundState);
    return inboundState;
  },
  // transform state being rehydrated
  (outboundState, key) => {
    console.log(`Loading state for key: ${String(key)}`, outboundState);
    return outboundState;
  }
);

const settingsPersistConfig = {
    key: 'settings',
    storage: storage,
    whitelist: ['routes'],
    transforms: [settingsTransform, debugTransform],
};

const rootReducer: Reducer<IState> = combineReducers({
    admin: adminReducer,
    chats: chatsReducer,
    likes: likesReducer,
    profile: profileReducer,
    questionnaires: questionnairesReducer,
    psych: psychReducer,
    settings: persistReducer(settingsPersistConfig, settingsReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export type RootDispatch = typeof store.dispatch;
export default store;
