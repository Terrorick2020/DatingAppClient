import { JSX, memo, useState, useEffect } from 'react';
import { formatTimeLeftOther } from '@/funcs/general.funcs';
import type { PropsChatsHeaderItem } from '@/types/chats.types';

import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';


const initialTimeInSeconds = 24 * 60 * 60;

const ChatsHeaderItem = memo((props: PropsChatsHeaderItem): JSX.Element => {
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
        <Badge
            className="item"
            key={`fav-hist-${props.item.id}`}
            badgeContent={formatTimeLeftOther(timeLeft)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            onClick={() => props.toChat(props.item.id)}
        >
            <Avatar
                alt="chat-head-avatar"
                src={props.item.avatar}
            />
        </Badge>
    )
})

export default ChatsHeaderItem;
