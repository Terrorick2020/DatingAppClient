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
