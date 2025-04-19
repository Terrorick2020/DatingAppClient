import { useSelector } from 'react-redux';
import { type IState } from '@/types/store.types';

import ChatDay from './Day';


const ChatList = () => {
    const chatDialog = useSelector((state: IState) => state.chats.targetChat.chatDialog);
    const selfId = useSelector((state: IState) => state.profile.info.id);

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
            </div>
        </>
    )
}

export default ChatList;
