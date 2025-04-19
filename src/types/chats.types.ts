import { ELineStatus } from './store.types';

export interface ChatsFavListItem {
    id: string
    timer: string
    avatar: string
}

export interface ChatsListItem {
    id: string
    avatar: string
    name: string
    age: number
    lastMsg: string
    timer: string
    unreadMsgsCount: number
}

export interface ChatsCtx {
    chatsFavList: ChatsFavListItem[]
    chatsList: ChatsListItem[]
}

export interface TargetChatDayMsg {
    id: number
    from: string
    to: string
    msg: string
    time: string
    isChecked: boolean
}

export interface TargetChatDay {
    id: number
    day: string
    dayListMsg: TargetChatDayMsg[]
}

export interface ChatInterlocutor {
    id: string
    avatar: string
    name: string
    age: number
    lineStat: ELineStatus
}

export interface TargetChat {
    id: string
    interlocutor: ChatInterlocutor | null
    chatDialog: TargetChatDay[]
}

export interface ChatsState {
    chatsFavList: ChatsFavListItem[]
    chatsList: ChatsListItem[]
    targetChat: TargetChat
}
