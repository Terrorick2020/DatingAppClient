import { ChangeEvent, JSX, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { addRoute } from '@/store/slices/settingsSlice';
import { useDispatch } from 'react-redux';
import { toFillQuest } from '@/config/routes.config';
import { setLang } from '@/store/slices/settingsSlice';
import { ELanguage } from '@/types/settings.type';
import type { RootDispatch } from '@/store';

import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const LangContent = (): JSX.Element => {
    const dispatch = useDispatch<RootDispatch>();
    const location = useLocation();

    const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch( setLang( event.target.value as ELanguage ) );
    };

    useEffect(() => {
        const langHtml = document.getElementById('lang');
        if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

        const logoHeader = document.getElementById('logo-header');
        if( logoHeader ) logoHeader.style.display = 'none';
    }, []);

    const handleRoute = () => {
        dispatch(addRoute(location.pathname));
    };

    return (
        <>
            <div className="lang__ctx">
                <h3 className="headline">Выбери язык интерфейса</h3>
                <RadioGroup
                    className="radio-group"
                    aria-labelledby="radio-buttons-lang-group-lable"
                    defaultValue={ ELanguage.Russia }
                    name="radio-buttons-lang-group"
                    onChange={handleLanguageChange}
                >
                    <FormControlLabel value={ ELanguage.English } control={ <Radio /> } label="English" />
                    <FormControlLabel value={ ELanguage.Russia } control={ <Radio /> } label="Русский" />
                    <FormControlLabel value={ ELanguage.Ukraine } control={ <Radio /> } label="Український" />
                    <FormControlLabel value={ ELanguage.Uzbekistan } control={ <Radio /> } label="Oʻzbek" />
                </RadioGroup>
            </div>
            <div className="lang__btn">
                <NavLink className="link" to={ toFillQuest } onClick={handleRoute}>
                    <Button variant="contained">Продолжить</Button>
                </NavLink>
            </div>
        </>
    )
}

export default LangContent;
