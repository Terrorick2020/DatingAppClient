import { ELineStatus } from './store.types';


export interface PsychListItem {
    id: string
    avatar: string
    name: string
    spec: string
    lineStat: ELineStatus
    exp: number
}

export interface TargerPsychExpListItem {
    id: string
    title: string
    desc: string
    expGap: string
}
export interface TargerPsych {
    id: string
    photo: string | null
    name: string
    exp: number | null
    spec: string
    lineStat: ELineStatus
    desc: string
    expList: TargerPsychExpListItem[]
}

export interface PsychState {
    serchPsychQuery: string
    psychList: PsychListItem[]
    totalPsychCount: number | null
    targetPsych: TargerPsych | null
}

export interface PsychListResult {
    psych: PsychListItem[]
    total: number
}
