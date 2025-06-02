import { JSX, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { connectToNamespace, disconnectFromNamespace } from '@/config/socket.config';
import { WS_MATCH, WS_LIKES, WS_CHATS } from '@/config/env.config';
import type { IState } from '@/types/store.types';

import QuestMatch from '@/components/Layouts/QuestMatch';
import QuestNavBar from '@/components/Layouts/QuestNavBar';
import SAPlansTimeout from '@/components/Layouts/PlansTimeout';


const QuestLayout = (): JSX.Element => {
    const isCurrent = useSelector((state: IState) => state.profile.eveningPlans.isCurrent);

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

    useEffect(() => {
        connectToNamespace(WS_MATCH);
        connectToNamespace(WS_CHATS);
        connectToNamespace(WS_LIKES);

        return () => {
            disconnectFromNamespace(WS_MATCH);
            disconnectFromNamespace(WS_CHATS);
            disconnectFromNamespace(WS_LIKES);

            if (snackbarKeyRef.current) {
                closeSnackbar(snackbarKeyRef.current);
                snackbarKeyRef.current = null;
            }
        };
    }, []);

    return (
        <>
            <QuestMatch />
            <div className="quest-layout">
                <div className="quest-outlet">
                    <Outlet />
                </div>
                <QuestNavBar />
            </div>
        </>
    )
}

export default QuestLayout;
