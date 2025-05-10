import type {
    AdminState,
    ProfilesListItem,
    TargetProfile,
    DataSerchProfStat,
    ComplaintListItem,
} from '@/types/admin.types';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { EProfileRoles, EProfileStatus } from '@/types/store.types';
import { resUsersList, resPsychsList, targetsUsers } from '@/constant/admin';
import { setLoad } from './settingsSlice';
import { delay } from '@/funcs/general.funcs';
import type { PhotoItem } from '@/types/profile.types';
import type { IState } from '@/types/store.types';

// import axios from 'axios';


const initialState: AdminState = {
    searchType: EProfileRoles.User,
    searchId: '',
    password: '',
    link: 'https://t.me/BotFather',
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
    },
    complaintsList: [],
};

export const getProfilesListAsync = createAsyncThunk(
    'admin/get-profiles-list',
    async (_, { getState, dispatch }): Promise<ProfilesListItem[]> => {
        try {
            dispatch(setLoad(true));

            await delay(1000);

            const rootState = getState() as IState;
            const adminState = rootState.admin;

            let response: ProfilesListItem[] = [];

            switch ( adminState.searchType ) {
            case EProfileRoles.User:
                response = resUsersList;
                break;
            case EProfileRoles.Psych:
                response = resPsychsList;
                break;
            }
    
            if ( adminState.searchId ) return response.filter( item => item.id.includes( adminState.searchId ) );
    
            return response;

        } catch ( error ) {
            throw error;
        } finally {
            dispatch(setLoad(false));
        }
    }
);

export const getUniqueLinkAsync = createAsyncThunk(
    'admin/get-unique-link',
    async (_, { dispatch }): Promise<string> =>{
        try {
            dispatch(setLoad(true));

            await delay(1000);
    
            const response = 'https://t.me/a/psych/s/3339d25d-5fdfd-4dfdf8d-b442-30aadfdf2b4e8';
    
            return response;

        } catch ( error ) {
            throw error;
        } finally {
            dispatch(setLoad(false));
        }
    }
);

export const getProfileByIdAsync = createAsyncThunk(
    'admin/get-profile-by-id',
    async (id: string, { dispatch }): Promise<TargetProfile> => {
        try {
            dispatch(setLoad(true));

            await delay(1500);

            const response = targetsUsers[id];

            return response;
        } catch (error) {
            throw error;
        } finally {
            dispatch(setLoad(false));
        }
    }
);

export const addPhotoToUserAsync = createAsyncThunk(
    'admin/add-photo-to-user',
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
);

export const delPhotoToUserAsync = createAsyncThunk(
    'admin/del-photo-to-user',
    async (id: string): Promise<string> => {
        try {
            await delay(2000);

            return id;
        } catch (error) {
            throw error;
        }
    }
);

export const serchProfileStatusAsync = createAsyncThunk(
    'admin/serch-profile-status',
    async ({ id, targetValue }: DataSerchProfStat, { getState, dispatch }): Promise<EProfileStatus> => {
        const rootState = getState() as IState;
        const adminState = rootState.admin;

        const newProfilesList = adminState.profilesList.map(
            item => ({
                ...item,
                status: item.id === id ? targetValue : item.status,
            })
        )

        dispatch(setNewProfilesList(newProfilesList));

        await delay(500);

        const response = targetValue;

        return response;
    }
);

export const deleteUserAsync = createAsyncThunk(
    'admin/delete-user',
    async (_, { getState }): Promise<ProfilesListItem[]> => {
        try {

            const rootState = getState() as IState;
            const adminState = rootState.admin;

            const newProfilesList = adminState.profilesList.filter(item => item.id !== adminState.targetProfile.id);

            await delay(500);

            return newProfilesList
        } catch (error) {
            throw error;
        }
    }
);

export const initComplaintListAsync = createAsyncThunk(
    'admin/init-complaint-list',
    async (_, {dispatch}): Promise<ComplaintListItem[]> => {
        try {
            dispatch(setLoad(true));

            await delay(2000);

            return [];
        } catch (error) {
            throw error;
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
        builder.addCase(getProfilesListAsync.fulfilled, ( state, action: PayloadAction<ProfilesListItem[]> ) => {
            console.log("Успешное получение списка пользователей");
            state.profilesList = action.payload;
        }),
        builder.addCase(getProfilesListAsync.rejected, _ => {
            console.log("Ошибка получения списка пользователей");
        })

        // Добавление фотографии пользователю
        builder.addCase(addPhotoToUserAsync.pending, _ => {
            console.log("Добавление фотографии пользователю");
        })
        builder.addCase(addPhotoToUserAsync.fulfilled, ( state, action: PayloadAction<PhotoItem> ) => {
            console.log("Успешное добавление фотографии пользователю");
            state.targetProfile.photos.push(action.payload);
        }),
        builder.addCase(addPhotoToUserAsync.rejected, _ => {
            console.log("Ошибка добавления фотографии пользователю");
        })

        // Удаление фотографии пользователю
        builder.addCase(delPhotoToUserAsync.pending, _ => {
            console.log("Удаление фотографии пользователю");
        })
        builder.addCase(delPhotoToUserAsync.fulfilled, ( state, action: PayloadAction<string> ) => {
            console.log("Успешное удаление фотографии пользователю");
            state.targetProfile.photos = state.targetProfile.photos.filter(
                item => item.id !== action.payload
            );
        }),
        builder.addCase(delPhotoToUserAsync.rejected, _ => {
            console.log("Ошибка удаления фотографии пользователю");
        })

        // Получение уникальной ссылки
        builder.addCase(getUniqueLinkAsync.pending, _ => {
            console.log("Получение уникальной ссылки");
        })
        builder.addCase(getUniqueLinkAsync.fulfilled, ( state, action: PayloadAction<string> ) => {
            console.log("Успешное получение уникальной ссылки");
            state.link = action.payload;
        }),
        builder.addCase(getUniqueLinkAsync.rejected, _ => {
            console.log("Ошибка получения уникальной ссылки");
        })

        // Получение конкретного пользователя
        builder.addCase(getProfileByIdAsync.pending, _ => {
            console.log("Получение целевого пользователя");
        })
        builder.addCase(getProfileByIdAsync.fulfilled, ( state, action: PayloadAction<TargetProfile> ) => {
            console.log("Успешное получение целевого пользователя");
            state.targetProfile = action.payload;
        }),
        builder.addCase(getProfileByIdAsync.rejected, _ => {
            console.log("Ошибка получения целевого пользователя");
        })

        // Изменение статуса пользователя
        builder.addCase(serchProfileStatusAsync.pending, _ => {
            console.log("Изменение статуса пользователя");
        })
        builder.addCase(serchProfileStatusAsync.fulfilled, ( state, action: PayloadAction<EProfileStatus> ) => {
            console.log("Успешное изменение статуса пользователя");
            state.targetProfile.status = action.payload;
        }),
        builder.addCase(serchProfileStatusAsync.rejected, _ => {
            console.log("Ошибка изменения статуса пользователя");
        })

        // Удаление пользователя
        builder.addCase(deleteUserAsync.pending, _ => {
            console.log("Удаление пользователя");
        })
        builder.addCase(deleteUserAsync.fulfilled, ( state, action: PayloadAction<ProfilesListItem[]> ) => {
            console.log("Успешное удаление пользователя");
            state.profilesList = action.payload;
        }),
        builder.addCase(deleteUserAsync.rejected, _ => {
            console.log("Ошибка удаления пользователя");
        })

        // Получение списка жалоб
        builder.addCase(initComplaintListAsync.pending, _ => {
            console.log("Получение списка жалоб");
        })
        builder.addCase(initComplaintListAsync.fulfilled, ( state, action: PayloadAction<ComplaintListItem[]> ) => {
            console.log("Успешное получение списка жалоб");
            state.complaintsList = action.payload;
        }),
        builder.addCase(initComplaintListAsync.rejected, _ => {
            console.log("Ошибка получения списка жалоб");
        })
    }
})

export const { setSearchType, setSearchId, setPassword, setNewProfilesList, setTargetProfileId } = adminSlice.actions;
export default adminSlice.reducer;
