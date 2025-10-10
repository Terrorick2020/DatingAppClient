import { JSX } from 'react';

import LikesContent from '@/components/Questionnaires/Likes';


const QuestLikesPage = (): JSX.Element => {
    return (
        <div className="likes" id="likes">
            <LikesContent />
        </div>
    )
}

export default QuestLikesPage;
