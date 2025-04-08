import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { appRoutes } from '@/config/routes.config';
import { addRoute, resetRoutes } from '@/store/slices/settingsSlice';
import { type IState, EProfileRoles } from '@/types/store.types';

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
    const profInfo = useSelector((state: IState) => state.profile.info);
    const [_confirmation, setConfirmation] = useState<boolean>(false);

    // const regGlobRoute = appRoutes.register.global;
    // const regFillQuestRoute = appRoutes.register.inner.geo;
    // const toGeo = `${regGlobRoute}/${regFillQuestRoute}`;
    const questionnairesGlobRoute = appRoutes.questionnaires.global;
    const questionnairesSliderRoute = appRoutes.questionnaires.inner.slider;
    const toSlider = `${questionnairesGlobRoute}/${questionnairesSliderRoute}`;

    const adminGlobRoute = appRoutes.admin.global;
    const changeRoute = appRoutes.admin.inner.nav;
    const toChange = `${adminGlobRoute}/${changeRoute}`;

    const dispatch = useDispatch();

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
        },
        []
    )

    const handleRoute = () => {
        dispatch(resetRoutes());
        profInfo.role === EProfileRoles.Admin && dispatch(addRoute(toChange));
    }

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
                <NavLink className="link" to={toSlider} onClick={handleRoute}>
                    <Button variant="contained">Продолжить</Button>
                </NavLink>
            </div>
        </>
    )
}

export default FillingQuestContent
