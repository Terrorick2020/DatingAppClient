import { appRoutes } from '@/config/routes.config';
import { useSelector } from 'react-redux';
import { ageToStr } from '@/funcs/general.funcs';
import { type IState } from '@/types/store.types';

import ListBlock from '@/components/UI/ListBlock';
import Timer from '@/components/UI/Timer';


const ChatsList = () => {
    const chatsList = useSelector((state: IState) => state.chats.chatsList);

    return (
        <>
            <div className="list">
                {chatsList.map(item =>(
                    <ListBlock
                        img={item.avatar}
                        route={appRoutes.targetChat.replace(':id', `${item.id}`)}
                        key={`chats-list-item-${item.id}`}
                    >
                        <div className="inner">
                            <div className="inner__text">
                                <h6 className="headline">
                                    {`${item.name}, ${ageToStr(item.age)}`}
                                </h6>
                                <p className="msg">{item.lastMsg}</p>
                            </div>
                            <div className="inner__trigger">
                                <span className="label">
                                    <Timer value={item.timer} isCritical={item.timer.length < 6} />
                                    {item.unreadMsgsCount}
                                </span>
                            </div>
                        </div>
                    </ListBlock>
                ))}
            </div>
        </>
    )
}

export default ChatsList;
