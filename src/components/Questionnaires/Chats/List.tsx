import { appRoutes } from '@/config/routes.config';
import { useSelector } from 'react-redux';
import { type IState } from '@/types/store.types';

import ListBlock from '@/components/UI/ListBlock';
import ChatsListItem from './ChatsItem';


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
                        <ChatsListItem item={item}/>
                    </ListBlock>
                ))}
            </div>
        </>
    )
}

export default ChatsList;
