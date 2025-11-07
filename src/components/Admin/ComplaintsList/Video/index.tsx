import { type JSX } from 'react';
import { useSelector } from 'react-redux';
import { EAnimeDirection } from '@/types/settings.type';
import { ANIME_DURATION } from '@/constant/settings';
import { Slide } from 'react-awesome-reveal';
import type { IState } from '@/types/store.types';

import VideosListCtxItem from './Item';


const VideosList = (): JSX.Element => {
    const videosList = useSelector((state: IState) => state.videos.shortsList);

    if(!videosList.videos.length) return (
        <div className="not-found">
            <h2 className="text">Ничего не найдено</h2>
        </div>
    );

    return (
        <Slide
            triggerOnce
            direction={ EAnimeDirection.Left }
            duration={ ANIME_DURATION }
            style={{ width: '100%' }}
        >
            {videosList.videos.map((item, index) => (
                <VideosListCtxItem
                    key={`video-list-ctx-${index}`}
                    item={item}
                />
            ))}
        </Slide>
    );
};

export default VideosList;
