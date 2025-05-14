import { JSX, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { type IState } from '@/types/store.types';

import ChatDay from './Day';


const ChatList = (): JSX.Element => {
    const chatDialog = useSelector((state: IState) => state.chats.targetChat.chatDialog);
    const selfId = useSelector((state: IState) => state.profile.info.id);

    const msgsEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            msgsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    }, [chatDialog]);

    return (
        <>
            <div className="chat-list">
                {chatDialog.map(item => (
                    <ChatDay
                        id={item.id}
                        selfId={selfId}
                        key={`day-${item.id}`}
                        day={item.day}
                        dayListMsg={item.dayListMsg}
                    />
                ))}
                <div ref={msgsEndRef} />
            </div>
        </>
    )
}

export default ChatList;
