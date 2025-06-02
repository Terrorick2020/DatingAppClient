import { JSX, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChatByIdAsync } from '@/store/slices/chatsSlice';
import { connectToNamespace, disconnectFromNamespace } from '@/config/socket.config';
import { WS_MSGS } from '@/config/env.config';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import ChatHeader from './Header';
import ChatList from './List';
import ChatDialogSessionEnd from './DialogSessionEnd';
import ChatInput from '@/components/UI/ChatInput';
import MyLoader from '@/components/UI/MyLoader';


const ChatContent = (): JSX.Element => {
    const { id } = useParams();

    const isLoad = useSelector((state: IState) => state.settings.load);

    const [message, setMessage] = useState<string>('');
    const [end, setEnd] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();

    if ( !id ) return (<></>);

    useEffect( () => {
        const chatHtml = document.getElementById('target-chat');
        if ( chatHtml ) chatHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

        const logoHeader = document.getElementById('logo-header');
        if( logoHeader ) logoHeader.style.display = 'flex';

        dispatch(getChatByIdAsync(id));
    }, [id] );

    useEffect( () => {
        connectToNamespace(WS_MSGS);

        return () => {
            disconnectFromNamespace(WS_MSGS);
        }
    }, [] );

    const handleChangeMsg = (newValue: string): void => {
        setMessage(newValue);
    }

    const handleSendMsg = async (): Promise<void> => {
        setMessage('');
    }

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
                    handleClick={handleSendMsg}
                />
            </footer>
            <ChatDialogSessionEnd open={end} setOpen={setEnd} />
        </>
    )
}

export default ChatContent;
