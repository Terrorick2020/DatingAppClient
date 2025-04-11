import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EProfileRoles, ESex,  EProfileStatus } from '@/types/store.types'
<<<<<<< HEAD
import { type ProfileState, EMySex } from '@/types/profile.types';
=======
import type { ProfileState, ProfileSelf } from '@/types/profile.types';
>>>>>>> dev

import axios from 'axios';


const initialState: ProfileState = {
    info: {
        id: null,
        role: EProfileRoles.User,
        status: EProfileStatus.None,
        username: '',
        name: '',
        age: null,
        city: '',
<<<<<<< HEAD
        sex: EMySex.Male,
=======
        sex: ESex.Male,
>>>>>>> dev
        bio: '',
        interest: '',
        selSex: ESex.All,
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

        // if (parsedData.user) {
        //     parsedData.user = JSON.parse(parsedData.user)
        // }
        
        await axios.post(
            'http://localhost:3000/auth',
            {
                data: parsedData,
            }
        )

        return parsedData
    }
)

export const updateProfileAsync = createAsyncThunk(
    'profile/update-profile',
    async () => {}
)

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setInfo: (state, action) => {
<<<<<<< HEAD
            state.info = action.payload
        }
=======
            const newInfo: ProfileSelf = action.payload;
            state.info = newInfo;
        },
>>>>>>> dev
    },
    extraReducers: builder => {
        builder.addCase(initProfileAsync.pending, state => {
            console.log(state)
        })
        builder.addCase(initProfileAsync.fulfilled, ( state, action ) => {
            console.log( state, action )
        })
        builder.addCase(initProfileAsync.rejected, state => {
            console.log(state)
        })
    }
})

<<<<<<< HEAD
export const { setInfo } = profileSlice.actions
export default profileSlice.reducer
=======
export const { setInfo } = profileSlice.actions;
export default profileSlice.reducer;
>>>>>>> dev
