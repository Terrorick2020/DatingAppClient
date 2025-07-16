import { JSX, useEffect } from 'react';


const RulesContent = (): JSX.Element => {
    useEffect(() => {
        const langHtml = document.getElementById('rules');
        if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

        const logoHeader = document.getElementById('logo-header');
        if( logoHeader ) logoHeader.style.display = 'flex';
    }, []);

    return (
        <div className="rules__ctx"></div>
    )
}

export default RulesContent;
