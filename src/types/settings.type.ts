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
}

export interface SettingsState {
    routes: string[]
    lang:  ELanguage
    load: boolean
    apiStatus: EApiStatus
    regInpErr: RegInpErr
    interestsVariants: InterestsVariant[]
}
