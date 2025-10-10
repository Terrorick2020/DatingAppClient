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


const selectSettings = (state: IState) => state.settings;

const selectShorts = createSelector(
    [selectSettings],
    (settings) => ({
      isLoad: settings.load,
    })
);

const ShortsContent = (): JSX.Element => {
    const { isLoad } = useSelector(selectShorts);

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
