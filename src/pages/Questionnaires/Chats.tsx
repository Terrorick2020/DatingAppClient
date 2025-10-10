import { JSX } from 'react';

import ChatsContent from '@/components/Questionnaires/Chats';


const QuestChatsPage = (): JSX.Element => {
    return (
        <div className="chats" id="chats">
            <ChatsContent />
        </div>
    )
}

export default QuestChatsPage;
