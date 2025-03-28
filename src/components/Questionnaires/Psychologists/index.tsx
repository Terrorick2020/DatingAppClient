import { useEffect } from 'react';


const PsychologistsContent = () => {
    useEffect(
        () => {
            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';
        },
        []
    )

    return (
        <>
            Psychologists
        </>
    )
}

export default PsychologistsContent