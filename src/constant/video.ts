import type { TargetPsychVideo, SelfPsychVideos, VideoShortsList } from '@/types/videos.types';


export const MAX_VIDEO_SIZE = 50 * 1024 * 1024;

export const targetPsychVideoBase: TargetPsychVideo = {
    videoId: null,
    key: '',
    preview: '',
    title: '',
    description: '',
    url: '',
};

export const selfPsychVideosBase: SelfPsychVideos = {
    videos: [],
    total: null,
};

export const shortsListBase = selfPsychVideosBase as VideoShortsList;
