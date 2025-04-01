import { EProfileRoles, EProfileStatus, ESex, EInterests } from './store.types';


export interface ProfileSelf {
    id: number | null
    role: EProfileRoles
    status: EProfileStatus
    username: string
    name: string
    age: number | null
    city: string
    sex: ESex
    bio: string
    interest: EInterests
    selSex: ESex
}

export interface ProfileState {
    info: ProfileSelf
}
