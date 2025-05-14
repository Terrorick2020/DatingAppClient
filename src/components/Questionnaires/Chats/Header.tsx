import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appRoutes } from '@/config/routes.config';
import { addRoute } from '@/store/slices/settingsSlice';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import ChatsHeaderItem from './HeaderItem';


const ChatsHeader = (): JSX.Element => {
    const chatsFavList = useSelector((state: IState) => state.chats.chatsFavList);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<RootDispatch>();

    const toChat = (id: string) => {
        navigate(appRoutes.targetChat.replace(':id', `${id}`));
        dispatch(addRoute(location.pathname));
    }

    return (
        <>
            <h4 className="headline">Чаты</h4>
            <div className="history">
                {chatsFavList.map(item => (
                    <ChatsHeaderItem item={item} toChat={toChat} />
                ))}
            </div>
        </>
    )
}

export default ChatsHeader;
