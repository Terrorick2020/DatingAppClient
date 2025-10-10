import { JSX } from 'react';

import ChatContent from '@/components/Chat';


const TargetChatPage = (): JSX.Element => {
    return (
        <div className="target-chat" id="target-chat">
            <ChatContent />
        </div>
    )
}

export default TargetChatPage;
