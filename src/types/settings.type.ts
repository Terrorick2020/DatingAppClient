import { ESex } from "./store.types"

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

export interface InterestsVarsItem {
    id: number
    value: string
    label: string
    isOppos: boolean
}

export interface SelSexVarsItem {
    id: number
    value: ESex
    label: string
    isDisabled: boolean
}

export interface SelSexVarsBase {
    [key: string]: SelSexVarsItem[]
}

export interface ComplaintsVarsItem {
    id: number
    value: string
    label: string
}

export enum EComplaintType {
    Load = 'Load',
    List = 'List',
    TxtArea = 'TxtArea',
}

export interface Complaint {
    open: boolean
    type: EComplaintType
    query: string
    complaintsVars: ComplaintsVarsItem[]
}

export interface SettingsState {
    routes: string[]
    lang:  ELanguage
    load: boolean
    apiRes: EApiStatus
    fQErrors: FQErrors
    interestsVars: InterestsVarsItem[]
    selSexVars: SelSexVarsItem[]
    complaint: Complaint
}
