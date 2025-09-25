import { JSX, useState, useEffect } from 'react';
import { CARUSEL_ANIME_MS } from '@/constant/quest';

import MyPlayer from '@/components/UI/Player';


interface ShortsItem {
    previewUrl: string
    videoUrl: string
}

interface PropsShortsCtxCaruselItem {
    indx: number
    selfIndx: number
    item: ShortsItem
}

const ShortsCtxCaruselItem = (props: PropsShortsCtxCaruselItem): JSX.Element => {
    const [playing, setPlaying] = useState<boolean>(true);
    const [timeToStart, setTimeToStart] = useState<boolean>(false);

    useEffect(() => {
        const isTarget = props.indx === props.selfIndx;

        if(isTarget) {
            setTimeout(() => {
                setPlaying(true);

                if(!timeToStart) setTimeToStart(true);
            }, CARUSEL_ANIME_MS);
        } else {
            setPlaying(false);
        };
    }, [props.indx]);

    return (
        <MyPlayer
            previewUrl={props.item.previewUrl}
            videoUrl={props.item.videoUrl}
            playing={playing}
            timeToStart={timeToStart}
            setPlaying={setPlaying}
        />
    );
};

export default ShortsCtxCaruselItem;
