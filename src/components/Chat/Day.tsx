import { type PropsChatMsg } from './Msg';

import ChatMsg from './Msg';


interface PropsChatDay {
    id: number
    day: string
    dayListMsg: PropsChatMsg[]
}
const ChatDay = (props: PropsChatDay) => {
    return (
        <>
            <div className="day">
                <div className="day__panel">
                    <span className="label">{ props.day }</span>
                </div>
                <div className="day__ctx">
                    {props.dayListMsg.map(item => (
                        <ChatMsg
                            id={item.id}
                            isSelf={item.isSelf}
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
