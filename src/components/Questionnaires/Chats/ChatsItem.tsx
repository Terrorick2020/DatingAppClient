import { useState, useEffect } from 'react';
import { ageToStr, formatTimeLeftOther } from '@/funcs/general.funcs';
import type { ChatsListItem } from '@/types/chats.types';

import Timer from '@/components/UI/Timer';


const initialTimeInSeconds = 24 * 60 * 60;

interface PropsChatsListItem {
    item: ChatsListItem
}
const ChatsListItem = (props: PropsChatsListItem) => {
    const [timeLeft, setTimeLeft] = useState<number>(initialTimeInSeconds);

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

    return (
        <>
            <div className="inner">
                <div className="inner__text">
                    <h6 className="headline">
                        {`${props.item.name}, ${ageToStr(props.item.age)}`}
                    </h6>
                    <p className="msg">{props.item.lastMsg}</p>
                </div>
                <div className="inner__trigger">
                    <span className="label">
                        <Timer
                            value={formatTimeLeftOther(timeLeft, true)}
                            isCritical={timeLeft < 60 * 60}
                        />
                        {props.item.unreadMsgsCount}
                    </span>
                </div>
            </div>
        </>
    )
}

export default ChatsListItem;
