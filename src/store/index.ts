import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { settingsTransform } from './transforms/settings.transform';
// import { cloudStorage } from '@telegram-apps/sdk';
import { cloudStorageAdapter } from './utils/tg-cloude-store.utils';
import type { IState } from '@/types/store.types';

import adminReducer from './slices/adminSlice';
import chatsReducer from './slices/chatsSlice';
import likesReducer from './slices/likesSlice';
import profileReducer from './slices/profileSlice';
import questionnairesReducer from './slices/questionnairesSlice';
import psychReducer from './slices/psychSlice';
import settingsReducer from './slices/settingsSlice';
import storageSession from 'redux-persist/lib/storage/session';


// const resStorage = cloudStorage.isSupported() ? cloudStorageAdapter : storageSession;

// const settingsPersistConfig = {
//     key: 'settings',
//     storage: resStorage,
//     whitelist: ['routes'],
//     transforms: [settingsTransform],
// };

// const rootReducer: Reducer<IState> = combineReducers({
//     admin: adminReducer,
//     chats: chatsReducer,
//     likes: likesReducer,
//     profile: profileReducer,
//     questionnaires: questionnairesReducer,
//     psych: psychReducer,
//     settings: persistReducer(settingsPersistConfig, settingsReducer),
// });

// export const store = configureStore({
//     reducer: rootReducer,
//     middleware: getDefaultMiddleware =>
//         getDefaultMiddleware({
//             serializableCheck: false,
//         }),
// });

// export const persistor = persistStore(store);
// export type RootDispatch = typeof store.dispatch;
// export default store;

export const createStore = (useCloud: boolean) => {
  const resStorage = useCloud ? cloudStorageAdapter : storageSession;

  const settingsPersistConfig = {
    key: 'settings',
    storage: resStorage,
    whitelist: ['routes'],
    transforms: [settingsTransform],
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

  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false }),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

export type RootDispatch = ReturnType<ReturnType<typeof createStore>['store']['dispatch']>;