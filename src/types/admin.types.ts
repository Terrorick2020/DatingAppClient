import { EProfileRoles, EProfileStatus } from './store.types';
import { PhotoItem } from './profile.types';


export interface ProfilesListItem {
    id: string
    role: EProfileRoles
    avatar: string
    name: string
    status: EProfileStatus
}

export interface BaseComplaintItem {
    id: string
    date: string
    complGlob: string
    complTarget: string
}

export interface TargetProfileCompalint extends BaseComplaintItem {
    from: string
    time: string
    msg: string
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
    complaint: TargetProfileCompalint | null
}

export interface ComplaintListItem extends BaseComplaintItem {
    avatar: string
    name: string
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
    delComplaint: boolean
}

export interface PropsUserInfoComponent {
    targetProfile: TargetProfile
}

export enum UserInfoBtnId {
    Block = 'Block',
    ProUnblock = 'ProUnblock',
    Unpro = 'UnPro',
    DelCompl = 'DelCompl',
}

export interface UserItemActivCtx {
    text: string
    targetStat: EProfileStatus
}

export interface PropsComplaintsListHeader {
    handleSearch: () => void
}

export interface PropsComplaintsListCtxItem {
    name: string
    date: string
    complText: string
}

export interface PropsUserInfoComplaint {
    complaint: TargetProfileCompalint | null
}

export interface PropsUsersListDialog {
    open: boolean
    hadleClose: () => void
}

export interface PropsUserListItem {
    item: ProfilesListItem
    toUserInfo: string
    setOpenDel: (value: boolean) => void
}
