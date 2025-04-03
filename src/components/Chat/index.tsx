import { useEffect } from 'react';

import ChatHeader from './Header';
import ChatList from './List';
import ChatInput from '@/components/UI/ChatInput';


const ChatContent = () => {
    useEffect(
        () => {
            const chatHtml = document.getElementById('target-chat');
            if ( chatHtml ) chatHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';
        },
        []
    )

    return (
        <>  
            <header className="target-chat__header">
                <ChatHeader />
            </header>
            <div className="target-chat__ctx">
                <ChatList />
            </div>
            <footer className="target-chat__footer">
                <ChatInput isMatch={false} />
            </footer>
        </>
    )
}

export default ChatContent;
