import { JSX, useEffect, useState } from 'react';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import type { IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import ShortsBackDrop from './BackDrop';
import ShortsCtxCarusel from './Carusel';
import { delay } from '@/funcs/general.funcs';


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

    const showBackDrop = async (): Promise<void> => {
        await delay(10);

        setOpen(true);
    };

    useEffect(() => {
        showBackDrop();
    }, []);

    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    )

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
