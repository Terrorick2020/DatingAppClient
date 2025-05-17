import { EProfileRoles, EProfileStatus } from './store.types';
import { PhotoItem } from './profile.types';


export interface ProfilesListItem {
    id: string
    role: EProfileRoles
    avatar: string
    name: string
    status: EProfileStatus
}

export interface TargetProfile {
    id: string
    role: EProfileRoles
    photos: PhotoItem[]
    name: string
    age: number | null
    city: string
    status: EProfileStatus
    description: string
}

export interface ComplaintListItem {
    id: string
    avatar: string
    name: string
    complGlob: string
    complTarget: string
    date: string
}

export interface AdminState {
    searchType: EProfileRoles
    searchId: string
    password: string
    link: string
    profilesList: ProfilesListItem[]
    targetProfile: TargetProfile
    complaintsList: ComplaintListItem[]
}

export interface StatusData {
    text: string
    status: string
    addClass: string
}

export interface DataSerchProfStat {
    id: string
    targetValue: EProfileStatus
}

export interface PropsUserInfoComponent {
    targetProfile: TargetProfile
}

export enum UserInfoBtnId {
    Block = 'Block',
    ProUnblock = 'ProUnblock',
    Unpro = 'UnPro',
}

export interface UserItemActivCtx {
    text: string
    targetStat: EProfileStatus
}
