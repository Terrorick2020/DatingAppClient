import { useEffect } from 'react';


const ProfileContent = () => {
    useEffect(
        () => {
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

export default ProfileContent