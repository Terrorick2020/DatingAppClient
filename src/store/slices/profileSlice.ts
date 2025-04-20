import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EProfileRoles, ESex,  EProfileStatus } from '@/types/store.types';
import { setLoad } from './settingsSlice';
import { delay } from '@/funcs/general.funcs';
import type { ProfileState, ProfileSelf } from '@/types/profile.types';

import axios from 'axios';


const initialState: ProfileState = {
    info: {
        id: '10234231',
        role: EProfileRoles.User,
        status: EProfileStatus.Noob,
        username: '',
        name: '',
        age: null,
        city: '',
        sex: ESex.Male,
        bio: '',
        interest: '',
        selSex: ESex.All,
    },
    addLink: 'Hello world!',
}

export const initProfileAsync = createAsyncThunk(
    'profile/init-profile',
    async ( data: string, _thunkAPI ) => {
        const url = new URL(data)
        const params = new URLSearchParams(url.hash.substring(1))
        const tgData = params.get('tgWebAppData')

        if (!tgData) return null

        const parsedData = Object.fromEntries(new URLSearchParams(tgData))

        if (parsedData.user) {
            parsedData.user = JSON.parse(parsedData.user)
        }
        
        await axios.post(
            'http://localhost:3000/auth',
            {
                data: parsedData,
            }
        )
    }
)

export const signUpProfileAsync = createAsyncThunk(
    'profile/sign-up-profile',
    async (_, {dispatch}): Promise<ProfileSelf> => {
        try {
            dispatch(setLoad(true));

            await delay(2000);

            const responce = {
                id: '',
                role: EProfileRoles.User,
                status: EProfileStatus.Noob,
                username: '',
                name: '',
                age: null,
                city: '',
                sex: ESex.Male,
                bio: '',
                interest: '',
                selSex: ESex.All,
            };

            return responce;

        } catch (error) {
            throw error;
        } finally {
            dispatch(setLoad(false));
        }
    }
)

export const getSelfProfile = createAsyncThunk(
    'profile/get-self-profile',
    async (_, {dispatch}): Promise<ProfileSelf> => {
        try {
            dispatch(setLoad(true));

            await delay(2000);

            const responce = {
                id: '',
                role: EProfileRoles.User,
                status: EProfileStatus.Noob,
                username: '',
                name: '',
                age: null,
                city: '',
                sex: ESex.Male,
                bio: '',
                interest: '',
                selSex: ESex.All,
            };

            return responce;

        } catch (error) {
            throw error;
        } finally {
            dispatch(setLoad(false));
        }
    }
)

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setInfo: (state, action) => {
            const newInfo: ProfileSelf = action.payload;
            state.info = newInfo;
        },
    },
    extraReducers: builder => {
        // Первичная проверка пользователя
        builder.addCase(initProfileAsync.pending, _ => {
            console.log("Первичная проверка пользователя");
        })
        builder.addCase(initProfileAsync.fulfilled, ( state, action ) => {
            console.log("Успешная первичная проверка пользователя");
            console.log( state, action );
        })
        builder.addCase(initProfileAsync.rejected, _ => {
            console.log("Ошибка при первичной проверки пользователя");
        })

        // Регистрация профиля пользователя
        builder.addCase(signUpProfileAsync.pending, _ => {
            console.log("Регистрация профиля пользователя");
        })
        builder.addCase(signUpProfileAsync.fulfilled, ( state, action ) => {
            console.log("Успешная регистрация профиля пользователя");
            state.info = action.payload;
        })
        builder.addCase(signUpProfileAsync.rejected, _ => {
            console.log("Ошибка регистрации профиля пользователя");
        })

        // Получение текущего профиля пользователя
        builder.addCase(getSelfProfile.pending, _ => {
            console.log("Получение текущего профиля пользователя");
        })
        builder.addCase(getSelfProfile.fulfilled, ( state, action ) => {
            console.log("Успешное получение текущего профиля пользователя");
            state.info = action.payload;
        })
        builder.addCase(getSelfProfile.rejected, _ => {
            console.log("Ошибка получения текущего профиля пользователя");
        })
    }
})

export const { setInfo } = profileSlice.actions;
export default profileSlice.reducer;
