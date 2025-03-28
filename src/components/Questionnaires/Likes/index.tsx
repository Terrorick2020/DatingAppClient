import { useEffect } from 'react';


const LikesContent = () => {
    useEffect(
        () => {
            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';
        },
        []
    )

    return (
        <>
            LikesContent
        </>
    )
}

export default LikesContent