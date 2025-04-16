import { EProfileRoles, EProfileStatus } from './store.types';


export interface ProfilesListItem {
    id: string
    role: EProfileRoles
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
    password: string
    link: string
    profilesList: ProfilesListItem[]
    targetProfile: TargetProfile
}

export interface StatusData {
    text: string
    status: string
    addClass: string
}

export enum LinkTooltipText {
    Copy = 'Copy!',
    Copied = 'Copied!',
    Error = 'Error!',
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
    Unpro = 'unpro',
}
