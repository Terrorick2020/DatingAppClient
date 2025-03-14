export interface AdminState {
}

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

export interface SettingsState {
    lang:  ELanguage
    theme: ETheme
}

export interface ChatsState {
}

export interface LikesState {
}

export enum EApiRes {
    error   = 'error',
    block   = 'block',
    success = 'success'
}

export interface ProfileState {
    apiRes: EApiRes
}

export interface QuestionnairesState {
}

export interface IState {
    admin:          AdminState
    chats:          ChatsState
    likes:          LikesState
    profile:        ProfileState
    questionnaires: QuestionnairesState
    settings:       SettingsState
}
