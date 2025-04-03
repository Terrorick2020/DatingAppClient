import { useEffect } from 'react';

import LikesCard from './Card';


const LikesContent = () => {
    useEffect(
        () => {
            const likesHtml = document.getElementById('likes');
            if ( likesHtml ) likesHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';
        },
        []
    )

    return (
        <>
            <div className="likes__ctx">
                <h4 className="headline">Симпатии</h4>
                <div className="cards">
                    <LikesCard />
                    <LikesCard />
                    <LikesCard />
                    <LikesCard />
                    <LikesCard />
                    <LikesCard />
                    <LikesCard />
                    <LikesCard />
                </div>
            </div>
        </>
    )
}

export default LikesContent