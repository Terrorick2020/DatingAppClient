import { JSX } from 'react';

import EveningPlansContent from '@/components/Register/EveningPlans';


const RegEveningPlansPage = (): JSX.Element => {
    return (
        <div className="evening-plans" id="evening-plans">
            <EveningPlansContent />
        </div>
    )
}

export default RegEveningPlansPage;
