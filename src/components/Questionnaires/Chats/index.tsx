import { useEffect } from 'react';


const ChatsContent = () => {
    useEffect(
        () => {
            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';
        },
        []
    )

    return (
        <>
            ChatsContent
        </>
    )
}

export default ChatsContent