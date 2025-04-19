import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChatByIdAsync } from '@/store/slices/chatsSlice';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import ChatHeader from './Header';
import ChatList from './List';
import ChatInput from '@/components/UI/ChatInput';
import MyLoader from '@/components/UI/MyLoader';


const ChatContent = () => {
    const { id } = useParams();

    if ( !id ) return null;

    const isLoad = useSelector((state: IState) => state.settings.load);

    const dispatch = useDispatch<RootDispatch>();

    useEffect(
        () => {
            const chatHtml = document.getElementById('target-chat');
            if ( chatHtml ) chatHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';

            dispatch(getChatByIdAsync(id));
        },
        [id]
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
                        <header className="target-chat__header">
                            <ChatHeader id={id} />
                        </header>
                        <div className="target-chat__ctx">
                            <ChatList />
                        </div>
                        <footer className="target-chat__footer">
                            <ChatInput isMatch={false} />
                        </footer>
                    </>
            }
        </>
    )
}

export default ChatContent;
