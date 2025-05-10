import type {
    ProfileState,
    ProfileSelf,
    SendGeoData,
    EveningPlans,
    PhotoItem
} from '@/types/profile.types';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { EProfileRoles, ESex,  EProfileStatus, ELineStatus, IState } from '@/types/store.types';
import { setLoad, setApiRes } from './settingsSlice';
import { delay } from '@/funcs/general.funcs';
import { EApiStatus } from '@/types/settings.type';

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
        isCurrent: true,
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

export const saveSelfPhotoAsync = createAsyncThunk(
    'profile/save-self-phooto',
    async (photo: File): Promise<PhotoItem> => {
        try {
            await delay(2000);

            const photoUrl = URL.createObjectURL(photo);
            const newPhoto: PhotoItem = {
                id: `${Date.now()}`,
                photo: photoUrl
            };

            return newPhoto;
        } catch (error) {
            throw error;
        }
    }
)

export const deleteSelfPhotoAsync = createAsyncThunk(
    'profile/delete-self-photo',
    async (id: string): Promise<string> => {
        try {
            await delay(2000);

            return id;
        } catch (error) {
            throw error;
        }
    }
)

export const signUpProfileAsync = createAsyncThunk(
    'profile/sign-up-profile',
    async (_, {dispatch}): Promise<ProfileSelf> => {
        try {
            await delay(2000);

            const responce = {
                id: '10234231',
                photos: [
                    {
                        id: 'sdvsdvdv',
                        photo: PngLeady,
                    }
                ],
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

            dispatch(setApiRes({
                value: true,
                msg: 'Регистрация прошла успешно',
                status: EApiStatus.Success,
                timestamp: Date.now(),
            }));
    
            return responce;
        } catch ( error ) {
            throw error
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
                id: '10234231',
                photos: [
                    {
                        id: 'sdvsdvdv',
                        photo: PngLeady,
                    }
                ],
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

export const saveSelfPlansAsync = createAsyncThunk(
    'profile/save-self-plans',
    async (_, {dispatch, getState}): Promise<EveningPlans> => {
        try {
            await delay(2000);

            const rootState = getState() as IState;
            const eveningPlans = rootState.profile.eveningPlans;

            dispatch(setApiRes({
                value: true,
                msg: 'Обновление планов прошло успешно',
                status: EApiStatus.Success,
                timestamp: Date.now(),
            }));

            return eveningPlans;
        } catch (error) {
            throw error;
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

        //Отправка сообщения на добавление фотографии пользвателя
        builder.addCase(saveSelfPhotoAsync.pending, _ => {
            console.log("Отправка сообщения на добавление фотографии пользвателя");
        })
        builder.addCase(saveSelfPhotoAsync.fulfilled, (state, action: PayloadAction<PhotoItem>) => {
            console.log("Успешная отправка сообщения на добавление фотографии пользвателя");
            state.info.photos.push(action.payload);
        })
        builder.addCase(saveSelfPhotoAsync.rejected, _ => {
            console.log("Ошибка при отправке сообщения на добавление фотографии пользвателя");
        })

        //Отправка сообщения на удаление фотографии пользвателя
        builder.addCase(deleteSelfPhotoAsync.pending, _ => {
            console.log("Отправка сообщения на удаление фотографии пользвателя");
        })
        builder.addCase(deleteSelfPhotoAsync.fulfilled, (state, action: PayloadAction<string>) => {
            console.log("Успешная отправка сообщения на удаление фотографии пользвателя");
            state.info.photos = state.info.photos.filter(item => item.id !== action.payload);
        })
        builder.addCase(deleteSelfPhotoAsync.rejected, _ => {
            console.log("Ошибка при отправке сообщения на удаление фотографии пользвателя");
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
