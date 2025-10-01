import type { AdminState } from './admin.types';
import type { SettingsState, InterestsVarsItem, CityesVarsItem } from './settings.type';
import type { PsychState } from './psych.types';
import type { ChatsState } from './chats.types';
import type { LikesState } from './likes.types';
import type { ProfileState } from './profile.types';
import type { QuestState } from './quest.types';
import type { VideosState } from './videos.types';


export enum ETypeDispatch {
    ResetStore = 'ResetStore',
}

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

export enum EPsychStatus {
    Active = 'Active',
    Inactive = 'Inactive',
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
    videos:         VideosState
}

export type AsyncThunkRes<T> = T | null | 'error'

export interface InitFillingQuestRes {
    cityes: CityesVarsItem[]
    interests: InterestsVarsItem[]
}
