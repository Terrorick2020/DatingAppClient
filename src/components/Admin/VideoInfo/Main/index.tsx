import { type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { warningAlert } from '@/funcs/alert.funcs';
import { toNotFoud } from '@/config/routes.config';
import { useDispatch, useSelector } from 'react-redux';
import type { IState } from '@/types/store.types';
import type { RootDispatch } from '@/store';

import PlayerBtn from '@/components/UI/PlayerBtn';
import VideoInfoContentMainInfo from './Info';


const VideoInfoContentMain = (): JSX.Element => {
    const targetVideo = useSelector((state: IState) => state.admin.targetVideo);

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();

    if(!targetVideo) {
        warningAlert( dispatch, 'Не удалось получить информацию о видео' );
        navigate(toNotFoud);

        return (<></>);
    };

    return (
        <main className="video-info-main">
            <div className="player-block">
                <PlayerBtn
                    urlImg={targetVideo.previewUrl}
                    urlVideo={targetVideo.url}
                />
            </div>
            <div className='text'>
                <h5 className="sub-headline">{targetVideo.title}</h5>
            </div>
            <VideoInfoContentMainInfo
                id={targetVideo.psychologist.id}
                url={targetVideo.psychologist.photoUrl}
                name={targetVideo.psychologist.name}
                date={targetVideo.createdAt}
                isPublished={targetVideo.isPublished}
            />
        </main>
    );
};

export default VideoInfoContentMain;
