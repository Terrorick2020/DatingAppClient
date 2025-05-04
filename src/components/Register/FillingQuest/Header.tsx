import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { appRoutes } from '@/config/routes.config';
import { addRoute } from '@/store/slices/settingsSlice';
import type { RootDispatch } from '@/store';

import SvgVideoHelpers from '@/assets/icon/video-helpers.svg?react';


const FillingQuestHeader = () => {
    const dispatch = useDispatch<RootDispatch>();
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = () => {
        const regGlobRoute  = appRoutes.register.global;
        const regMediaRoute = appRoutes.register.inner.media;
        const toMedia = `${regGlobRoute}/${regMediaRoute}`;
        
        navigate(toMedia);
        dispatch(addRoute(location.pathname));
    }

    return (
        <>  
            <div className="text">
                <h3 className="headline">Регистрация</h3>
                <p className="description">Расскажите немного о себе и о своих планах.</p>
            </div>
            <div className="video" onClick={handleClick}>
                <SvgVideoHelpers />
            </div>
        </>
    )
}

export default FillingQuestHeader
