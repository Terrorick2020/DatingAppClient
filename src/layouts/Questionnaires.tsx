import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import type { IState } from '@/types/store.types';

import QuestMatch from '@/components/Layouts/QuestMatch';
import QuestNavBar from '@/components/Layouts/QuestNavBar';
import SAPlansTimeout from '@/components/Layouts/PlansTimeout';


const QuestLayout = () => {
    const [isMatch, isCurrent] = useSelector(
        (state: IState) => [
            state.likes.match.value,
            state.profile.eveningPlans.isCurrent,
        ]
    );

    const snackbarKeyRef = useRef<string | number | null>(null);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const showSnackPlanTimeout = () => {
        const key = enqueueSnackbar('', {
            autoHideDuration: null,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
            content: (key: string | number) => <SAPlansTimeout key={key} />
        })

        return key;
    }

    useEffect(
        () => {
            if(!isCurrent && !snackbarKeyRef.current) {
                const key = showSnackPlanTimeout();
                snackbarKeyRef.current = key;
            } else if(isCurrent && snackbarKeyRef.current) {
                closeSnackbar(snackbarKeyRef.current);
                snackbarKeyRef.current = null;
            }
        },
        [isCurrent]
    );

    return (
        <>
            <div className="quest-layout">
                { isMatch && <QuestMatch /> }
                <div className="quest-outlet">
                    <Outlet />
                </div>
                <QuestNavBar />
            </div>
        </>
    )
}

export default QuestLayout;
