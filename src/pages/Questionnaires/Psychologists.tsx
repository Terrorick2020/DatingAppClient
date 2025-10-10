import { JSX } from 'react';

import PsychologistsContent from '@/components/Questionnaires/Psychologists';


const QuestPsychologistsPage = (): JSX.Element => {
    return (
        <div className="psychologists" id="psychologists">
            <PsychologistsContent />
        </div>
    )
}

export default QuestPsychologistsPage;
