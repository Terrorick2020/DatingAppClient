import { useEffect } from 'react';

import Button from '@mui/material/Button';
import PsychologistCtx from './Ctx';


const PsychologistContent = () => {
    useEffect(
        () => {
            const psychHtml = document.getElementById('target-psych');
            if ( psychHtml ) psychHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';
        },
        []
    )

    return (
        <>
            <div className="target-psych__ctx">
                <PsychologistCtx />
            </div>
            <div className="target-psych__btn">
                <Button variant="contained">Выбрать специалиста</Button>
            </div>
        </>
    )
}

export default PsychologistContent;
