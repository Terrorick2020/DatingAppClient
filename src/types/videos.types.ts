import type { PsychAddVideoRes } from './fetch.type';


export enum VideoConfDType {
    Revoke = 'revoke',
    Delete = 'delete',
}

export interface TargetPsychVideo extends PsychAddVideoRes {
    preview: string
    title: string
    description: string
    url: string
}

export interface VideoItemPsych {
    id: number
    name: string
    about: string
}

export interface VideoItem {
    id: number
    createdAt: Date
    updatedAt: Date
    key: string
    previewKey: string
    telegramId: string
    title: string
    description: string
    isPublished: boolean
    likesCount: number
    viewsCount: number
    url: string
    psychologist: VideoItemPsych
}

export interface SelfPsychVideos {
    videos: VideoItem[]
    total: number | null
}

export interface VideoItemWithPsych extends VideoItem {
    isLiked: boolean
}

export interface VideoShortsList extends Omit<SelfPsychVideos, 'videos'> {
    videos: VideoItemWithPsych[]
}

export interface VideosState {
    targetPsychVideo: TargetPsychVideo
    selfPsychVideos: SelfPsychVideos
    shortsList: VideoShortsList
}

export interface PsychAddVideoParams {
    file: File
    setProgress: (value: number) => void
}

export interface PropsVideoMainItem {
    item: VideoItem
    setDialogType: (value: VideoConfDType) => void
    setOpenConf: (value: boolean) => void
}
