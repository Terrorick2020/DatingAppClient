import { JSX, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { WS_LIKES } from '@/config/env.config';
import { setBadge } from '@/store/slices/settingsSlice';
import { getNamespaceSocket, handleSocket } from '@/config/socket.config';
import { LikesCltMethods, type OnResNewLike } from '@/types/socket.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import QuestMatch from '@/components/Layouts/QuestMatch';
import QuestNavBar from '@/components/Layouts/QuestNavBar';
import SAPlansTimeout from '@/components/Layouts/PlansTimeout';


const QuestLayout = (): JSX.Element => {
    const isCurrent = useSelector((state: IState) => state.profile.eveningPlans.isCurrent);
    const badgeCtx = useSelector((state: IState) => state.settings.badge);

    const dispatch = useDispatch<RootDispatch>();

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

    const handleLikesNotify = (data: OnResNewLike | null): void => {
        if(!data) return;

        console.log(data);

        dispatch(setBadge({
            ...badgeCtx,
            likes: {
                value: true,
                content: badgeCtx.likes.content++,
            }
        }));
    };

    useEffect(() => {
        const likeSocket = getNamespaceSocket(WS_LIKES);

        handleSocket<OnResNewLike>(likeSocket, LikesCltMethods.newLike, handleLikesNotify);

        return () => {
            likeSocket?.off(LikesCltMethods.newLike);

            if (snackbarKeyRef.current) {
                closeSnackbar(snackbarKeyRef.current);
                snackbarKeyRef.current = null;
            };
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
