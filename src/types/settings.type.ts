export enum ELanguage {
    English   = 'en',
    Russian   = 'ru',
    Ukrainian = 'ukr',
    Spanish   = 'esp',
}

export enum ETheme {
    light = 'light',
    dark  = 'dark',
}

export enum EApiStatus {
    success = 'success',
    error = 'error'
}

export interface SettingsState {
    lang:  ELanguage
    theme: ETheme
    load: boolean
    apiStatus: EApiStatus
}