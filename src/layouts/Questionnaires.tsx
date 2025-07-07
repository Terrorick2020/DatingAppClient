import {
    LikesCltMethods,
    MatchCltMethods,
    MsgsCltOnMeths,
    type OnResNewLike,
    type OnResNewMatch,
    type OnResNewMsg,
} from '@/types/socket.types';

import {
    handleSocket,
    getNamespaceSocket,
    waitForSocketConnection
} from '@/config/socket.config';

import {
    getMatchDataAsync,
    addLikeInRealTimeAsync,
    getUnreadLikesAsync,
} from '@/store/slices/likesSlice';

import { JSX, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { toLikes, toChats } from '@/config/routes.config';
import { createSelector } from 'reselect';
import { WS_LIKES, WS_MATCH, WS_MSGS } from '@/config/env.config';
import { getUnreadChatsAsync, socketNewMsgInToChats } from '@/store/slices/chatsSlice';
import { setBadge, setLikeTypeBtn } from '@/store/slices/settingsSlice';
import { ELikeBtnType } from '@/types/settings.type';
import type { Socket } from 'socket.io-client';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import QuestMatch from '@/components/Layouts/QuestMatch';
import QuestNavBar from '@/components/Layouts/QuestNavBar';
import SAPlansTimeout from '@/components/Layouts/PlansTimeout';


const selectSettings = (state: IState) => state.settings;
const selectProfile = (state: IState) => state.profile;
const selectLikes = (state: IState) => state.likes;

const selectQuestState = createSelector(
    [selectSettings, selectProfile, selectLikes],
    (settings, profile, likes) => ({
      isCurrent: profile.eveningPlans.isCurrent,
      badgeCtx: settings.badge,
      match: likes.match,
    })
);

const QuestLayout = (): JSX.Element => {
    const { isCurrent, badgeCtx, match } = useSelector(selectQuestState);

    const dispatch = useDispatch<RootDispatch>();
    const location = useLocation();

    const snackbarKeyRef = useRef<string | number | null>(null);
    const isMatchLoad = useRef<boolean>(false);
    const lastLikeId = useRef<string>('');
    const unreadedChats = useRef<string[]>([]);
    const pathname = useRef<string>(location.pathname);

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

    useEffect(() => {
        if(!isCurrent && !snackbarKeyRef.current) {
            const key = showSnackPlanTimeout();
            snackbarKeyRef.current = key;
        } else if(isCurrent && snackbarKeyRef.current) {
            closeSnackbar(snackbarKeyRef.current);
            snackbarKeyRef.current = null;
        }
    }, [isCurrent]);

    useEffect(() => {
        pathname.current = location.pathname;
    }, [location.pathname]);

    const handleLikesNotify = (data: OnResNewLike | null): void => {
        if(!data || lastLikeId.current == data.fromUserId) return;

        lastLikeId.current = data.fromUserId;

        if(pathname.current === toLikes) {
            
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

    const handleMatchNotify = async (data: OnResNewMatch | null): Promise<void> => {
        if(!data) return;

        if(pathname.current !== toChats) {
            dispatch(setBadge({
                ...badgeCtx,
                chats: {
                    value: true,
                    content: badgeCtx.chats.content + 1,
                }
            }));
        };

        if(match.value || isMatchLoad.current) return;

        isMatchLoad.current = true;

        await dispatch(getMatchDataAsync(data));

        isMatchLoad.current = false;
    };

    const handleNewMsgNotify = async (data: OnResNewMsg | null): Promise<void> => {
        if(!data) return;

        if(pathname.current === toChats) {
            await dispatch(socketNewMsgInToChats(data));
        };

        if (unreadedChats.current.includes(data.chatId)) return;

        dispatch(setBadge({
            ...badgeCtx,
            chats: {
                value: true,
                content: badgeCtx.likes.content + 1,
            }
        }));

        unreadedChats.current.push(data.chatId);
    };

    const handleSocketSeed = async (): Promise<void> => {
        let likeSocket: Socket | undefined = undefined;
        let matchSocket: Socket | undefined = undefined;
        let msgsSocket: Socket | undefined = undefined;

        likeSocket = getNamespaceSocket(WS_LIKES);
        matchSocket = getNamespaceSocket(WS_MATCH);
        msgsSocket = getNamespaceSocket(WS_MSGS);

        if (
            likeSocket === undefined  ||
            matchSocket === undefined ||
            msgsSocket === undefined
        ) {
            const response = await Promise.all([
                waitForSocketConnection(() => getNamespaceSocket(WS_LIKES)),
                waitForSocketConnection(() => getNamespaceSocket(WS_MATCH)),
                waitForSocketConnection(() => getNamespaceSocket(WS_MSGS)),
            ]);

            likeSocket = response[0];
            matchSocket = response[1];
            msgsSocket = response[2];
        };

        handleSocket<OnResNewLike>(likeSocket, LikesCltMethods.newLike, handleLikesNotify);
        handleSocket<OnResNewMatch>(matchSocket, MatchCltMethods.newMatch, handleMatchNotify);
        handleSocket<OnResNewMsg>(msgsSocket, MsgsCltOnMeths.newMessage, handleNewMsgNotify);
    };

    const handleUnreadChats = async (): Promise<void> => {
        const response = await dispatch(getUnreadChatsAsync()).unwrap();

        if(response && response !== 'error' && Array.isArray(response)) {
            unreadedChats.current = response;
        }

        await dispatch(getUnreadLikesAsync());
    };

    useEffect(() => {
        dispatch(setLikeTypeBtn(ELikeBtnType.Accepted));
        
        handleUnreadChats();
        handleSocketSeed();

        return () => {
            const likeSocket = getNamespaceSocket(WS_LIKES);
            const matchSocket = getNamespaceSocket(WS_MATCH);
            const msgsSocket = getNamespaceSocket(WS_MSGS);

            likeSocket?.off(LikesCltMethods.newLike);
            matchSocket?.off(MatchCltMethods.newMatch);
            msgsSocket?.off(MsgsCltOnMeths.newMessage);

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
