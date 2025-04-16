import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initPsychList } from '@/store/slices/psychologists';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import PsychHeader from './Header';
import PsychList from './List';


const PsychologistsContent = () => {
    const isLoad = useSelector((state: IState) => state.settings.load);

    const dispatch = useDispatch<RootDispatch>();

    useEffect(
        () => {
            const psychHtml = document.getElementById('psychologists');
            if ( psychHtml ) psychHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';

            dispatch(initPsychList());
        },
        []
    )

    return (
        <>
            <div className="psychologists__header">
                <PsychHeader />
            </div>
            <div className="psychologists__ctx">
                {
                    isLoad
                        ?
                        <div className="loader">
                            <MyLoader />
                        </div>
                        :
                        <PsychList />
                }
            </div>
        </>
    )
}

export default PsychologistsContent;
