import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { appRoutes } from '@/config/routes.config';

import Button from '@mui/material/Button';

import SvgTriangle from '@/assets/icon/triangle.svg'
import SvgHeartInHand from '@/assets/icon/heart-in-hand.svg';
import SvgLogo from '@/assets/icon/logo.svg';


const PreviewContent = () => {
    const regGlobRoute = appRoutes.register.global;
    const regLangRoute = appRoutes.register.inner.lang;
    const toLang = `${regGlobRoute}/${regLangRoute}`;

    useEffect(
        () => {
            const langHtml = document.getElementById('preview');
            if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'none';
        },
        [] 
    )

    return (
        <>
            {/* <div className="preview__logo">
                <img className="heart-in-hand" src={ SvgHeartInHand } alt="heart-in-hand" />
            </div>
            <div className="preview__ctx">
                <div className="content">
                    <img className="logo" src={ SvgLogo } alt="logo" />
                    <h3 className="headline">Привет!</h3>
                    <p className="description">Мы верим, что настоящие связи устанавливаются лицом к лицу. Вот почему наша главная цель — помочь вам встретиться с людьми лично, создавая значимые моменты и впечатления.</p>
                </div>
                <NavLink className="link" to={ toLang }>
                    <Button variant="contained">Создать профиль</Button>
                </NavLink>
            </div> */}
            <div className="preview__logo">
                sssssssssssssssssssssssssss
            </div>
            <div className="preview__ctx">
                <h1 className="headline">Настоящие встречи начинаются здесь</h1>
                <h5 className="text">Мы верим, что крепкие связи устанавливаются лицом к лицу. Наша цель — помочь вам встретить новых людей офлайн, создавая значимые моменты и впечатления.</h5>
                <div className="btn-right">
                    <NavLink className="link" to={ toLang }>
                        <Button
                            variant="contained"
                            endIcon={<img src={SvgTriangle} alt="triangle"/>}
                        >Далее</Button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default PreviewContent