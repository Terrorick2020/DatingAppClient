import { JSX, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPsycByIdhAsync } from '@/store/slices/psychSlice';
import { selectSelfPsychAsync } from '@/store/slices/profileSlice';
import { useSelector, useDispatch } from 'react-redux';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import Button from '@mui/material/Button';
import PsychologistCtx from './Ctx';


const PsychologistContent = (): JSX.Element => {
    const isLoad = useSelector((state: IState) => state.settings.load);

    const [isSelLoad, setIsSelLoad] = useState<boolean>(false);

    const { id } = useParams();
    const dispatch = useDispatch<RootDispatch>();

    if(id === undefined) return (<></>);

    useEffect(
        () => {
            const psychHtml = document.getElementById('target-psych');
            if ( psychHtml ) psychHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';

            id && dispatch(getPsycByIdhAsync(id));
        },
        []
    );

    const selectSelfPsych = async (): Promise<void> => {
        setIsSelLoad(true);

        await dispatch(selectSelfPsychAsync(id));

        setIsSelLoad(false);
    };

    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    );

    return (
        <>
            <div className="target-psych__ctx">
                <PsychologistCtx />
            </div>
            <div className="target-psych__btn">
                <Button
                    fullWidth
                    variant="contained"
                    loadingPosition="start"
                    loading={isSelLoad}
                    onClick={selectSelfPsych}
                >
                    { isSelLoad ? 'Загрузка...' : 'Выбрать специалиста'}
                </Button>
            </div>       
        </>
    )
}

export default PsychologistContent;
