import { ESex } from './store.types';


export enum ELanguage {
    English   = 'en',
    Russian   = 'ru',
    Ukrainian = 'ukr',
    Spanish   = 'esp',
}

export enum EApiStatus {
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
    Error = 'error',
}

export interface SetApiRes {
    value: boolean
    msg: string
    status: EApiStatus
    timestamp: number | null
}

export enum EAnimeDirection {
    Left = 'left',
    Up = 'up',
    Down = 'down',
    Right = 'right',
}

export interface FQErrorsItem {
    value: boolean
    msg: string
}
export interface FQErrors {
    photErr: FQErrorsItem
    nameErr: FQErrorsItem
    cityErr: FQErrorsItem
    ageErr: FQErrorsItem
    bioErr: FQErrorsItem
}

export interface FEPErrors {
    descPlanErr: FQErrorsItem
    districtErr: FQErrorsItem
    descDistErr: FQErrorsItem
}

export interface FEPHasErrors {
    descPlanErr?: FQErrorsItem
    districtErr?: FQErrorsItem
    descDistErr?: FQErrorsItem
}

export interface BaseVarsItem {
    id: number
    value: string
    label: string
}

export interface DistrictVarsItem extends BaseVarsItem {
    cityId: string
}

export interface InterestsVarsItem extends BaseVarsItem {
    isOppos: boolean
}

export interface SelSexVarsItem extends BaseVarsItem {
    value: ESex
    isDisabled: boolean
}

export interface SelSexVarsBase {
    [key: string]: SelSexVarsItem[]
}

export enum EComplaintType {
    Load = 'Load',
    Content = 'Content',
}

export enum EComplaintStep {
    FStep = 'FStep',
    SStep = 'SStep',
    TStep = 'TStep',
}

export interface Complaint {
    open: boolean
    type: EComplaintType
    step: EComplaintStep
    to: string
    value: string
    valueGlob: string
    query: string
    complaintsVars: BaseVarsItem[]
}

export interface BadgeBlockItem {
    value: boolean
    content: string
}

export interface BadgeBlock {
    chats: BadgeBlockItem
    likes: BadgeBlockItem
}

export interface SettingsState {
    routes: string[]
    lang:  ELanguage
    load: boolean
    apiRes: SetApiRes
    fQErrors: FQErrors
    fEPErrors: FEPErrors
    cityesVars: BaseVarsItem[]
    interestsVars: InterestsVarsItem[]
    selSexVars: SelSexVarsItem[]
    complaint: Complaint
    mediaLink: string
    plansVars: BaseVarsItem[]
    districtsVars: DistrictVarsItem[]
    badge: BadgeBlock
    photosCashe: string[]
}

export interface PropsLocationDistrict {
  districtsVars: DistrictVarsItem[]
}

export interface PropsPlansVars {
    plansVars: BaseVarsItem[]
}

export interface InitEPCtxAsyncRes {
    plans: BaseVarsItem[]
    districts: DistrictVarsItem[]
}
