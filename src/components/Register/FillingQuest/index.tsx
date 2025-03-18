import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { appRoutes } from '@/config/routes.config';

import Button from '@mui/material/Button';

import FillingQuestHeader from './Header';
import FillingQuestPhotos from './Photos';
import FillingQuestInputs from './Inputs';
import FillingQuestMySex from './MySex';
import FillingQuestAge from './Age';
import FillingQuestBio from './Bio';
import FillingQuestInterests from './Interests';
import FillingQuestSelectionSex from './SelectionSex';


const FillingQuestContent = () => {
    const regGlobRoute = appRoutes.register.global
    const regFillQuestRoute = appRoutes.register.inner.geo
    const toGeo = `${regGlobRoute}/${regFillQuestRoute}`

    useEffect(
        () => {
            const langHtml = document.getElementById('filling-quest')
            if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards'
        },
        []
    )

    return (
        <>
            <div className="filling-quest__header">
                <FillingQuestHeader />
            </div>
            <div className="filling-quest__ctx">
                <div className="widgets">
                    <FillingQuestPhotos />
                    <FillingQuestInputs />
                    <FillingQuestMySex />
                    <FillingQuestAge />
                    <FillingQuestBio />
                    <FillingQuestInterests />
                    <FillingQuestSelectionSex />
                </div>
                <NavLink className="link" to={ toGeo }>
                    <Button variant="contained">Продолжить</Button>
                </NavLink>
            </div>
        </>
    )
}

export default FillingQuestContent
