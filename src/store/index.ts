import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';
import type { IState } from '@/types/store.types';

import adminReducer from './slices/adminSlice';
import chatsReducer from './slices/chatsSlice';
import likesReducer from './slices/likesSlice';
import profileReducer from './slices/profileSlice';
import questionnairesReducer from './slices/questionnairesSlice';
import psychReducer from './slices/psychSlice';
import settingsReducer from './slices/settingsSlice';
import myMiddleware from './middleware';


const rootReducer: Reducer<IState> = combineReducers({
    admin: adminReducer,
    chats: chatsReducer,
    likes: likesReducer,
    profile: profileReducer,
    questionnaires: questionnairesReducer,
    psych: psychReducer,
    settings:  settingsReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(myMiddleware),
});

export type RootDispatch = typeof store.dispatch;
export default store;
