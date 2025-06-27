import {
    getChatByIdAsync,
    sendMsgAsync,
    setTypingStatAsync,
    socketAddMsgInChat,
    getMsgAsync,
    markedReadedMsgs,
} from '@/store/slices/chatsSlice';

import {
    connectToNamespace,
    disconnectFromNamespace,
    handleSocket,
    waitForSocketConnection,
    getNamespaceSocket,
} from '@/config/socket.config';

import {
    MsgsCltOnMeths,
    type OnResNewMsg,
    type OnResReadMsg,
} from '@/types/socket.types';

import { JSX, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { setLikeTypeBtn } from '@/store/slices/settingsSlice';
import { ELikeBtnType } from '@/types/settings.type';
import { useDispatch, useSelector } from 'react-redux';
import { WS_MSGS } from '@/config/env.config';
import type { Socket } from 'socket.io-client';
import type { IncomingMsg } from '@/types/chats.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import ChatHeader from './Header';
import ChatList from './List';
import ChatDialogSessionEnd from './DialogSessionEnd';
import ChatInput from '@/components/UI/ChatInput';
import MyLoader from '@/components/UI/MyLoader';


const ChatContent = (): JSX.Element => {
    const { id } = useParams();

    const isLoad = useSelector((state: IState) => state.settings.load);
    const seconds = useSelector((state: IState) => state.chats.targetChat.timer);

    const [_, setTimeLeft] = useState<number | null>(null);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    const [message, setMessage] = useState<string>('');
    const [end, setEnd] = useState<boolean>(false);

    const lastMsgId = useRef<string | null>(null);

    const dispatch = useDispatch<RootDispatch>();

    if ( !id ) return (<></>);

    useEffect( () => {
        dispatch(setLikeTypeBtn(ELikeBtnType.ToChat));

        connectToNamespace(WS_MSGS);

        return () => {
            disconnectFromNamespace(WS_MSGS);
            if (timerId) clearInterval(timerId);
        }
    }, [] );

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

    const handleInitCtx = async (): Promise<void> => {
        await dispatch(getChatByIdAsync(id)).unwrap();

        let msgsSocket: Socket | undefined = undefined;

        msgsSocket = getNamespaceSocket(WS_MSGS);

        if(msgsSocket === undefined) {
            msgsSocket = await waitForSocketConnection(() => getNamespaceSocket(WS_MSGS));
        }

        handleSocket<OnResNewMsg>(msgsSocket, MsgsCltOnMeths.newMessage, handleNewMessage);
        handleSocket<OnResReadMsg>(msgsSocket, MsgsCltOnMeths.messageRead, handleReadMsgs);
    };

    useEffect(() => {
        const chatHtml = document.getElementById('target-chat');
        if ( chatHtml ) chatHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

        const logoHeader = document.getElementById('logo-header');
        if( logoHeader ) logoHeader.style.display = 'flex';

        handleInitCtx();

        return () => {
            const msgsSocket = getNamespaceSocket(WS_MSGS);

            msgsSocket?.off(MsgsCltOnMeths.newMessage);
            msgsSocket?.off(MsgsCltOnMeths.messageRead);
        }
    }, [id]);

    useEffect(() => {
        if (typeof seconds !== 'number' || seconds <= 0) return;

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
            <div className="target-chat__ctx">
                <ChatList />
            </div>
            <footer className="target-chat__footer">
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
