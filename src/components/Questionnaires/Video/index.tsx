import { JSX, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initPsychVideosListAsync } from '@/store/slices/questionnairesSlice';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import VideoMain from './Main';
import VideoAddBtn from './AddBtn';


const VideoContent = (): JSX.Element => {
    const isLoad = useSelector((state: IState) => state.settings.load);

    const dispatch = useDispatch<RootDispatch>();

    useEffect(() => {
        const logoHeader = document.getElementById('logo-header');
        if( logoHeader ) logoHeader.style.display = 'flex';

        dispatch(initPsychVideosListAsync());
    }, []);

    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    );

    return (
        <div className="video-page__ctx">
            <h4 className="headline">Мои видео</h4>
            <VideoMain />
            <VideoAddBtn />
        </div>
    )
};

export default VideoContent;
