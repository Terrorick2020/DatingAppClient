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
    name: string
    age: number | null
    town: string
    sex: ESex
    bio: string
    interest: string
    selSex: ESex
    referralCode: string
    latitude: number | null
    longitude: number| null
}

export interface ProfileSelfGeo {
    latitude: number | null
    longitude: number| null
}

export interface EveningPlansItem {
    value: string
    description: string
}

export interface EveningPlansMeta {
    isCurrent: boolean
    remains: number | null
}

export interface EveningPlans {
    isCurrent: boolean
    remains: number | null
    plan: EveningPlansItem
    location: EveningPlansItem
}

export interface ProfileState {
    info: ProfileSelf
    addLink: string
    eveningPlans: EveningPlans
    selPsych: string
}

export interface SendGeoData {
    latitude: number
    longitude: number
    enableGeo: boolean
}

export interface WebAppUser {
  id: number
  is_bot?: boolean
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  added_to_attachment_menu?: boolean
  allows_write_to_pm?: boolean
  photo_url?: string
}

export interface SavePhotoAsyncThuncData {
    photo: File,
    setUploadProgress: (value: number) => void
}
