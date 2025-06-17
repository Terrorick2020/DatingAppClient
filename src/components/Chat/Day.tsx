import { JSX, memo } from 'react';
import { Slide } from 'react-awesome-reveal';
import { EAnimeDirection } from '@/types/settings.type';
import { ANIME_DURATION } from '@/constant/settings';
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
                    <Slide
                        triggerOnce
                        direction={
                            item.from === props.selfId
                                ? 
                                EAnimeDirection.Right 
                                : 
                                EAnimeDirection.Left
                        }
                        duration={ANIME_DURATION}
                        key={`msg-${item.id}`}
                    >
                        <ChatMsg
                            id={item.id}
                            isSelf={item.from === props.selfId}
                            msg={item.msg}
                            time={item.time}
                            isChecked={item.isChecked}
                        />
                    </Slide>
                ))}
            </div>
        </div>
    )
})

export default ChatDay;
