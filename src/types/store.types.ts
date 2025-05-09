import { AdminState } from './admin.types';
import { SettingsState } from './settings.type';
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
    Blocked = 'Blocked'
}

export enum ESex {
    All = 'All',
    Male = 'Male',
    Female = 'Female',
}

export enum ELineStatus {
    Online = 'Onlie',
    Offline = 'Offline',
}

export enum LinkTooltipText {
    Copy = 'Copy',
    Copied = 'Copied',
    Error = 'Error',
}

export interface Persist {
    _persist: {
        version: number
        rehydrated: boolean
    }
}

export interface IState {
    admin:          AdminState
    chats:          ChatsState
    likes:          LikesState
    profile:        ProfileState
    questionnaires: QuestState
    psych:          PsychState
    settings:       SettingsState & Persist
}
