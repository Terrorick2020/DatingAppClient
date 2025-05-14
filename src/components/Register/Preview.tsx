import { JSX, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addRoute } from '@/store/slices/settingsSlice';
import { appRoutes } from '@/config/routes.config';

import Button from '@mui/material/Button';
import SvgWhiteHeart from '@/assets/icon/white-heart.svg';
import SvgTriangle from '@/assets/icon/triangle.svg?react';


const PreviewContent = (): JSX.Element => {
    const regGlobRoute = appRoutes.register.global;
    // const regLangRoute = appRoutes.register.inner.lang;
    // const toLang = `${regGlobRoute}/${regLangRoute}`;

    const regFillQuestRoute = appRoutes.register.inner.fillQuest;
    const toFillQuest = `${regGlobRoute}/${regFillQuestRoute}`;

    useEffect(
        () => {
            const langHtml = document.getElementById('preview');
            if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'none';
        },
        [] 
    )

    const location = useLocation();
    const dispatch = useDispatch();

    const handleRoute = () => {
        dispatch(addRoute(location.pathname));
    }

    return (
        <>
            <div className="preview__logo"></div>
            <div className="preview__ctx">
                <div className="text">
                    <h1 className="headline">
                        Настоящие встречи начинаются здесь
                        <img className="relative" src={ SvgWhiteHeart } alt="white-heart" />
                    </h1>
                    <h6 className="description">Мы верим, что крепкие связи устанавливаются лицом к лицу. Наша цель — помочь вам встретить новых людей офлайн, создавая значимые моменты и впечатления.</h6>
                </div>
                <div className="btn">
                    <NavLink className="link" to={ toFillQuest } onClick={handleRoute}>
                        <Button variant="contained" endIcon={<SvgTriangle />}>Далее</Button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default PreviewContent
