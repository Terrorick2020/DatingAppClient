import { JSX, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toSlider } from '@/config/routes.config';
import { initChatsCtxAsync } from '@/store/slices/chatsSlice';
import { resetBadge } from '@/store/slices/settingsSlice';
import { EBadgeType } from '@/types/settings.type';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import ChatsList from './List';
import MyLoader from '@/components/UI/MyLoader';
import Button from '@mui/material/Button';
import SvgChatsEmpty from '@/assets/icon/chats-empty.svg';


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

            dispatch(resetBadge(EBadgeType.Chats));
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
            <img src={SvgChatsEmpty} alt="chats-empty" />
            <h4 className="headline">Нет чатов</h4>
            <p className="text">
                После взаимного мэтча чат с пользователем автоматически появится в списке.
                Продолжайте
            </p>
            <NavLink className="link" to={ toSlider }>
                <Button variant="contained">К анкетам</Button>
            </NavLink>
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
