import { ESex } from "./store.types"

export enum ELanguage {
    English   = 'en',
    Russian   = 'ru',
    Ukrainian = 'ukr',
    Spanish   = 'esp',
}

export enum EApiStatus {
    success = 'success',
    error = 'error'
}

<<<<<<< HEAD
export interface InterestsVariant {
    id: number
    value: string
    label: string
}

export interface RegInpErr {
    nameErr: boolean
    cityErr: boolean
    ageErr: boolean
    bioErr: boolean
=======
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
>>>>>>> dev
}

export interface SettingsState {
    routes: string[]
    lang:  ELanguage
    load: boolean
    apiStatus: EApiStatus
<<<<<<< HEAD
    regInpErr: RegInpErr
    interestsVariants: InterestsVariant[]
=======
    fQErrors: FQErrors
    interestsVars: InterestsVarsItem[]
    selSexVars: SelSexVarsItem[]
>>>>>>> dev
}
