import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EProfileRoles, ESex,  EProfileStatus, ELineStatus } from '@/types/store.types';
import { setLoad } from './settingsSlice';
import { delay } from '@/funcs/general.funcs';
import type { ProfileState, ProfileSelf, SendGeoData } from '@/types/profile.types';

import axios from 'axios';
import PngLeady from '@/assets/img/leady.png';


const initialState: ProfileState = {
    info: {
        id: '10234231',
        photos: [],
        enableGeo: false,
        lineStat: ELineStatus.Online,
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
    addLink: 'https://t.me/BotFather',
    eveningPlans: {
        plan: {
            value: '',
            description: '',
        },
        location: {
            value: '',
            description: '',
        },
    }
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

export const sendSelfGeoAsync = createAsyncThunk(
    'profile/send-self-geo',
    async (data: SendGeoData): Promise<void> => {
        try {
            await axios.post('/geo/ser-get', data);
        } catch (error) {
            throw error;
        } finally {}
    }
)

export const signUpProfileAsync = createAsyncThunk(
    'profile/sign-up-profile',
    async (): Promise<ProfileSelf> => {

        await delay(2000);

        const responce = {
            id: '10234231',
            photos: [PngLeady],
            enableGeo: false,
            lineStat: ELineStatus.Online,
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
    }
)

export const getSelfProfile = createAsyncThunk(
    'profile/get-self-profile',
    async (_, {dispatch}): Promise<ProfileSelf> => {
        try {
            dispatch(setLoad(true));

            await delay(2000);

            const responce = {
                id: '10234231',
                photos: [PngLeady],
                enableGeo: false,
                lineStat: ELineStatus.Online,
                role: EProfileRoles.User,
                status: EProfileStatus.Noob,
                username: '',
                name: 'Вктория',
                age: 20,
                city: 'Санкт-Петербург',
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
        setPlan: (state, action) => {
            state.eveningPlans.plan = action.payload;
        },
        setLocation: (state, action) => {
            state.eveningPlans.location = action.payload;
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

        // Отправка личного geo
        builder.addCase(sendSelfGeoAsync.pending, _ => {
            console.log("Отправка личного geo");
        })
        builder.addCase(sendSelfGeoAsync.fulfilled, _ => {
            console.log("Успешная отправка личного geo");
        })
        builder.addCase(sendSelfGeoAsync.rejected, _ => {
            console.log("Ошибка при отправке личного geo");
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

export const { setInfo, setPlan, setLocation } = profileSlice.actions;
export default profileSlice.reducer;
