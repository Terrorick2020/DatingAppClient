import { JSX, memo } from 'react';
import { formatDateToUser } from '@/funcs/general.funcs';
import type { PropsChatDay } from '@/types/chats.types';

import ChatMsg from './Msg';


const ChatDay = memo((props: PropsChatDay): JSX.Element => {
    return (
        <div className="day">
            <div className="day__panel">
                <span className="label">{ formatDateToUser( props.day ) }</span>
            </div>
            <div className="day__ctx">
                {props.dayListMsg.map(item => (
                    <ChatMsg
                        id={item.id}
                        key={`msg-${item.id}`}
                        isSelf={item.from === props.selfId}
                        msg={item.msg}
                        time={item.time}
                        isChecked={item.isChecked}
                    />
                ))}
            </div>
        </div>
    )
})

export default ChatDay;
