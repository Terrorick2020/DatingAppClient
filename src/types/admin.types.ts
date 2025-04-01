import { ESearchType, EProfileRoles, EProfileStatus } from './store.types';


export interface ProfilesListItem {
    photo: Blob | null
    firstName: string
    lastName?: string
    age?: number | null
    isActive: boolean
}

export interface TargetProfile {
    id: string
    role: EProfileRoles
    photos: Blob[]
    firstName: string
    lastName?: string
    age: number | null
    location: string
    status: EProfileStatus
    description?: string
}

export interface AdminState {
    searchType: ESearchType
    searchId: string
    profilesList: ProfilesListItem[]
    targetProfile: TargetProfile
}

export interface PersonType {
    id: number,
    value: string,
    label : string,
}
