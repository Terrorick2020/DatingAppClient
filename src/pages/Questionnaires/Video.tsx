import { JSX } from 'react';

import VideoContent from '@/components/Questionnaires/Video';


const QuestVideoPage = (): JSX.Element => {
    return (
        <div className="video-page" id="video-page">
            <VideoContent />
        </div>
    )
}

export default QuestVideoPage;
