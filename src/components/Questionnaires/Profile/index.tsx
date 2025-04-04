import { useEffect } from 'react';


const ProfileContent = () => {
    useEffect(
        () => {
            const profileHtml = document.getElementById('profile');
            if ( profileHtml ) profileHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';
        },
        []
    )

    return (
        <>
            ProfileContent
        </>
    )
}

export default ProfileContent;
