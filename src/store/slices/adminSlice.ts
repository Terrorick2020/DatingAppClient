import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { EProfileRoles, EProfileStatus } from '@/types/store.types'
import { type AdminState } from '@/types/admin.types'

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

export const getProfilesList = createAsyncThunk(
    'admin/get-profile-list',
    async (_, thunkAPI) => {
        console.log( thunkAPI )
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
})

export const { setSearchType, setSearchId } = adminSlice.actions
export default adminSlice.reducer
