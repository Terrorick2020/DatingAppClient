import { JSX, memo } from 'react';
import type { PropsChatMsg } from '@/types/chats.types';

import SvgCheckDoubleFill from '@/assets/icon/check-double-fill.svg?react';


const ChatMsg = memo((props: PropsChatMsg): JSX.Element => {
    return (
        <div className={`msg  ${props.isSelf && 'self'}`}>
            <div className="msg__ctx">
                <p className="text">{ props.msg }</p>
            </div>
            <div className="msg__label">
                <p className="time">{ props.time }</p>
                <SvgCheckDoubleFill className={props.isChecked ? 'checked' : undefined} />
            </div>
        </div>
    )
})

export default ChatMsg;
