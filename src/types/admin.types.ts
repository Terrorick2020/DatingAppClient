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
    photos: Blob[]
    firstName: string
    lastName?: string
    age: number | null
    location: string
    status: EProfileStatus
    description?: string
}

export interface AdminState {
    searchType: EProfileRoles
    searchId: string
    profilesList: ProfilesListItem[]
    targetProfile: TargetProfile
}
