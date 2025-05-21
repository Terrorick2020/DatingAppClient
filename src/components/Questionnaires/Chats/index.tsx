import { JSX, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initChatsCtxAsync } from '@/store/slices/chatsSlice';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import ChatsHeader from './Header';
import ChatsList from './List';
import MyLoader from '@/components/UI/MyLoader';



const ChatsContent = (): JSX.Element => {
    const isLoad = useSelector((state: IState) => state.settings.load);

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

    return (
        <>
            {
                isLoad
                    ?
                    <div className="loader">
                        <MyLoader />
                    </div>
                    :
                    <>
                        <div className="chats__head">
                            <ChatsHeader />
                        </div>
                        <div className="chats__ctx">
                            <ChatsList />
                        </div>
                   </>
            }
        </>
    )
}

export default ChatsContent;
