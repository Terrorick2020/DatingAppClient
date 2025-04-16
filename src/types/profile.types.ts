import { EProfileRoles, EProfileStatus, ESex } from './store.types';


export interface ProfileSelf {
    id: string
    role: EProfileRoles
    status: EProfileStatus
    username: string
    name: string
    age: number | null
    city: string
    sex: ESex
    bio: string
    interest: string
    selSex: ESex
}

export interface ProfileState {
    info: ProfileSelf
}
