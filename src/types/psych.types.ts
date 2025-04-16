import { ELineStatus } from "./store.types"


export interface TargerPsych {
    
}

export interface PsychListItem {
    id: string
    avatar: string
    name: string
    spec: string
    lineStat: ELineStatus
    exp: number
}

export interface PsychState {
    serchPsychId: string
    psychList: PsychListItem[]
    targetPsych: TargerPsych
}
