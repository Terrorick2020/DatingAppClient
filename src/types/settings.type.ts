import { ESex, ELineStatus, ETypingStatus } from './store.types';


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

export enum EBadgeType {
    Likes = 'likes',
    Chats = 'chats',
}

export enum ELikeBtnType {
    Accepted = 'accepted',
    Rejected = 'rejected',
    ToChat = 'toChat',
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

export type FQErrorKeys = keyof FQErrors;

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

export interface AbstractVarsItem {
    value: string
    label: string
}

export interface BaseVarsItem extends AbstractVarsItem {
    id: number
}

export interface CityesVarsItem extends AbstractVarsItem {
    id: string
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
    content: number
}

export interface BadgeBlock {
    chats: BadgeBlockItem
    likes: BadgeBlockItem
}

export interface SettingsState {
    isFirstly: boolean
    routes: string[]
    lang:  ELanguage
    load: boolean
    apiRes: SetApiRes
    fQErrors: FQErrors
    fEPErrors: FEPErrors
    cityesVars: CityesVarsItem[]
    interestsVars: InterestsVarsItem[]
    selSexVars: SelSexVarsItem[]
    complaint: Complaint
    mediaLink: string
    plansVars: BaseVarsItem[]
    districtsVars: DistrictVarsItem[]
    badge: BadgeBlock
    photosCashe: string[]
    likeBtnType: ELikeBtnType
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


export interface IStatusAttr {
    addClass: string
    text: string
}

export type LineStatusAttr = {
    [key in ELineStatus | ETypingStatus]: IStatusAttr
}
