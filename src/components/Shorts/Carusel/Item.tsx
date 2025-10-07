import { JSX, useState, useEffect } from 'react';
import { CARUSEL_ANIME_MS } from '@/constant/quest';
import { EShortsCaruselKey } from '@/types/quest.types';

import MyPlayer from '@/components/UI/Player';
import ShortsCtxCaruselChildren from './Children';


interface ShortsItem {
    previewUrl: string
    videoUrl: string
}

interface PropsShortsCtxCaruselItem {
    indx: number
    selfIndx: number
    item: ShortsItem
    keyCode: EShortsCaruselKey | null
    setKeyKode: (value: EShortsCaruselKey | null) => void
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

    useEffect(() => {
        if(props.indx !== props.selfIndx || !props.keyCode) return;

        if(props.keyCode === EShortsCaruselKey.Space) {
            setPlaying(prev => !prev);
        };

        props.setKeyKode(null);
    }, [props.keyCode]);

    return (
        <div className="shorts-carusel-slide" id={`shorts-carusel-slide`} >
            <MyPlayer
                previewUrl={props.item.previewUrl}
                videoUrl={props.item.videoUrl}
                playing={playing}
                timeToStart={timeToStart}
                setPlaying={setPlaying}
            >
                <ShortsCtxCaruselChildren />
            </MyPlayer>
        </div>
    );
};

export default ShortsCtxCaruselItem;
