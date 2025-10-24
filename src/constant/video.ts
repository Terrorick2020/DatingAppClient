import type { TargetPsychVideo, SelfPsychVideos, VideoShortsList } from '@/types/videos.types';


export const MAX_VIDEO_SIZE = 50 * 1024 * 1024;

export const targetPsychVideoBase: TargetPsychVideo = {
    videoId: null,
    key: '',
    preview: '',
    title: '',
    description: '',
    url: ''
};

export const selfPsychVideosBase: SelfPsychVideos = {
    videos: [],
    total: null,
};

export const shortsListBase = { isChecked: false, ...selfPsychVideosBase } as VideoShortsList;

export const ALLOWED_VIDEO_TYPES = [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/ogv',
    'video/avi',
    'video/quicktime',
    'video/x-ms-wmv',
    'video/3gpp',
    'video/x-flv',
    'video/x-ms-asf',
];
