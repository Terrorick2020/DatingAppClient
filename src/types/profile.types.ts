import { EProfileRoles, EProfileStatus, ESex, ELineStatus } from './store.types';


export interface ProfileSelf {
    id: string
    enableGeo: boolean
    lineStat: ELineStatus
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
    addLink: string
}

export interface SendGeoData {
    latitude: number
    longitude: number
    enableGeo: boolean
}
