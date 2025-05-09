import { createTransform } from 'redux-persist';
import { initialState as defaultSettingsState } from '@/store/slices/settingsSlice';
import type { SettingsState } from '@/types/settings.type';


export const settingsTransform = createTransform<SettingsState, Partial<SettingsState>>(
    (inboundState) => ({
        routes: inboundState.routes,
    }),
    (outboundState) => ({
        ...defaultSettingsState,
        ...outboundState,
    }),
    { whitelist: ['settings'] }
);
