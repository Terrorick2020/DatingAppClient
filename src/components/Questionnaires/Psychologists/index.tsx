import { useEffect } from 'react';

import PsychHeader from './Header';
import PsychList from './List';


const PsychologistsContent = () => {
    useEffect(
        () => {
            const psychHtml = document.getElementById('psychologists');
            if ( psychHtml ) psychHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';
        },
        []
    )

    return (
        <>
            <div className="psychologists__header">
                <PsychHeader />
            </div>
            <div className="psychologists__ctx">
                <PsychList />
            </div>
        </>
    )
}

export default PsychologistsContent