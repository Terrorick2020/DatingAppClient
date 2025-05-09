import { EProfileRoles, EProfileStatus, ESex, ELineStatus } from './store.types';


export interface PhotoItem {
    id: string
    photo: string
}
export interface ProfileSelf {
    id: string
    photos: PhotoItem[]
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

export interface EveningPlansItem {
    value: string
    description: string
}

export interface EveningPlans {
    isCurrent: boolean
    plan: EveningPlansItem
    location: EveningPlansItem
}

export interface ProfileState {
    info: ProfileSelf
    addLink: string
    eveningPlans: EveningPlans
}

export interface SendGeoData {
    latitude: number
    longitude: number
    enableGeo: boolean
}
