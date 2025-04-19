import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPsycByIdhAsync } from '@/store/slices/psychSlice';
import { useSelector, useDispatch } from 'react-redux';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import Button from '@mui/material/Button';
import PsychologistCtx from './Ctx';


const PsychologistContent = () => {
    const isLoad = useSelector((state: IState) => state.settings.load);

    const { id } = useParams();
    const dispatch = useDispatch<RootDispatch>();

    useEffect(
        () => {
            const psychHtml = document.getElementById('target-psych');
            if ( psychHtml ) psychHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';

            id && dispatch(getPsycByIdhAsync(id));
        },
        []
    )

    return (
        <>
            {
                isLoad
                    ?
                    <div className="loader">
                        <MyLoader />
                    </div>
                    :
                    <>
                        <div className="target-psych__ctx">
                            <PsychologistCtx />
                        </div>
                        <div className="target-psych__btn">
                            <Button variant="contained">Выбрать специалиста</Button>
                        </div>       
                    </>
            }
        </>
    )
}

export default PsychologistContent;
