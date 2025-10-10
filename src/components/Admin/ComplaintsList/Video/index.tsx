import { JSX } from 'react';
import { EAnimeDirection } from '@/types/settings.type';
import { ANIME_DURATION } from '@/constant/settings';
import { Slide } from 'react-awesome-reveal';

import VideosListCtxItem from './Item';


const VideosList = (): JSX.Element => {
    return (
        <Slide
            triggerOnce
            direction={EAnimeDirection.Left}
            duration={ANIME_DURATION}
        >
            <VideosListCtxItem />
            <VideosListCtxItem />
            <VideosListCtxItem />
        </Slide>
    )
};

export default VideosList;
