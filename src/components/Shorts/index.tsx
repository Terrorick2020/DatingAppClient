import { JSX, useEffect, useState } from 'react';
import { createSelector } from 'reselect';
import { errorAlert } from '@/funcs/alert.funcs';
import { useNavigate } from 'react-router-dom';
import { toNotFoud } from '@/config/routes.config';
import { getShortsAsync } from '@/store/slices/videosSlice';
import { initialQuery } from '@/constant/chats';
import { useDispatch, useSelector } from 'react-redux';
import type { IState } from '@/types/store.types';
import type { RootDispatch } from '@/store';

import MyLoader from '@/components/UI/MyLoader';
import ShortsBackDrop from './BackDrop';
import ShortsCtxCarusel from './Carusel';
import SvgEmptyVideoPsych from '@/assets/icon/empty-psych-video.svg';


const selectSettings = (state: IState) => state.settings;
const selectVideos = (state: IState) => state.videos;

const selectShorts = createSelector(
    [selectSettings, selectVideos],
    (settings, videos) => ({
      isLoad: settings.load,
      videoTotal: videos.shortsList.total,
      shortsLen: videos.shortsList.videos.length,
    })
);

const ShortsContent = (): JSX.Element => {
    const { isLoad, videoTotal, shortsLen } = useSelector(selectShorts);

    const [open, setOpen] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();

    const showBackDrop = async (): Promise<void> => {
        const response = await dispatch(getShortsAsync(initialQuery)).unwrap();

        if(!response || response === 'error') {
            errorAlert(dispatch, 'Не удалось получить ленту новостей');
            navigate(toNotFoud);
        } else {
            setOpen(!response.isChecked);
        };
    };

    useEffect(() => {
        showBackDrop();
    }, []);

    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    );

    if(!videoTotal || !shortsLen) return (
        <div className="shorts__ctx">
            <div className="empty">
                <img
                    src={ SvgEmptyVideoPsych }
                    alt="quests-empty"
                    loading="lazy"
                    decoding="async"
                />
                <h4 className="headline">У нас пока нет видео для Вас</h4>
                <p className="text">
                    Скорее всего специалисты еще не подготовили их.
                    Попробуйсе вернуться сюда чуть позже.
                </p>
            </div>
        </div>
    );

    return (
        <div className="shorts__ctx">
            <ShortsCtxCarusel />
            <ShortsBackDrop
                open={open}
                setOpen={setOpen}
            />
        </div>
    );
};

export default ShortsContent;
