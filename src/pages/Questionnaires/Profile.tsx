import { JSX } from 'react';

import ProfileContent from '@/components/Questionnaires/Profile';


const QuestProfilePage = (): JSX.Element => {
    return (
        <div className="profile" id="profile">
            <ProfileContent />
        </div>
    )
}

export default QuestProfilePage;
