import { JSX } from 'react';

import EPPlansContent from "@/components/EveningPlans/Plans";


const EPPlansPage = (): JSX.Element => {
    return (
        <div className="ep-plans" id="ep-plans">
            <EPPlansContent />
        </div>
    )
}

export default EPPlansPage;
