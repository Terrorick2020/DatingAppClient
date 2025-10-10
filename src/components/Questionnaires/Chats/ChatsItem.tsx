import { JSX, memo, useState, useEffect } from 'react';
import { deleteChatById } from '@/store/slices/chatsSlice';
import { formatTimeLeftOther } from '@/funcs/general.funcs';
import type { PropsChatsListItem } from '@/types/chats.types';

import Timer from '@/components/UI/Timer';


const ChatsListItem = memo((props: PropsChatsListItem): JSX.Element => {
    const [timeLeft, setTimeLeft] = useState<number>(props.item.timer);
    const [addClass, setAddClass] = useState<'' | 'null'>('');

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

    useEffect(() => {
        if(props.item.unreadMsgsCount === 0) {
            setAddClass('null');
        } else {
            setAddClass('');
        }
    }, [props.item.unreadMsgsCount]);

    return (
        <div className="inner">
            <div className="inner__text">
                <h6 className="headline">
                    {`${props.item.name} ${props.item.age ? ', ' + props.item.age : ''}`}
                </h6>
                <p className="msg">{props.item.lastMsg}</p>
            </div>
            <div className="inner__trigger">
                <span className={`label ${addClass}`}>
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
