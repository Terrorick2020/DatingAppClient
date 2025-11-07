import { type JSX, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialQuery } from '@/constant/chats';
import { getAdminShorrtsAsync } from '@/store/slices/videosSlice';
import { EAnimeDirection } from '@/types/settings.type';
import { ANIME_DURATION } from '@/constant/settings';
import { Slide } from 'react-awesome-reveal';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import VideosListCtxItem from './Item';


const VideosList = (): JSX.Element => {
    const videosList = useSelector((state: IState) => state.videos.shortsList);

    const initData = useRef<typeof initialQuery>(initialQuery);
    const isLoad = useRef<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();

    const handleDopLoad = async (index: number): Promise<void> => {
        if(
            isLoad.current ||
            !videosList.total ||
            videosList.total <= videosList.videos.length ||
            index + 3 < videosList.videos.length
        ) return;

        isLoad.current = true;

        
        const newData = {
            ...initData.current,
            offset: initData.current.offset + 1
        };

        const response = await dispatch(getAdminShorrtsAsync(newData)).unwrap();

        if(response && response !== 'error') {
            initData.current = newData;
        };

        isLoad.current = false;
    };

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
                    index={index}
                    dopLoad={handleDopLoad}
                />
            ))}
        </Slide>
    );
};

export default VideosList;
