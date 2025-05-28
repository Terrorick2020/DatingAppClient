export interface MediaProgressState {
    played: number
    playedSeconds: number
    loaded: number
    loadedSeconds: number
}

export interface PropsMediaContentBg {
    isPlaying: boolean
    handlePlaying: () => void
    handleSeekBy: (seconds: number) => void
}

export enum KeyFQBtnText {
    First = 'first',
    Other = 'other',
}

export interface FQBtnTextItem {
    text: string
    loadText: string
    mark: KeyFQBtnText
}

export interface FillQuestBtnText  {
    [KeyFQBtnText.First]: FQBtnTextItem
    [KeyFQBtnText.Other]: FQBtnTextItem
}
