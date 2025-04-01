import { AdminState } from './admin.types';
import { SettingsState } from './settings.type';
import { ChatsState } from './chats.types';
import { LikesState } from './likes.types';
import { ProfileState } from './profile.types';
import { QuestState } from './quest.types';


export enum ESearchType {
    user  = 'user',
    psych = 'psych',
}

export enum EProfileRoles {
    User  = 'User',
    Admin = 'Admin',
}

export enum EProfileStatus {
    Pro  = 'Pro',
    Noob = 'Noob',
    Blocked = 'Blocked'
}

export interface IState {
    admin:          AdminState
    chats:          ChatsState
    likes:          LikesState
    profile:        ProfileState
    questionnaires: QuestState
    settings:       SettingsState
}
