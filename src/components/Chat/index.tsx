import {
    getChatByIdAsync,
    getDopDialogMsgs,
    sendMsgAsync,
    setTypingStatAsync,
    socketAddMsgInChat,
    getMsgAsync,
    markedReadedMsgs,
    resetTargetChat,
} from '@/store/slices/chatsSlice';

import {
    handleSocket,
    waitForSocketConnection,
    getNamespaceSocket,
} from '@/config/socket.config';

import {
    MsgsCltOnMeths,
    ChtasCltMethods,
    type OnResNewMsg,
    type OnResReadMsg,
    type OnResChatDeleted,
} from '@/types/socket.types';

import {
    JSX,
    useEffect,
    useState,
    useRef,
    UIEvent,
    TouchEvent,
} from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { setLikeTypeBtn, dellRoute } from '@/store/slices/settingsSlice';
import { ELikeBtnType } from '@/types/settings.type';
import { initialQuery } from '@/constant/chats';
import { toChats, toNotFoud } from '@/config/routes.config';
import { infoAlert, warningAlert } from '@/funcs/alert.funcs';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { WS_MSGS, WS_CHATS } from '@/config/env.config';
import type { InitSliderData } from '@/types/quest.types';
import type { Socket } from 'socket.io-client';
import type { IncomingMsg, GetChatByIdArgs } from '@/types/chats.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import ChatHeader from './Header';
import ChatList from './List';
import ChatDialogSessionEnd from './DialogSessionEnd';
import ChatInput from '@/components/UI/ChatInput';
import MyLoader from '@/components/UI/MyLoader';
import IconButton from '@mui/joy/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CircularProgress from '@mui/material/CircularProgress';


const selectSettings = (state: IState) => state.settings;
const selectChats = (state: IState) => state.chats;

const selectTargetChat = createSelector(
    [selectSettings, selectChats],
    (settings, chats) => ({
        isLoad: settings.load,
        setRoutes: settings.routes,
        seconds: chats.targetChat.timer,
    })
);

const ChatContent = (): JSX.Element => {
    const { id } = useParams();

    const { isLoad, setRoutes, seconds } = useSelector(selectTargetChat);

    const [_, setTimeLeft] = useState<number | null>(null);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    const [message, setMessage] = useState<string>('');
    const [end, setEnd] = useState<boolean>(false);
    const [showDownBtn, setShowDownBtn] = useState<boolean>(false);
    const [dopLoad, setDopLoad] = useState<boolean>(false);
    const [spinnerSize, setSpinnerSize] = useState<number>(20); 

    const isFirstly = useRef<boolean>(true);
    const lastMsgId = useRef<string | null>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const loaderRef = useRef<HTMLDivElement>(null);
    const startYRef = useRef<number>(0);
    const isPulling = useRef<boolean>(false);
    const block = useRef<InitSliderData>(initialQuery);
    const isEnd = useRef<boolean>(false);
    const prevScrollTop = useRef<number>(0);

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();

    if ( !id ) {
        navigate(toNotFoud);

        return (<></>);
    }

    useEffect( () => {
        dispatch(setLikeTypeBtn(ELikeBtnType.ToChat));

        return () => {
            if (timerId) clearInterval(timerId);
            dispatch(resetTargetChat());
        }
    }, [] );

    const handleSetIsFirstly = (value: boolean): void => {
        isFirstly.current = value;
    };

    const handleNewMessage = async (data: OnResNewMsg | null) => {
        if(!data) return;

        if(data.messageId ===  lastMsgId.current) return;

        lastMsgId.current = data.messageId;

        const response = await dispatch(getMsgAsync(data)).unwrap();

        if (!response || response === 'error') {
            const newMsg: IncomingMsg = {
                chatId: data.chatId,
                fromUser: data.senderId,
                id: data.messageId,
                is_read: true,
                text: data.text,
                created_at: new Date().getTime(),
                updated_at: data.timestamp,
            }
            
            dispatch(socketAddMsgInChat(newMsg));
        }
    }

    const handleReadMsgs = (data: OnResReadMsg | null): void => {
        if(!data) return;

        dispatch(markedReadedMsgs(data));
    }

    const handleChatDeleted = async (data: OnResChatDeleted | null) => {
        if(!data) return;

        infoAlert(
            dispatch,
            'Чат был удалён Вашим собеседником',
        );

        const backRoute = setRoutes.at(-1);

        if(backRoute === undefined || !backRoute) {
            navigate(toChats);
        } else {
            navigate(backRoute);
        }

        dispatch(dellRoute());
    };

    const handleInitCtx = async (): Promise<void> => {
        const data: GetChatByIdArgs = {
            id,
            query: initialQuery,
        };

        const response = await dispatch(getChatByIdAsync(data)).unwrap();

        if(!response || response === 'error') {
            warningAlert(
                dispatch,
                'Не удалось загрузить чат! Попробуйте перезагрузить приложение'
            );

            navigate(toNotFoud);

            return;
        };

        let msgsSocket: Socket | undefined = undefined;
        let chatsSocket: Socket | undefined = undefined;

        msgsSocket = getNamespaceSocket(WS_MSGS);
        chatsSocket = getNamespaceSocket(WS_CHATS);

        if(
            msgsSocket === undefined ||
            chatsSocket === undefined
        ) {
            const socketRes = await Promise.all([
                waitForSocketConnection(() => getNamespaceSocket(WS_MSGS)),
                waitForSocketConnection(() => getNamespaceSocket(WS_CHATS)),
            ]);

            msgsSocket = socketRes[0];
            chatsSocket = socketRes[1];
        }

        handleSocket<OnResNewMsg>(msgsSocket, MsgsCltOnMeths.newMessage, handleNewMessage);
        handleSocket<OnResReadMsg>(msgsSocket, MsgsCltOnMeths.messageRead, handleReadMsgs);
        handleSocket<OnResChatDeleted>(chatsSocket, ChtasCltMethods.chatDeleted, handleChatDeleted);
    };

    useEffect(() => {
        const chatHtml = document.getElementById('target-chat');
        if ( chatHtml ) chatHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

        const logoHeader = document.getElementById('logo-header');
        if( logoHeader ) logoHeader.style.display = 'flex';

        handleInitCtx();

        return () => {
            const msgsSocket = getNamespaceSocket(WS_MSGS);
            const chatsSocket = getNamespaceSocket(WS_CHATS);

            msgsSocket?.off(MsgsCltOnMeths.newMessage);
            msgsSocket?.off(MsgsCltOnMeths.messageRead);
            chatsSocket?.off(ChtasCltMethods.chatDeleted);

            dispatch(resetTargetChat());

            handleSetIsFirstly(true);
        }
    }, [id]);

    useEffect(() => {
        if (typeof seconds !== 'number') return; 

        if(seconds <= 5) {
            setEnd(true);
            return;
        };

        setTimeLeft(seconds);

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime === null || prevTime <= 1) {
                    clearInterval(timer);
                    setEnd(true);
                    return 0;
                }

                return prevTime - 1;
            });
        }, 1000);

        setTimerId(timer);

        return () => clearInterval(timer);
    }, [seconds]);

    const handleChangeMsg = (newValue: string): void => {
        setMessage(newValue);
    }

    const handleSendMsg = async (): Promise<void> => {
        await dispatch(sendMsgAsync(message)).unwrap();
        setMessage('');
    };

    const handleFocus = async (): Promise<void> => {
        await dispatch(setTypingStatAsync(true));
    };

    const handleBlur = async (): Promise<void> => {
        await dispatch(setTypingStatAsync(false));
    };

    const handleDopLoad = async (): Promise<void> => {
        if(dopLoad || isEnd.current) return;

        setDopLoad(true);

        const container = chatRef.current;

        if (!container) {
            setDopLoad(false);
            return;
        };

        const previousScrollHeight = container.scrollHeight;
        const previousScrollTop = container.scrollTop;

        const newBlock = {
            limit: block.current.limit,
            offset: block.current.offset + 1,
        };

        const data: GetChatByIdArgs = {
            id,
            query: newBlock,
        };

        const response = await dispatch(getDopDialogMsgs(data)).unwrap();

        if(response && response !== 'error' && response !== 'None') {
            block.current = newBlock;

            requestAnimationFrame(() => {
                const newScrollHeight = container.scrollHeight;
                const diff = newScrollHeight - previousScrollHeight;

                container.scrollTop = previousScrollTop + diff;
            });
        };
        
        if (response === 'None') {
            isEnd.current = true;
        };

        setDopLoad(false);
    };

    const handleScroll = (event: UIEvent<HTMLDivElement>): void => {
        if(isFirstly.current) return;

        const target = event.currentTarget;
        const scrollTop = target.scrollTop;

        if (scrollTop <= 50) handleDopLoad();

        const clientHeight = target.clientHeight;
        const scrollHeight = target.scrollHeight;

        const isBottom = scrollTop + clientHeight >= scrollHeight - 25;
        const isScrollingDown = scrollTop > prevScrollTop.current;

        prevScrollTop.current = scrollTop;

        if (isBottom) {
            setShowDownBtn(false);
        } else if (isScrollingDown) {
            setShowDownBtn(true);
        } else {
            setShowDownBtn(false);
        }
    };

    const handleScrollDown = (): void => {
        const el = chatRef.current;

        if(!el) return;

        el.scrollTo({
            top: el.scrollHeight,
            behavior: 'smooth',
        });
    };

    const handleTouchStart = (e: TouchEvent) => {
        const container = chatRef.current;

        if(!container) return;

        if (container.scrollTop === 0) {
            startYRef.current = e.touches[0].clientY;
            isPulling.current = true;
        }
    };

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        if (!isPulling.current) return;

        const container = chatRef.current;

        if(!container) return;

        const currentY = e.touches[0].clientY;
        const diff = currentY - startYRef.current;

        if (diff > 0 && container.scrollTop <= 0) {
            const height = Math.min(diff, 100);

            if (loaderRef.current) {
                loaderRef.current.style.height = `${height}px`;
            };

            const size = 20 + Math.floor(height * 0.2);
            setSpinnerSize(size);
        }
    };

    const handleTouchEnd = () => {
        if (loaderRef.current) {
            loaderRef.current.style.height = '0px';
        };

        setSpinnerSize(20);
        isPulling.current = false;
    };

    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    )

    return (
        <>
            <header className="target-chat__header">
                <ChatHeader id={id} />
            </header>
            <div
                className="target-chat__ctx"
                ref={chatRef}
                onScroll={handleScroll}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                { 
                    dopLoad && <div className="loader-box" ref={loaderRef}>
                        <CircularProgress size={spinnerSize} />
                    </div>
                }
                <ChatList setIsFirstly={handleSetIsFirstly} />
            </div>
            <footer className="target-chat__footer">
                {
                    showDownBtn && <IconButton
                        className="chat-down"
                        onClick={handleScrollDown}
                    >
                        <KeyboardArrowDownIcon />
                    </IconButton>
                }
                <ChatInput
                    message={message}
                    handleChange={handleChangeMsg}
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                    handleClick={handleSendMsg}
                />
            </footer>
            <ChatDialogSessionEnd open={end} setOpen={setEnd} />
        </>
    )
}

export default ChatContent;
