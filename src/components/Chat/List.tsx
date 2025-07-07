import { JSX, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import type { PropsTargetChatList } from '@/types/chats.types';
import type { IState } from '@/types/store.types';

import ChatDay from './Day';
import PngChatEmpty from '@/assets/img/chat-empty.png';


const selectChats = (state: IState) => state.chats;
const selectProfile = (state: IState) => state.profile;

const selectChatList = createSelector(
    [selectChats, selectProfile],
    (chats, profile) => ({
      chatDialog: chats.targetChat.chatDialog,
      selfId: profile.info.id,
    })
);

const ChatList = (props: PropsTargetChatList): JSX.Element => {
    const { chatDialog, selfId } = useSelector(selectChatList);

    const msgsEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        msgsEndRef.current?.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
            props.setIsFirstly(false);
        }, 1000);
    }, [chatDialog]);

    if(!chatDialog.length) return (
        <div className="empty">
            <img
                alt="chat-empty"
                loading="lazy"
                decoding="async"
                src={PngChatEmpty}
            />
            <h4 className="headline">Сообщений пока нет...</h4>
            <p className="text">Отправьте первое сообщение!</p>
        </div>
    )

    return (
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
    )
}

export default ChatList;
