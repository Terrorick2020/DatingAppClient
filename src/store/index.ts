import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { settingsTransform } from './transforms/settings.transform';
import type { IState } from '@/types/store.types';

import adminReducer from './slices/adminSlice';
import chatsReducer from './slices/chatsSlice';
import likesReducer from './slices/likesSlice';
import profileReducer from './slices/profileSlice';
import questionnairesReducer from './slices/questionnairesSlice';
import psychReducer from './slices/psychSlice';
import settingsReducer from './slices/settingsSlice';
import createIdbStorage from 'redux-persist-indexeddb-storage';


export function createAppStore() {
  const storage  = createIdbStorage({name: '3Date-IState', storeName: 'idb'});

  const settingsPersistConfig = {
    key: 'settings',
    storage,
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

  const baseStore = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false }),
  });

  const basePersistor = persistStore(baseStore);

  return { baseStore, basePersistor };
};

export type RootDispatch = ReturnType<typeof createAppStore>['baseStore']['dispatch'];
