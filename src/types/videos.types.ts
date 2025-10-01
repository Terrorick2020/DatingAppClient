import type { PsychAddVideoRes } from './fetch.type';


export interface TargetPsychVideo extends PsychAddVideoRes {
    preview: string
    title: string
    description: string
}

export interface VideosState {
    targetPsychVideo: TargetPsychVideo
}

export interface PsychAddVideoParams {
    file: File
    setProgress: (value: number) => void
}
