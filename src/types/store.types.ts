import { AdminState } from './admin.types';
import { SettingsState, InterestsVarsItem, BaseVarsItem } from './settings.type';
import { PsychState } from './psych.types';
import { ChatsState } from './chats.types';
import { LikesState } from './likes.types';
import { ProfileState } from './profile.types';
import { QuestState } from './quest.types';


export enum EProfileRoles {
    User  = 'User',
    Admin = 'Admin',
    Psych = 'Psych',
}

export enum EProfileStatus {
    Pro  = 'Pro',
    Noob = 'Noob',
    Blocked = 'Blocked',
}

export enum ESex {
    All = 'All',
    Male = 'Male',
    Female = 'Female',
}

export enum ELineStatus {
    Online = 'online',
    Offline = 'offline',
}

export enum ETypingStatus {
    Typing = 'Typing',
    UnTyping = 'UnTyping',
}

export enum LinkTooltipText {
    Copy = 'Copy',
    Copied = 'Copied',
    Error = 'Error',
}

export interface IState {
    admin:          AdminState
    chats:          ChatsState
    likes:          LikesState
    profile:        ProfileState
    questionnaires: QuestState
    psych:          PsychState
    settings:       SettingsState
}

export type AsyncThunkRes<T> = T | null | 'error'

export interface InitFillingQuestRes {
    cityes: BaseVarsItem[]
    interests: InterestsVarsItem[]
}
