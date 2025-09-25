import { JSX } from 'react';

import EPLocationContent from '@/components/EveningPlans/Location';


const EPLocationPage = (): JSX.Element => {
    return (
        <div className="ep-location" id="ep-location">
            <EPLocationContent />
        </div>
    )
}

export default EPLocationPage;
