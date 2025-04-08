import { useState } from 'react';

import FillingQuestMedia from './Media';
import SvgVideoHelpers from '@/assets/icon/video-helpers.svg?react';


const FillingQuestHeader = () => {
    const [ showMedia, setShowMedia ] = useState<boolean>( false );

    const handleClick = () => {
        setShowMedia( !showMedia );
    }

    return (
        <>  
            <div className="text">
                <h3 className="headline">Регистрация</h3>
                <p className="description">Расскажите немного о себе и о своих планах.</p>
            </div>
            <div className="video" onClick={handleClick}>
                <SvgVideoHelpers />
                <FillingQuestMedia show={showMedia} />
            </div>
        </>
    )
}

export default FillingQuestHeader;
