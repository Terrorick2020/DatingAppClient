import { JSX } from 'react';

import ShortsContent from '@/components/Shorts';


const ShortsPage = (): JSX.Element => {
    return (
        <div className="shorts" id="shorts">
            <ShortsContent />
        </div>
    )
};

export default ShortsPage;
