import type {
    AdminState,
    ProfilesListItem,
    TargetProfile,
    DataSerchProfStat,
    ComplaintListItem,
} from '@/types/admin.types';

import {
    EProfileRoles,
    EProfileStatus,
    type AsyncThunkRes,
    type IState,
} from '@/types/store.types';

import {
    USER_ENDPOINT,
    COMPLS_ENDPOINT,
    DELETE_PHOTO,
    UPLOAD_PHOTO,
} from '@/config/env.config';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { complaintList } from '@/constant/admin';
import { setLoad } from './settingsSlice';
import { delay } from '@/funcs/general.funcs';
import type { PhotoItem, SavePhotoAsyncThuncData } from '@/types/profile.types';
import type { FetchResponse, FetchSavePhotoRes, } from '@/types/fetch.type';
import type { AxiosResponse, AxiosProgressEvent } from 'axios';

import api from '@/config/fetch.config';


const initialState: AdminState = {
    searchType: EProfileRoles.User,
    searchId: '',
    password: '',
    link: '',
    profilesList: [],
    targetProfile: {
        id: '',
        role: EProfileRoles.User,
        photos: [],
        name: '',
        age: null,
        city: '',
        status: EProfileStatus.Noob,
        description: '',
        complaint: null
    },
    complaintsList: [],
};

export const getProfilesListAsync = createAsyncThunk(
    'admin/get-profiles-list',
    async (_, { getState, dispatch }): Promise<AsyncThunkRes<ProfilesListItem[]>> => {
        try {
            dispatch(setLoad(true));

            const response: AxiosResponse<FetchResponse<any>> = await api.get(USER_ENDPOINT);

            console.log( response )

            if(
                response.status === 200 &&
                response.data.data &&
                response.data.data !== 'None' &&
                response.data.success
            ) {
                let result: ProfilesListItem[] = [];

                const rootState = getState() as IState;
                const adminState = rootState.admin;

                for(let item of response.data.data) {
                    result.push({
                        id: item.telegramId,
                        role: item.role,
                        avatar: item.photos[0].url,
                        name: item.name,
                        status: item.status
                    })
                }

                result = result.filter(item => item.role === adminState.searchType);

                if ( adminState.searchId ) result = result.filter( item => item.id.includes( adminState.searchId ) );

                return result;
            }

            return null;
        } catch ( error ) {
            return 'error';
        } finally {
            dispatch(setLoad(false));
        }
    }
);

export const getUniqueLinkAsync = createAsyncThunk(
    'admin/get-unique-link',
    async (): Promise<AsyncThunkRes<string>> =>{
        try {
            await delay(1000);
    
            const response = 'https://t.me/a/psych/s/3339d25d-5fdfd-4dfdf8d-b442-30aadfdf2b4e8';
    
            return response;
        } catch ( error ) {
            return 'error';
        }
    }
);

export const getProfileByIdAsync = createAsyncThunk(
    'admin/get-profile-by-id',
    async (id: string, { dispatch }): Promise<AsyncThunkRes<TargetProfile>> => {
        try {
            dispatch(setLoad(true));

            const response: AxiosResponse<FetchResponse<any>> = await api.get(`${USER_ENDPOINT}/${id}`);

            console.log( response )

            if(
                response.status === 200 &&
                response.data.data &&
                response.data.data !== 'None' &&
                response.data.success
            ) {
                const data = response.data.data;

                const photos = data.photos.map((item: any) => ({id: item.id, photo: item.url}));

                const result: TargetProfile = {
                    id: data.telegramId,
                    role: data.role,
                    photos,
                    name: data.name,
                    age: data.age,
                    city: data.town,
                    status: data.status,
                    description: data.bio,
                    complaint: null,
                };

                return result;
            }

            return null;
        } catch (error) {
            return 'error';
        } finally {
            dispatch(setLoad(false));
        }
    }
);

export const addPhotoToUserAsync = createAsyncThunk(
    'admin/add-photo-to-user',
    async (data: SavePhotoAsyncThuncData, {getState}): Promise<AsyncThunkRes<PhotoItem>> => {
        try {
            await delay(2000);

            const rootState = getState() as IState;
            const toUser = rootState.admin.targetProfile.id;
    
            const formData = new FormData();
            formData.append('photo', data.photo);
            formData.append('telegramId', toUser);
    
            const response: AxiosResponse<FetchResponse<FetchSavePhotoRes>> = await api.post(UPLOAD_PHOTO, formData, {
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    if (progressEvent.total) {
                      const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                      data.setUploadProgress(percent);
                    }
                }
            });

            if(
                response.status === 201 &&
                response.data.data &&
                response.data.data !== 'None' &&
                response.data.success
            ) {
                const photoUrl = URL.createObjectURL(data.photo);

                return {
                    id: String(response.data.data.photoId),
                    photo: photoUrl,
                } as PhotoItem;
            }

            return null;
        } catch (error) {
            return 'error';
        }
    }
);

export const delPhotoToUserAsync = createAsyncThunk(
    'admin/del-photo-to-user',
    async (id: string, { getState }): Promise<AsyncThunkRes<string>> => {
        try {
            await delay(2000);
            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;

            const data = {
                telegramId,
                photoId: id,
            }

            const response: AxiosResponse<FetchResponse<any>> = await api.post(DELETE_PHOTO, data);

            if(
                response.status === 200 &&
                response.data.data &&
                response.data.data !== 'None' &&
                response.data.success
            ) return id;

            return null;
        } catch (error) {
            return 'error';
        }
    }
);

export const serchProfileStatusAsync = createAsyncThunk(
    'admin/serch-profile-status',
    async (
        { id, targetValue, delComplaint: _ }: DataSerchProfStat,
        { getState, dispatch }
    ): Promise<AsyncThunkRes<EProfileStatus>> => {
        try {
            const rootState = getState() as IState;
            const adminState = rootState.admin;

            const newProfilesList = adminState.profilesList.map(
                item => ({
                    ...item,
                    status: item.id === id ? targetValue : item.status,
                })
            );

            dispatch(setNewProfilesList(newProfilesList));

            await delay(500);

            const response = targetValue;

            return response;
        } catch (error) {
            return 'error';
        }
    }
);

export const deleteUserAsync = createAsyncThunk(
    'admin/delete-user',
    async (_, { getState }): Promise<AsyncThunkRes<ProfilesListItem[]>> => {
        try {
            const rootState = getState() as IState;
            const adminState = rootState.admin;

            const url = `${USER_ENDPOINT}/${adminState.targetProfile.id}`;

            const response: AxiosResponse<FetchResponse<any>> = await api.delete(url);

            if(
                response.status === 200 &&
                response.data.data &&
                response.data.data !== 'None' &&
                response.data.success
            ) {
                const newProfilesList = adminState.profilesList.filter(
                    item => item.id !== adminState.targetProfile.id
                );

                return newProfilesList;
            }

            return null;
        } catch (error) {
            return 'error';
        }
    }
);

export const initComplaintListAsync = createAsyncThunk(
    'admin/init-complaint-list',
    async (_, { dispatch, getState }): Promise<AsyncThunkRes<ComplaintListItem[]>> => {
        try {
            dispatch(setLoad(true));

            const rootState = getState() as IState;
            const tgId = rootState.profile.info.id;

            const url = `${COMPLS_ENDPOINT}?telegramId=${tgId}&type=admin`;

            const response: AxiosResponse<FetchResponse<any>> = await api.get(url);

            console.log( response )

            return complaintList;
        } catch (error) {
            return 'error';
        } finally {
            dispatch(setLoad(false));
        }
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setSearchType: (state, action: PayloadAction<EProfileRoles>): void => {
            state.searchType = action.payload;
        },
        setSearchId: (state, action: PayloadAction<string>): void => {
            state.searchId = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>): void => {
            state.password = action.payload;
        },
        setNewProfilesList: (state, action: PayloadAction<ProfilesListItem[]>): void => {
            state.profilesList = action.payload;
        },
        setTargetProfileId: (state, action: PayloadAction<string>): void => {
            state.targetProfile.id = action.payload;
        },
    },
    extraReducers: builder => {
        // Получение списка пользователей
        builder.addCase(getProfilesListAsync.pending, _ => {
            console.log("Получение списка пользователей");
        })
        builder.addCase(getProfilesListAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<ProfilesListItem[]>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получения списка пользователей");
                    break;
                case null:
                    console.log("Список пользователей не получен");
                    break;
                default:
                    state.profilesList = action.payload;
                    console.log("Успешное получение списка пользователей");
                    break;
            }
        }),
        builder.addCase(getProfilesListAsync.rejected, _ => {
            console.log("Ошибка получения списка пользователей");
        })

        // Добавление фотографии пользователю
        builder.addCase(addPhotoToUserAsync.pending, _ => {
            console.log("Добавление фотографии пользователю");
        })
        builder.addCase(addPhotoToUserAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<PhotoItem>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка добавления фотографии пользователю");
                    break;
                case null:
                    console.log("Фотография пользователю не добавлена");
                    break;
                default:
                    state.targetProfile.photos.push(action.payload);
                    console.log("Успешное добавление фотографии пользователю");
                    break;
            }
        }),
        builder.addCase(addPhotoToUserAsync.rejected, _ => {
            console.log("Ошибка добавления фотографии пользователю");
        })

        // Удаление фотографии пользователю
        builder.addCase(delPhotoToUserAsync.pending, _ => {
            console.log("Удаление фотографии пользователю");
        })
        builder.addCase(delPhotoToUserAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<string>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка удаления фотографии пользователю");
                    break;
                case null:
                    console.log("Фотография пользователя не удалена");
                    break;
                default:
                    state.targetProfile.photos = state.targetProfile.photos.filter(
                        item => item.id !== action.payload
                    );

                    console.log("Успешное удаление фотографии пользователю");
                    break;
            }
        }),
        builder.addCase(delPhotoToUserAsync.rejected, _ => {
            console.log("Ошибка удаления фотографии пользователю");
        })

        // Получение уникальной ссылки
        builder.addCase(getUniqueLinkAsync.pending, _ => {
            console.log("Получение уникальной ссылки");
        })
        builder.addCase(getUniqueLinkAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<string>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получения уникальной ссылки");
                    break;
                case null:
                    console.log("Уникальная ссылка не получена");
                    break;
                default:
                    state.link = action.payload;
                    console.log("Успешное получение уникальной ссылки");
                    break;
            }
        }),
        builder.addCase(getUniqueLinkAsync.rejected, _ => {
            console.log("Ошибка получения уникальной ссылки");
        })

        // Получение конкретного пользователя
        builder.addCase(getProfileByIdAsync.pending, _ => {
            console.log("Получение целевого пользователя");
        })
        builder.addCase(getProfileByIdAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<TargetProfile>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получения целевого пользователя");
                    break;
                case null:
                    console.log("Целевой пользователь не получен");
                    break;
                default:
                    state.targetProfile = action.payload;
                    console.log("Успешное получение целевого пользователя");
                    break;
            }
        }),
        builder.addCase(getProfileByIdAsync.rejected, _ => {
            console.log("Ошибка получения целевого пользователя");
        })

        // Изменение статуса пользователя
        builder.addCase(serchProfileStatusAsync.pending, _ => {
            console.log("Изменение статуса пользователя");
        })
        builder.addCase(serchProfileStatusAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<EProfileStatus>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка изменения статуса пользователя");
                    break;
                case null:
                    console.log("Статус пользователя не изменён");
                    break;
                default:
                    state.targetProfile.status = action.payload;
                    console.log("Успешное изменение статуса пользователя");
                    break;
            }
        }),
        builder.addCase(serchProfileStatusAsync.rejected, _ => {
            console.log("Ошибка изменения статуса пользователя");
        })

        // Удаление пользователя
        builder.addCase(deleteUserAsync.pending, _ => {
            console.log("Удаление пользователя");
        })
        builder.addCase(deleteUserAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<ProfilesListItem[]>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка удаления пользователя");
                    break;
                case null:
                    console.log("Пользователь не удалён");
                    break;
                default:
                    state.profilesList = action.payload;
                    console.log("Успешное удаление пользователя");
                    break;
            }
        }),
        builder.addCase(deleteUserAsync.rejected, _ => {
            console.log("Ошибка удаления пользователя");
        })

        // Получение списка жалоб
        builder.addCase(initComplaintListAsync.pending, _ => {
            console.log("Получение списка жалоб");
        })
        builder.addCase(initComplaintListAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<ComplaintListItem[]>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получения списка жалоб");
                    break;
                case null:
                    console.log("Список жалоб не получен");
                    break;
                default:
                    state.complaintsList = action.payload;
                    console.log("Успешное получение списка жалоб");
                    break;
            }
        }),
        builder.addCase(initComplaintListAsync.rejected, _ => {
            console.log("Ошибка получения списка жалоб");
        })
    }
})

export const { setSearchType, setSearchId, setPassword, setNewProfilesList, setTargetProfileId } = adminSlice.actions;
export default adminSlice.reducer;
