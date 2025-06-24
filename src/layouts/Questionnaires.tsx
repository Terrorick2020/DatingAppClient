import {
    LikesCltMethods,
    MatchCltMethods,
    type OnResNewLike,
    type OnResNewMatch,
} from '@/types/socket.types';

import { JSX, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { toLikes, toChats } from '@/config/routes.config';
import { WS_LIKES, WS_MATCH } from '@/config/env.config';
import { setBadge, setLikeTypeBtn } from '@/store/slices/settingsSlice';
import { ELikeBtnType } from '@/types/settings.type';
import { getMatchDataAsync, addLikeInRealTimeAsync } from '@/store/slices/likesSlice';
import { getNamespaceSocket, handleSocket, waitForSocketConnection } from '@/config/socket.config';
import type { Socket } from 'socket.io-client';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import QuestMatch from '@/components/Layouts/QuestMatch';
import QuestNavBar from '@/components/Layouts/QuestNavBar';
import SAPlansTimeout from '@/components/Layouts/PlansTimeout';


const QuestLayout = (): JSX.Element => {
    const isCurrent = useSelector((state: IState) => state.profile.eveningPlans.isCurrent);
    const badgeCtx = useSelector((state: IState) => state.settings.badge);
    const match = useSelector((state: IState) => state.likes.match);

    const dispatch = useDispatch<RootDispatch>();
    const location = useLocation();

    const snackbarKeyRef = useRef<string | number | null>(null);
    const isMatchLoad = useRef<boolean>(false);
    const lastLikeId = useRef<string>('');

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
        if(!data || lastLikeId.current == data.fromUserId) return;

        lastLikeId.current = data.fromUserId;

        if(location.pathname === toLikes) {
            
            dispatch(addLikeInRealTimeAsync(data));
        } else {
            dispatch(setBadge({
                ...badgeCtx,
                likes: {
                    value: true,
                    content: badgeCtx.likes.content + 1,
                }
            }));
        }
    };

    const handleMatchNotyfy = async (data: OnResNewMatch | null): Promise<void> => {
        if(!data) return;

        if(location.pathname !== toChats) {
            dispatch(setBadge({
                ...badgeCtx,
                chats: {
                    value: true,
                    content: badgeCtx.likes.content + 1,
                }
            }));
        };

        if(match.value || isMatchLoad.current) return;

        isMatchLoad.current = true;

        await dispatch(getMatchDataAsync(data));

        isMatchLoad.current = false;
    };

    const handleSocketSeed = async (): Promise<void> => {
        let likeSocket: Socket | undefined = undefined;
        let matchSocket: Socket | undefined = undefined;

        likeSocket = getNamespaceSocket(WS_LIKES);
        matchSocket = getNamespaceSocket(WS_MATCH);

        if (
            likeSocket === undefined ||
            matchSocket === undefined
        ) {
            const response = await Promise.all([
                waitForSocketConnection(() => getNamespaceSocket(WS_LIKES)),
                waitForSocketConnection(() => getNamespaceSocket(WS_MATCH)),
            ]);

            likeSocket = response[0];
            matchSocket = response[1];
        };

        handleSocket<OnResNewLike>(likeSocket, LikesCltMethods.newLike, handleLikesNotify);
        handleSocket<OnResNewMatch>(matchSocket, MatchCltMethods.newMatch, handleMatchNotyfy);
    };

    useEffect(() => {
        dispatch(setLikeTypeBtn(ELikeBtnType.Accepted));

        handleSocketSeed();

        return () => {
            const likeSocket = getNamespaceSocket(WS_LIKES);
            const matchSocket = getNamespaceSocket(WS_MATCH);

            likeSocket?.off(LikesCltMethods.newLike);
            matchSocket?.off(MatchCltMethods.newMatch);

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
