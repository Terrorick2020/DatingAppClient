import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';

import adminReducer from './slices/adminSlice';
import authSlice from './slices/authSlice';
import chatsReducer from './slices/chatsSlice';
import likesReducer from './slices/likesSlice';
import profileReducer from './slices/profileSlice';
import questionnairesReducer from './slices/questionnairesSlice';
import settingsReducer from './slices/settingsSlice';

import { type IState } from '@/types/store.types';


const rootReducer: Reducer<IState> = combineReducers({
    admin: adminReducer,
    auth: authSlice,
    chats: chatsReducer,
    likes: likesReducer,
    profile: profileReducer,
    questionnaires: questionnairesReducer,
    settings: settingsReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export type TDispatch = typeof store.dispatch;
export default store;
