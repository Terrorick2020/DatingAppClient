import { PlanLabelSvgType } from "./ui.types";


export interface LikesItemTimer {
    value: string
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

export interface LikesState {
    likesList: LikesItem[]
}
