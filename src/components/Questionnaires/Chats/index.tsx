import { JSX, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initChatsCtxAsync } from '@/store/slices/chatsSlice';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import ChatsList from './List';
import MyLoader from '@/components/UI/MyLoader';


const ChatsContent = (): JSX.Element => {
    const isLoad = useSelector((state: IState) => state.settings.load);
    const chatsListLen = useSelector((state: IState) => state.chats.chatsList.length);

    const dispatch = useDispatch<RootDispatch>();
    
    useEffect(
        () => {
            const chatsHtml = document.getElementById('chats');
            if ( chatsHtml ) chatsHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';

            dispatch(initChatsCtxAsync());
        },
        []
    )

    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    )

    if(!chatsListLen) return (
        <div className="empty">
            <h4 className="headline">
                У Вас пока нет чатов. <br/>
                Отправляйте симпатии, чтобы это исправить
            </h4>
        </div>
    )

    return (
        <>
            <div className="chats__head">
                <h4 className="headline">Чаты</h4>
            </div>
            <div className="chats__ctx">
                <div className="shadow"></div>
                <ChatsList />
            </div>
        </>
    )
}

export default ChatsContent;
