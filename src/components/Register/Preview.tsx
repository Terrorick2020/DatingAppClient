import { JSX, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { toFillQuest, toPolicy, toRules } from '@/config/routes.config';
import { useDispatch } from 'react-redux';
import { addRoute } from '@/store/slices/settingsSlice';
import type { RootDispatch } from '@/store';

import Button from '@mui/material/Button';
import SvgWhiteHeart from '@/assets/icon/white-heart.svg';


const PreviewContent = (): JSX.Element => {
    useEffect(() => {
        const langHtml = document.getElementById('preview');
        if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

        const logoHeader = document.getElementById('logo-header');
        if( logoHeader ) logoHeader.style.display = 'none';
    }, []);

    const dispatch = useDispatch<RootDispatch>();
    const location = useLocation();

    const handleRoute = () => {
        dispatch(addRoute(location.pathname));
    };

    return (
        <>
            <div className="preview__logo"></div>
            <div className="preview__ctx">
                <div className="text">
                    <h1 className="headline">
                        Настоящие встречи начинаются здесь
                        <img
                            className="relative"
                            alt="white-heart"
                            loading="lazy"
                            decoding="async"
                            src={ SvgWhiteHeart }
                        />
                    </h1>
                    <h6 className="description">
                        Мы верим, что крепкие связи устанавливаются лицом к лицу.
                        Наша цель — помочь вам встретить новых людей офлайн, создавая значимые моменты и впечатления.
                    </h6>
                </div>
                <div className="policy-links">
                    <p className="text">
                        Нажимая кнопку "Старт", вы соглашаетесь с
                        {" "}
                        <NavLink
                            to={toPolicy}
                            onClick={handleRoute}
                        >Политикой конфиденциальности</NavLink>
                        {" "}и{" "}
                        <NavLink
                            to={toRules}
                            onClick={handleRoute}
                        >Правилами использования.</NavLink>
                    </p>
                </div>
                <NavLink className="link" to={ toFillQuest } onClick={handleRoute}>
                    <Button variant="contained">Старт</Button>
                </NavLink>
            </div>
        </>
    )
}

export default PreviewContent;
