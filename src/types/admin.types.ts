import { EProfileRoles, EProfileStatus, EPsychStatus } from './store.types';
import type { PhotoItem } from './profile.types';
import type { VideoItemWithPsych } from './videos.types';


export enum ESearchComplType {
    Complaint = 'Complaint',
    Video = 'Video',
}

export interface ProfilesListItem {
    id: string
    role: EProfileRoles
    avatar: string
    name: string
    status: EProfileStatus | EPsychStatus
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
    status: EProfileStatus | EPsychStatus
    description: string
    complaint: TargetProfileCompalint[] | null
}

export interface ComplaintListItem extends BaseComplaintItem {
    avatar: string
    name: string
}

export interface AdminState {
    searchType: EProfileRoles
    searchId: string
    searchComplType: ESearchComplType
    searchComplId: string
    password: string
    link: string
    profilesList: ProfilesListItem[]
    targetProfile: TargetProfile
    complaintsList: ComplaintListItem[]
    targetVideo: VideoItemWithPsych | null
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
    isDisp?: boolean
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
    targetStat: EProfileStatus | EPsychStatus
    type: EProfileRoles.User | EProfileRoles.Psych
}

export interface PropsComplaintsListHeader {
    handleSearch: () => Promise<void>
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

export interface PropsVideosLiatItem {
    item: VideoItemWithPsych
}

export interface PropsVideoInfoContentMainInfo {
    id: string
    url: string
    name: string
    date: Date
    isPublished: boolean
}


export interface DataGetProfileByIdAsync {
    id: string
    type: EProfileRoles
}

export interface DataSelPS {
    id: string | number
    isDisp: boolean
    targetValue: EPsychStatus
};
