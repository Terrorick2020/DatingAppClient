import { JSX } from 'react';
import { URL_MARK } from '@/config/env.config';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toNotFoud } from '@/config/routes.config';
import { warningAlert } from '@/funcs/alert.funcs';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import VideoInfoContentMain from './Main';
import VideoInfoContentFooter from './Footer';


const VideoInfoContent = (): JSX.Element => {
    const isLoad = useSelector((state: IState) => state.settings.load);

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();
    const params   = useParams();

    const id = params[URL_MARK];

    if(id === undefined || !id) {
        warningAlert( dispatch, 'Не удалось получить информацию о видео' );
        navigate(toNotFoud);

        return (<></>);
    };

    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    );

    return (
        <div className="video-info__ctx">
            <VideoInfoContentMain />
            <VideoInfoContentFooter />
        </div>
    )
};

export default VideoInfoContent;
