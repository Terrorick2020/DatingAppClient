import { useEffect } from 'react';

import ChatsHeader from './Header';
import ChatsList from './List';



const ChatsContent = () => {
    useEffect(
        () => {
            const chatsHtml = document.getElementById('chats');
            if ( chatsHtml ) chatsHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';
        },
        []
    )

    return (
        <>
            <div className="chats__head">
                <ChatsHeader />
            </div>
            <div className="chats__ctx">
                <ChatsList />
            </div>
        </>
    )
}

export default ChatsContent