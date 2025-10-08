import { type JSX, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getTargetPsychVideoAsync } from '@/store/slices/videosSlice';
import { toNotFoud } from '@/config/routes.config';
import { PSYCH_VIDEO_ADD_MARK } from '@/constant/quest';
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

    const [id, setId] = useState<string>('');

    const dispatch = useDispatch<RootDispatch>(); 
    const navigate = useNavigate();   
    const params = useParams();

    const mark = params[URL_MARK];

    useEffect(() => {
        if(mark && mark !== PSYCH_VIDEO_ADD_MARK) {
            dispatch(getTargetPsychVideoAsync(+mark));
        };

        setId(mark || '');

        return () => { dispatch(resetTargetPsychVideo()) };
    }, []);

    if(!mark) {
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
            <PsychAddVideoFooter id={id} setId={setId} />
        </div>
    );
};

export default PsychAddVideoContent;
