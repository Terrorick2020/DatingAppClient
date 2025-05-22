import { JSX, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { type IState } from '@/types/store.types';

import ChatDay from './Day';


const selectChats = (state: IState) => state.chats;
const selectProfile = (state: IState) => state.profile;

const selectChatList = createSelector(
    [selectChats, selectProfile],
    (chats, profile) => ({
      chatDialog: chats.targetChat.chatDialog,
      selfId: profile.info.id,
    })
);

const ChatList = (): JSX.Element => {
    const { chatDialog, selfId } = useSelector(selectChatList);

    const msgsEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            msgsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    }, [chatDialog]);

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
