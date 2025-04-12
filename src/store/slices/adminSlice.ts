import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EProfileRoles, EProfileStatus } from '@/types/store.types';
import { resUsersList } from '@/constant/admin';
import { setLoad } from './settingsSlice';
import { delay } from '@/AppSuspense';
import { type IState } from '@/types/store.types';
import type { AdminState, ProfilesListItem } from '@/types/admin.types';


// import axios from 'axios';


const initialState: AdminState = {
    searchType: EProfileRoles.User,
    searchId: '',
    profilesList: [],
    targetProfile: {
        id: '',
        role: EProfileRoles.User,
        photos: [],
        firstName: '',
        lastName: '',
        age: null,
        location: '',
        status: EProfileStatus.Noob,
        description: '',
    }
}

export const getProfilesListAsync = createAsyncThunk(
    'admin/get-profile-list',
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
        builder.addCase(getProfilesListAsync.pending, _ => {
            console.log("Получение списка пользователей");
        })
        builder.addCase(getProfilesListAsync.fulfilled, ( state, action ) => {
            console.log("Успешное получение списка пользователей");
            state.profilesList = action.payload;
        })
        builder.addCase(getProfilesListAsync.rejected, _ => {
            console.log("Ошибка получения списка пользователей");
        })
    }
})

export const { setSearchType, setSearchId } = adminSlice.actions;
export default adminSlice.reducer;
