import { formatDateToUser } from '@/funcs/general.funcs';
import { type TargetChatDayMsg } from '@/types/chats.types';

import ChatMsg from './Msg';


interface PropsChatDay {
    id: number
    selfId: string
    day: string
    dayListMsg: TargetChatDayMsg[]
}
const ChatDay = (props: PropsChatDay) => {
    return (
        <>
            <div className="day">
                <div className="day__panel">
                    <span className="label">{ formatDateToUser( props.day ) }</span>
                </div>
                <div className="day__ctx">
                    {props.dayListMsg.map(item => (
                        <ChatMsg
                            id={item.id}
                            key={`msg-${item.id}`}
                            isSelf={item.to === props.selfId}
                            msg={item.msg}
                            time={item.time}
                            isChecked={item.isChecked}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default ChatDay;
