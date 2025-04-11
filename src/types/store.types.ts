import { type AdminState } from './admin.types';
import { type SettingsState } from './settings.type';
import { type ChatsState } from './chats.types';
import { type LikesState } from './likes.types';
import { type ProfileState } from './profile.types';
import { type QuestState } from './quest.types';

<<<<<<< HEAD

=======
>>>>>>> dev
export enum EProfileRoles {
    Psych = 'Psych',
    User  = 'User',
    Admin = 'Admin',
    Psych = 'Psych',
}

export enum ESearchType {
    User  = EProfileRoles.User,
    Psych = EProfileRoles.Psych,
}

export enum EProfileStatus {
    Pro  = 'Pro',
    Noob = 'Noob',
    None = 'None',
    Blocked = 'Blocked',
}

export enum ESex {
    All = 'All',
    Male = 'Male',
    Female = 'Female',
}

export interface IState {
    admin:          AdminState
    chats:          ChatsState
    likes:          LikesState
    profile:        ProfileState
    questionnaires: QuestState
    settings:       SettingsState
}
