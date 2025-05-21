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
