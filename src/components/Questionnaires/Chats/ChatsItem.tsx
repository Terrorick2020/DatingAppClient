import { JSX, memo, useState, useEffect } from 'react';
import { deleteChatById } from '@/store/slices/chatsSlice';
import { formatTimeLeftOther } from '@/funcs/general.funcs';
import type { PropsChatsListItem } from '@/types/chats.types';

import Timer from '@/components/UI/Timer';


const ChatsListItem = memo((props: PropsChatsListItem): JSX.Element => {
    const [timeLeft, setTimeLeft] = useState<number>(props.item.timer);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }

                return prevTime - 1;
            });
        }, 1000);
    
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if(timeLeft === 0) {
            deleteChatById(props.item.id);
        }
    }, [timeLeft]);

    return (
        <div className="inner">
            <div className="inner__text">
                <h6 className="headline">
                    {`${props.item.name}, ${props.item.age}`}
                </h6>
                <p className="msg">{props.item.lastMsg}</p>
            </div>
            <div className="inner__trigger">
                <span className={`label ${props.item.unreadMsgsCount ? '' : 'null'}`}>
                    <Timer
                        value={formatTimeLeftOther(timeLeft, true)}
                        isCritical={timeLeft < 60 * 60}
                    />
                    {props.item.unreadMsgsCount}
                </span>
            </div>
        </div>
    )
})

export default ChatsListItem;
