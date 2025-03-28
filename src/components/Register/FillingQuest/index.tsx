import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { appRoutes } from '@/config/routes.config';
import { backButton } from '@telegram-apps/sdk';

import Button from '@mui/material/Button';

import GeoConfirmation from './GeoConfirmation';
import FillingQuestHeader from './Header';
import FillingQuestPhotos from './Photos';
import FillingQuestInputs from './Inputs';
import FillingQuestMySex from './MySex';
import FillingQuestAge from './Age';
import FillingQuestBio from './Bio';
import FillingQuestInterests from './Interests';
import FillingQuestSelectionSex from './SelectionSex';


const FillingQuestContent = () => {
    const [_confirmation, setConfirmation] = useState<boolean>(false);

    const navigate = useNavigate()

    // const regGlobRoute = appRoutes.register.global;
    // const regFillQuestRoute = appRoutes.register.inner.geo;
    // const toGeo = `${regGlobRoute}/${regFillQuestRoute}`;
    const questionnairesGlobRoute = appRoutes.questionnaires.global;
    const questionnairesSliderRoute = appRoutes.questionnaires.inner.slider;
    const toSlider = `${questionnairesGlobRoute}/${questionnairesSliderRoute}`;

    useEffect(
        () => {
            const langHtml = document.getElementById('filling-quest');
            if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';

            // const geoModalHtml = document.getElementById('geo-modal');
            // if ( geoModalHtml ) {
            //     geoModalHtml.style.animationDelay = '1s';
            //     geoModalHtml.style.animation = 'slideModalDown 1s ease-in-out forwards';
            // }

            if (backButton.mount.isAvailable()) backButton.mount();
            if (backButton.show.isAvailable()) backButton.show();

            if (backButton.onClick.isAvailable()) {
                const toPreview = () => navigate(-1)
                backButton.onClick(toPreview)
            }
        },
        []
    )


    return (
        <>
            <GeoConfirmation setConfirmation={setConfirmation} />
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
                <NavLink className="link" to={ toSlider }>
                    <Button variant="contained">Продолжить</Button>
                </NavLink>
            </div>
        </>
    )
}

export default FillingQuestContent
