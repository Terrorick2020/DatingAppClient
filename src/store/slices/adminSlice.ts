import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EProfileRoles, EProfileStatus } from '@/types/store.types';
import { resUsersList, targetsUsers } from '@/constant/admin';
import { setLoad } from './settingsSlice';
import { delay } from '@/funcs/general.funcs';
import { type IState } from '@/types/store.types';
import type { AdminState, ProfilesListItem, TargetProfile } from '@/types/admin.types';


// import axios from 'axios';


const initialState: AdminState = {
    searchType: EProfileRoles.User,
    searchId: '',
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
    }
}

export const getProfilesListAsync = createAsyncThunk(
    'admin/get-profiles-list',
    async (_, { getState, dispatch }): Promise<ProfilesListItem[]> => {
        try {
            dispatch(setLoad(true));

            await delay(1000);

            const rootState = getState() as IState;
            const searchId = rootState.admin.searchId;
    
            const response = resUsersList;
    
            if ( searchId ) return response.filter( item => item.id.includes( searchId ) );
    
            return response;

        } catch ( error ) {
            throw error;
        } finally {
            dispatch(setLoad(false));
        }
    }
)

export const getProfileByIdAsync = createAsyncThunk(
    'admin/get-profile-by-id',
    async (id: string): Promise<TargetProfile> => {
        const response = targetsUsers[id];

        return response
    }
)

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setSearchType: (state, action) => {
            state.searchType = action.payload
        },
        setSearchId: (state, action) => {
            state.searchId = action.payload
        },
        setNewProfile: (state, action) => {
            state.targetProfile = action.payload
        },
    },
    extraReducers: builder => {
        // Получение списка пользователей
        builder.addCase(getProfilesListAsync.pending, _ => {
            console.log("Получение списка пользователей");
        })
        builder.addCase(getProfilesListAsync.fulfilled, ( state, action ) => {
            console.log("Успешное получение списка пользователей");
            state.profilesList = action.payload;
        }),
        builder.addCase(getProfilesListAsync.rejected, _ => {
            console.log("Ошибка получения списка пользователей");
        })

        // Получение конкретного пользователя
        builder.addCase(getProfileByIdAsync.pending, _ => {
            console.log("Получение целевого пользователя");
        })
        builder.addCase(getProfileByIdAsync.fulfilled, ( state, action ) => {
            console.log("Успешное получение целевого пользователя");
            state.targetProfile = action.payload;
        }),
        builder.addCase(getProfileByIdAsync.rejected, _ => {
            console.log("Ошибка получения целевого пользователя");
        })
    }
})

export const { setSearchType, setSearchId } = adminSlice.actions;
export default adminSlice.reducer;
