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
    id: string
    name: string
    about: string
    photoUrl: string
}

export interface VideoItem {
    id: number
    createdAt: Date
    updatedAt: Date
    key: string
    previewUrl: string
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
    isViewed: boolean
}

export interface VideoShortsList extends Omit<SelfPsychVideos, 'videos'> {
    videos: VideoItemWithPsych[]
    isChecked: boolean
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
    setSelId: (value: number | null) => void
    setDialogType: (value: VideoConfDType) => void
    setOpenConf: (value: boolean) => void
}

export interface EditVideoData {
    videoId: number
    title: string
    description: string
    isPublished: boolean
}
