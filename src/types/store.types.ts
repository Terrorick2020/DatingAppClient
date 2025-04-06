import { type AdminState } from './admin.types';
import { type AuthState } from './auth.types';
import { type SettingsState } from './settings.type';
import { type ChatsState } from './chats.types';
import { type LikesState } from './likes.types';
import { type ProfileState } from './profile.types';
import { type QuestState } from './quest.types';


export enum ESearchType {
    User  = 'User',
    Psych = 'Psych',
}

export enum EProfileRoles {
    User  = 'User',
    Admin = 'Admin',
}

export enum EProfileStatus {
    Pro  = 'Pro',
    Noob = 'Noob',
    None = 'None',
    Blocked = 'Blocked',
}

export enum ESex {
    None = 'None',
    All = 'All',
    Male = 'Male',
    Female = 'Female',
}

export enum EInterests {
    Dialog = 'Dialog',
    Friendship = 'Friendship',
    Love = 'Love',
}

export interface IState {
    admin:          AdminState
    auth:           AuthState
    chats:          ChatsState
    likes:          LikesState
    profile:        ProfileState
    questionnaires: QuestState
    settings:       SettingsState
}
