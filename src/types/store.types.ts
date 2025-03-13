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

export interface AdminState {
}

export interface SettingsState {
    lang:  ELanguage
    theme: ETheme
}

export interface ChatsState {
}

export interface LikesState {
}

export interface ProfileState {
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
