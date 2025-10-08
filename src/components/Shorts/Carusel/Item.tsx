import { JSX, useState, useEffect } from 'react';
import { CARUSEL_ANIME_MS } from '@/constant/quest';
import { EShortsCaruselKey } from '@/types/quest.types';
import type { PropsShortsCtxCaruselItem } from '@/types/quest.types';

import MyPlayer from '@/components/UI/Player';
import ShortsCtxCaruselChildren from './Children';


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
                videoId={props.item.id}
                previewUrl={props.item.previewUrl}
                videoUrl={props.item.url}
                playing={playing}
                isViewed={props.item.isViewed}
                isLiked={props.item.isLiked}
                timeToStart={timeToStart}
                setPlaying={setPlaying}
            >
                <ShortsCtxCaruselChildren
                    id={props.item.psychologist.id}
                    videoId={props.item.id}
                    avatar={props.item.psychologist.photoUrl}
                    name={props.item.psychologist.name}
                    text={props.item.title}
                    uptAt={props.item.updatedAt}
                    isLiked={props.item.isLiked}
                />
            </MyPlayer>
        </div>
    );
};

export default ShortsCtxCaruselItem;
