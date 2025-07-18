import { ELineStatus } from './store.types';
import { InitSliderData } from './quest.types';


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
    timer: number
    unreadMsgsCount: number
}

export interface ChatsCtx {
    chatsFavList: ChatsFavListItem[]
    chatsList: ChatsListItem[]
}

export interface TargetChatDayMsg {
    id: string
    from: string
    to: string
    msg: string
    time: string
    isChecked: boolean
}

export interface TargetChatDay {
    id: string
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
    timer: number | null
    interlocutor: ChatInterlocutor | null
    chatDialog: TargetChatDay[]
}

export interface ChatsState {
    chatsFavList: ChatsFavListItem[]
    chatsList: ChatsListItem[]
    targetChat: TargetChat
}

export interface PropsChatDay {
    id: string
    selfId: string
    day: string
    dayListMsg: TargetChatDayMsg[]
}

export interface PropsChatDialogDelete {
    open: boolean
    id: string
    handleClose: () => void
}

export interface PropsChatDialogSessionEnd {
    open: boolean
    setOpen: (value: boolean) => void
}

export interface PropsChatHeader {
    id: string
}

export interface PropsChatMsg {
    id: string
    isSelf: boolean
    msg: string
    time: string
    isChecked: boolean
}

export interface PropsChatsListItem {
    item: ChatsListItem
}

export interface PropsChatsHeaderItem {
    item: ChatsFavListItem
    toChat: (id: string) => void
}

export interface IncomingMsg {
    chatId: string
    created_at: number
    fromUser: string
    id: string
    is_read: boolean
    text: string
    updated_at: number
}


export interface GetChatByIdArgs {
    id: string
    query: InitSliderData
}

export interface PropsTargetChatList {
    setIsFirstly: (value: boolean) => void
}
