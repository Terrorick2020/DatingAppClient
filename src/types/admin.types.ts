import { EProfileRoles, EProfileStatus } from './store.types';


export interface ProfilesListItem {
    id: string
    avatr: string
    name: string
    status: EProfileStatus
}

export interface TargetProfile {
    id: string
    role: EProfileRoles
    photos: string[]
    name: string
    age: number | null
    city: string
    status: EProfileStatus
    description: string
}

export interface AdminState {
    searchType: EProfileRoles
    searchId: string
    profilesList: ProfilesListItem[]
    targetProfile: TargetProfile
}

export interface StatusData {
    text: string
    status: string
    addClass: string
}