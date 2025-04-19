import { ReactNode } from 'react';


export enum PlanLabelSvgType {
    ordinary = 'ordinary',
    success = 'success',
    error = 'error',
}

export interface PropsChatInput {
    isMatch: boolean
}

export interface ClearBtnProps {
    onClear: () => void
}

export interface PropsLikeBtn {
    id: number
    clickLike: (id: number) => void
}

export interface PropsListBlock {
    img: string
    route: string
    children: ReactNode
}

export interface PropsPlansLabel {
    type: PlanLabelSvgType
}

export interface PropsScrollBar {
    len:   number
    index: number
}

export interface PropsSearchInput {
    value: string
    placeholder: string
    inpType: string
    handleInputChange: (newValue: string) => void
    handleClearInput: () => void
    handleInputKeyDown: () => void
}

export interface PropsTimer {
    isCritical: boolean
    value: string
}