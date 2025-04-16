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

export interface ChatsState {
    chatsFavList: ChatsFavListItem[]
    chatsList: ChatsListItem[]
}
