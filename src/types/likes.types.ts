import { PlanLabelSvgType } from './ui.types';


export interface LikesItemTimer {
    value: number
    isCritical: boolean
}

export interface LikesItem {
    id: string
    avatar: string
    planStatus: PlanLabelSvgType
    timer: LikesItemTimer
    name: string
    age: number
}

export interface LikesMatchFrom {
    id: string
    avatar: string
    name: string
}

export interface LikesMatch {
    value: boolean
    from: LikesMatchFrom | null
}

export interface LikesState {
    likesList: LikesItem[]
    match: LikesMatch
}


export interface PropsLikesCard {
    likesItem: LikesItem
}
export interface LikesCardIsLoading {
    reject: boolean
    accept: boolean
}
