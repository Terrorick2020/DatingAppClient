import { useEffect } from 'react';


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
            PsychologistContent
        </>
    )
}

export default PsychologistContent;
