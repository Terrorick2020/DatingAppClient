import { type JSX, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toNotFoud } from '@/config/routes.config';
import { resetTargetPsychVideo } from '@/store/slices/videosSlice';
import { warningAlert } from '@/funcs/alert.funcs';
import { URL_MARK } from '@/config/env.config';
import { useSelector } from 'react-redux';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import PsychAddVideoMain from './Main';
import PsychAddVideoFooter from './Footer';


const PsychAddVideoContent = (): JSX.Element => {
    const isLoad = useSelector((state: IState) => state.settings.load);

    const [loadVideo, setLoadVideo] = useState<boolean>(false);

    const needReset = useRef<boolean>(false);

    const dispatch = useDispatch<RootDispatch>(); 
    const navigate = useNavigate();   
    const params = useParams();

    const id = params[URL_MARK];

    const setNeedReset = (value: boolean): void => {
        needReset.current = value;
    };

    useEffect(() => {
        return () => { dispatch(resetTargetPsychVideo()) };
    }, []);

    if(!id) {
        warningAlert( dispatch, 'Не удалось получить информацию о видео' );
        navigate(toNotFoud);

        return ( <></> );
    };

    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    );

    return (
        <div className="psych-add-video__ctx">
            <PsychAddVideoMain id={id} />
            <PsychAddVideoFooter />
        </div>
    );
};

export default PsychAddVideoContent;
