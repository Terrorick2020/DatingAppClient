import type {
    FetchResponse,
    FetchSavePhotoRes,
    AdminGenLinkRes,
    TargetPsychologistRes,
    ComplaintsListRes,
} from '@/types/fetch.type';

import {
    ESearchComplType,
    type AdminState,
    type ProfilesListItem,
    type TargetProfile,
    type DataSerchProfStat,
    type ComplaintListItem,
    type TargetProfileCompalint,
    type DataGetProfileByIdAsync,
    type DataSelPS,
} from '@/types/admin.types';

import {
    EProfileRoles,
    EProfileStatus,
    EPsychStatus,
    type AsyncThunkRes,
    type IState,
} from '@/types/store.types';

import {
    USER_ENDPOINT,
    COMPLS_ENDPOINT,
    DELETE_PHOTO,
    UPLOAD_PHOTO,
    ADMINE_SERCH_STATUS_ENDPOINT,
    COMPLS_UPT_ENDPOINT,
    ADMINE_CMPLS_ENDPOINT,
    USERS_SEARCH,
    USERS_ENDPOINT,
    REFERAL_LINK,
    PSYCH_GEN_TOKEN_ENDPOINT,
    PSYCH_ADMIN_ENDPOINT,
    PSYCH_BY_MARK_ENDPOINT,
    PSYCH_CHANGE_STATUS_ENDPOINT,
    VIDEO_ENDPOIN,
} from '@/config/env.config';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setLoad } from './settingsSlice';
import { formatTimestamp } from '@/funcs/general.funcs';
import { initialArgs } from '@/constant/quest';
import type { InitSliderData } from '@/types/quest.types';
import type { VideoItemWithPsych, EditVideoData } from '@/types/videos.types';
import type { PhotoItem, SavePhotoAsyncThuncData } from '@/types/profile.types';
import type { AxiosResponse, AxiosProgressEvent } from 'axios';

import api from '@/config/fetch.config';


const initialState: AdminState = {
    searchType: EProfileRoles.User,
    searchId: '',
    searchComplType: ESearchComplType.Complaint,
    searchComplId: '',
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
    targetVideo: null,
};

export const getProfilesListAsync = createAsyncThunk(
    'admin/get-profiles-list',
    async (
        args: InitSliderData | undefined,
        { getState, dispatch }
    ): Promise<AsyncThunkRes<ProfilesListItem[]>> => {
        try {
            dispatch(setLoad(true));

            const realArgs = args || initialArgs;

            const rootState = getState() as IState;
            const query = rootState.admin.searchId;
            const type = rootState.admin.searchType;
            const profilesList = rootState.admin.profilesList;

            let url: string | null = null;
            let result: ProfilesListItem[] = [];

            let response: AxiosResponse<FetchResponse<any>> | null = null;

            switch(type) {
                case EProfileRoles.User:
                    url = query
                        ? USERS_SEARCH(query, realArgs.offset, realArgs.limit)
                        : USERS_ENDPOINT({page: realArgs.offset + 1, limit: realArgs.limit});

                    response =  await api.get(url)

                    if(
                        !response               ||
                        response.status !== 200 ||
                        !response.data.success  ||
                        !response.data.data     ||
                        response.data.data === 'None'
                    ) return result;

                    for(let item of response.data.data) {
                        result.push({
                            id: item.telegramId,
                            role: EProfileRoles.User,
                            avatar: item.photos[0].url,
                            name: item.name,
                            status: item.status
                        })
                    };

                    if(args) {
                        result = [ ...profilesList, ...result ];
                    }

                    return result;

                case EProfileRoles.Psych:
                    url = PSYCH_ADMIN_ENDPOINT(query, realArgs.offset, realArgs.limit);
                    
                    response = await api.get(url);

                    if(
                        !response               ||
                        response.status !== 200 ||
                        !response.data.success  ||
                        !response.data.data     ||
                        response.data.data === 'None'
                    ) return result;

                    for(let item of response.data.data.psychologists) {
                        result.push({
                            id: item.telegramId,
                            role: EProfileRoles.Psych,
                            avatar: item.photos[0].url,
                            name: item.name,
                            status: EPsychStatus.Active
                        })
                    };

                    if(args) {
                        result = [ ...profilesList, ...result ];
                    }

                    return result;
            };

            return  null;
        } catch ( error ) {
            console.log(error);

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
            const data = {};

            const respose: AxiosResponse<FetchResponse<AdminGenLinkRes>> =
                await api.post(PSYCH_GEN_TOKEN_ENDPOINT, data);

            if(
                respose.status !== 201 ||
                !respose.data.success  ||
                !respose.data.data     ||
                respose.data.data === 'None'
            ) return null;

            const code = respose.data.data.code;
            const result = REFERAL_LINK(code, EProfileRoles.Psych);

            return result;
        } catch {
            return 'error';
        }
    }
);

export const getProfileByIdAsync = createAsyncThunk(
    'admin/get-profile-by-id',
    async (data: DataGetProfileByIdAsync, { dispatch }): Promise<AsyncThunkRes<TargetProfile>> => {
        try {
            dispatch(setLoad(true));

            switch(data.type) {
                case EProfileRoles.User:
                    const [userRes, cmplRes]: [
                        AxiosResponse<FetchResponse<any>>,
                        AxiosResponse<FetchResponse<any>>,
                    ] = await Promise.all([
                        api.get(`${USER_ENDPOINT}/${data.id}`),
                        api.get(`${COMPLS_ENDPOINT}?telegramId=${data.id}&type=received&status=PENDING`),
                    ]);

                    console.log( cmplRes )

                    if(
                        userRes.status !== 200 ||
                        !userRes.data.success  ||
                        !userRes.data.data     ||
                        userRes.data.data === 'None' ||

                        cmplRes.status !== 200 ||
                        !cmplRes.data.success  ||
                        !cmplRes.data.data     ||
                        cmplRes.data.data === 'None'
                    ) return null;

                    const userData = userRes.data.data;
                    const cmplData = cmplRes.data.data;

                    const photos = userData.photos.map((item: any) => ({id: item.id, photo: item.url}));

                    let complaintList: TargetProfileCompalint[] = cmplData.map(
                        (item: any) => {

                            const [date, time] = formatTimestamp(item.createdAt).split(' ');

                            return {
                                id: item.id,
                                date,
                                complGlob: item.globComplRes,
                                complTarget: item.targetComplRes,
                                from: item.fromUser.telegramId,
                                time,
                                msg: item.description,
                            }
                        }
                    );

                    const result: TargetProfile = {
                        id: userData.telegramId,
                        role: userData.role,
                        photos,
                        name: userData.name,
                        age: userData.age,
                        city: userData.city.label,
                        status: userData.status,
                        description: userData.bio,
                        complaint: complaintList.length ? complaintList : null,
                    };

                    return result;
                case EProfileRoles.Psych:
                    const url = PSYCH_BY_MARK_ENDPOINT(data.id);

                    const response: AxiosResponse<FetchResponse<TargetPsychologistRes>> = await api.get(url);

                    if(
                        response.status !== 200 ||
                        !response.data.success  ||
                        !response.data.data     ||
                        response.data.data === 'None'
                    ) return null;

                    const dataRes = response.data.data;

                    const psychRes: TargetProfile = {
                        id: ''+dataRes.id,
                        role: EProfileRoles.Psych,
                        photos: dataRes.photos.map(item => ({id: ''+item.id, photo: item.url})),
                        name: dataRes.name,
                        age: null,
                        city: '',
                        status: dataRes.status,
                        description: dataRes.about,
                        complaint: null,
                    };

                    return psychRes;
            };

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
            const rootState = getState() as IState;
            const toUser = rootState.admin.targetProfile.id;
    
            const formData = new FormData();
            formData.append('photo', data.photo);
            formData.append('telegramId', toUser);
    
            const uploadRes: AxiosResponse<FetchResponse<FetchSavePhotoRes>> = await api.post(UPLOAD_PHOTO, formData, {
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    if (progressEvent.total) {
                      const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                      data.setUploadProgress(percent);
                    }
                }
            });

            if (
                uploadRes.status !== 201 ||
                !uploadRes.data.success  ||
                !uploadRes.data.data     ||
                uploadRes.data.data === 'None'
            ) return null;

            const oldPhotos = rootState.admin.targetProfile.photos;
            const oldPhotId = oldPhotos.map(item => +item.id);

            const savedData = {
                telegramId: toUser,
                photoIds: [...oldPhotId, uploadRes.data.data.photoId],
            };

            const savedRes: AxiosResponse<FetchResponse<any>> = await api.patch(`${USER_ENDPOINT}/${toUser}`, savedData);

            if (
                savedRes.status !== 200 ||
                !savedRes.data.success
            ) return null;

            const photoUrl = URL.createObjectURL(data.photo);

            return {
                id: String(uploadRes.data.data.photoId),
                photo: photoUrl,
            } as PhotoItem;

        } catch (error) {
            return 'error';
        }
    }
);

export const delPhotoToUserAsync = createAsyncThunk(
    'admin/del-photo-to-user',
    async (id: string, { getState }): Promise<AsyncThunkRes<string>> => {
        try {
            const rootState = getState() as IState;
            const telegramId = rootState.admin.targetProfile.id;

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
        { id, targetValue, delComplaint, isDisp }: DataSerchProfStat,
        { getState, dispatch }
    ): Promise<AsyncThunkRes<EProfileStatus>> => {
        try {
            const rootState = getState() as IState;
            const adminState = rootState.admin;

            if(delComplaint) {
                const targetUser = adminState.targetProfile;

                const uptComplBaseData = {
                    telegramId: rootState.profile.info.id,
                    status: 'RESOLVED',
                }
 
                const uptComplRes: AxiosResponse<FetchResponse<any>>[] = await Promise.all(
                    targetUser.complaint?.map(
                        item => api.post(COMPLS_UPT_ENDPOINT, {
                            ...uptComplBaseData,
                            complaintId: item.id,
                        })
                    ) || []
                );

                const result = uptComplRes.some(item => 
                    item.status !== 201 ||
                    !item.data.success  ||
                    !item.data.data     ||
                    item.data.data === 'None'
                );

                if(result) return null;

                dispatch(resetTargetUserCmpl());

                return targetValue;
            }

            const url = ADMINE_SERCH_STATUS_ENDPOINT(id, targetValue);

            const serchStatRes: AxiosResponse<FetchResponse<any>> = await api.patch(url);

            if (
                serchStatRes.status !== 200 ||
                !serchStatRes.data.success
            ) return null;

            if(isDisp) {
                const newProfilesList = adminState.profilesList.map(
                    item => ({
                        ...item,
                        status: item.id === id ? targetValue : item.status,
                    })
                );

                dispatch(setNewProfilesList(newProfilesList));
            }

            return targetValue;
        } catch (error) {
            console.log( error )

            return 'error';
        }
    }
);

export const selectPsychStatusAsync = createAsyncThunk(
    'admin/select-psych-status',
    async (data: DataSelPS, { dispatch, getState }): Promise<AsyncThunkRes<EPsychStatus>> => {
        try {
            const url = PSYCH_CHANGE_STATUS_ENDPOINT(data.id, data.targetValue);
            const response: AxiosResponse<FetchResponse<any>> = await api.patch(url);

            if (
                response.status !== 200 ||
                !response.data.success
            ) return null;

            if( data.isDisp ) {
                const rootState = getState() as IState;
                const profilesList = rootState.admin.profilesList;

                const newProfilesList = profilesList.map(
                    item => ({
                        ...item,
                        status: item.id === data.id ? data.targetValue : item.status,
                    })
                );

                dispatch(setNewProfilesList(newProfilesList));
            };

            return data.targetValue;
        } catch (error) {
            console.log(error);
            return 'error';
        }
    },
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
    async (data: InitSliderData | undefined, { getState, dispatch }): Promise<AsyncThunkRes<ComplaintListItem[]>> => {
        try {
            dispatch(setLoad(true));

            const resData = data ?? initialArgs;

            const rootState = getState() as IState;
            const telegramId = rootState.profile.info.id;
            const complaintsList  = rootState.admin.complaintsList;

            const url = ADMINE_CMPLS_ENDPOINT(
                telegramId,
                EProfileRoles.Admin.toLocaleLowerCase(),
                resData.offset,
                resData.limit,
            );

            const response: AxiosResponse<FetchResponse<ComplaintsListRes[]>> =
                await api.get(url);
            
            console.log( response )
            
            if(
                response.status !== 200 ||
                !response.data.success  ||
                !response.data.data     ||
                response.data.data === 'None'
            ) return null;

            let result: ComplaintListItem[] = [];

            for(let item of response.data.data) {
                const date = new Date(item.createdAt);
                const formatted = date.toLocaleDateString('ru-RU'); 

                result.push({
                    id: item.reportedUser.telegramId,
                    date: formatted,
                    complGlob: item.globComplRes,
                    complTarget: item.targetComplRes,
                    avatar: item.reportedUser.avatar,
                    name: item.reportedUser.name,
                });
            };

            if(data) {
                result = [ ...complaintsList, ...result ];
            }

            return result;
        } catch (error) {
            console.log(error);
            
            return 'error';
        } finally {
            dispatch(setLoad(false));
        }
    },
);

export const getTargetVideoInfoAsync = createAsyncThunk(
    'admin/get-target-video-info',
    async (id: number, { getState, dispatch }): Promise<AsyncThunkRes<VideoItemWithPsych>> => {
        try {
            if(isNaN(id)) return null;

            dispatch(setLoad(true));

            const rootState = getState() as IState;
            const videosList = rootState.videos.shortsList.videos;

            const result = videosList.find(
                item => item.id === id
            );

            return result || null;
        } catch (error) {
            return 'error';
        } finally {
            dispatch(setLoad(false));
        }
    },
);

export const deletePsychVideoAsync = createAsyncThunk(
    'admin/delete-psych-video',
    async (_, { getState }): Promise<AsyncThunkRes<'success'>> => {
        try {
            const rootState = getState() as IState;
            const videoId = rootState.admin.targetVideo?.id;
            
            if(!videoId) return 'error';

            const url = `${VIDEO_ENDPOIN}/${videoId}`;

            const response: AxiosResponse<FetchResponse<null>> = await api.delete(url)

			if (response.status !== 200 || !response.data.success) return null

            return 'success';
        } catch (error) {
            console.log( error );
            return 'error';
        };
    },
);

export const toggleVideoPublishedAsync = createAsyncThunk(
    'admin/toggle-video-published',
    async (_, { getState }): Promise<AsyncThunkRes<boolean>> => {
        try {
            const rootState = getState() as IState;
            const targetVideo = rootState.admin.targetVideo;

            if(!targetVideo) return 'error';

            const data: EditVideoData = {
                videoId: targetVideo.id,
                title: targetVideo.title,
                description: targetVideo.description,
                isPublished: !targetVideo.isPublished,
            };

			const url = `${VIDEO_ENDPOIN}/${targetVideo.id}`;

			const response: AxiosResponse<FetchResponse<Omit<VideoItemWithPsych, 'isLiked'>>> =
                await api.patch(url, data);

            if (
				response.status !== 200 ||
				!response.data.success ||
				!response.data.data ||
				response.data.data === 'None'
			) return null;

            return !targetVideo.isPublished;
        } catch (error) {
            return 'error';
        };
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
        resetTargetUserCmpl: state => {
            state.targetProfile.complaint = null;
        },
        setSearchComplId: (state, action: PayloadAction<string>): void => {
            state.searchComplId = action.payload;
        },
        setSearchComplType: (state, action: PayloadAction<ESearchComplType>): void => {
            state.searchComplType = action.payload;
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
                    state.profilesList = [];
                    console.log("Ошибка получения списка пользователей");
                    break;
                case null:
                    state.profilesList = [];
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

        // Изменение статуса специолиста
        builder.addCase(selectPsychStatusAsync.pending, _ => {
            console.log("Изменение статуса специалиста");
        })
        builder.addCase(selectPsychStatusAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<EPsychStatus>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка изменения статуса специалиста");
                    break;
                case null:
                    console.log("Статус специалиста не изменён");
                    break;
                default:
                    state.targetProfile.status = action.payload;
                    console.log("Успешное изменение статуса специалиста");
                    break;
            }
        }),
        builder.addCase(selectPsychStatusAsync.rejected, _ => {
            console.log("Ошибка изменения статуса специалиста");
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

        // Получение видео психолога
        builder.addCase(getTargetVideoInfoAsync.pending, _ => {
            console.log("Получение видео психолога");
        })
        builder.addCase(getTargetVideoInfoAsync.fulfilled, ( state, action: PayloadAction<AsyncThunkRes<VideoItemWithPsych>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка получения видео психолога");
                    break;
                case null:
                    state.targetVideo = action.payload;
                    console.log("Видео психолога не получено");
                    break;
                default:
                    state.targetVideo = action.payload;
                    console.log("Успешное получение видео психолога");
                    break;
            }
        }),
        builder.addCase(getTargetVideoInfoAsync.rejected, _ => {
            console.log("Ошибка получения видео психолога");
        })

        // Удаление видео психолога
        builder.addCase(deletePsychVideoAsync.pending, _ => {
            console.log("Удаление видео психолога");
        })
        builder.addCase(deletePsychVideoAsync.fulfilled, ( _, action: PayloadAction<AsyncThunkRes<'success'>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка удаления видео психолога");
                    break;
                case null:
                    console.log("Видео психолога не удалено");
                    break;
                default:
                    console.log("Успешное удаление видео психолога");
                    break;
            }
        }),
        builder.addCase(deletePsychVideoAsync.rejected, _ => {
            console.log("Ошибка удаления видео психолога");
        })

        // Изменение статуса видео
        builder.addCase(toggleVideoPublishedAsync.pending, _ => {
            console.log("Изменение статуса видео");
        })
        builder.addCase(toggleVideoPublishedAsync.fulfilled, ( _, action: PayloadAction<AsyncThunkRes<boolean>> ) => {
            switch(action.payload) {
                case 'error':
                    console.log("Ошибка изменения статуса видео");
                    break;
                case null:
                    console.log("Статус видео не изменён");
                    break;
                default:
                    console.log("Успешное изменение статуса видео");
                    break;
            }
        }),
        builder.addCase(toggleVideoPublishedAsync.rejected, _ => {
            console.log("Ошибка изменения статуса видео");
        })

    }
});

export const {
    setSearchType,
    setSearchId,
    setPassword,
    setNewProfilesList,
    setTargetProfileId,
    resetTargetUserCmpl,
    setSearchComplId,
    setSearchComplType,
} = adminSlice.actions;
export default adminSlice.reducer;
