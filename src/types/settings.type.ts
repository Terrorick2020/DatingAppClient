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

export interface SettingsState {
    routes: string[]
    lang:  ELanguage
    load: boolean
    apiStatus: EApiStatus
}
