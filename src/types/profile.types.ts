import { EProfileRoles, EProfileStatus, ESex } from './store.types';


export enum EMySex {
    Male = ESex.Male,
    Female = ESex.Female,
}

export interface ProfileSelf {
    id: number | null
    role: EProfileRoles
    status: EProfileStatus
    username: string
    name: string
    age: number | null
    city: string
    sex: EMySex
    bio: string
    interest: string
    selSex: ESex
}

export interface ProfileState {
    info: ProfileSelf
}
