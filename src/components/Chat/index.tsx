import { useEffect } from 'react';


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
            ChatContent
        </>
    )
}

export default ChatContent;
