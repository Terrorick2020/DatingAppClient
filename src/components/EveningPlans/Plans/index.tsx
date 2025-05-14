import { JSX, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { appRoutes } from '@/config/routes.config';
import { addRoute, initPlansVarsAsync } from '@/store/slices/settingsSlice';
import { Slide } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { ANIME_DURATION } from '@/constant/settings';
import { EAnimeDirection } from '@/types/settings.type';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import Button from '@mui/material/Button';
import PlansPreview from './Preview';
import PlansVars from './Vars';
import PlansDetails from './Details';


const EveningPlansPlansCtx = (): JSX.Element => {
    const plansVars = useSelector((state: IState) => state.settings.plansVars);

    const dispatch = useDispatch<RootDispatch>();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(
        () => {
            !plansVars.length && dispatch(initPlansVarsAsync());
        },
        [plansVars]
    );

    const handleRoute = async (): Promise<void> => {
        const ePGlobRoute = appRoutes.eveningPlans.global;
        const ePLocationRoute = appRoutes.eveningPlans.inner.location;
        const toEPLocation = `${ePGlobRoute}/${ePLocationRoute}`;

        dispatch(addRoute(location.pathname));
        navigate(toEPLocation);
    }

    return (
        <>
            <div className="ep-plans__ctx">
                <Slide
                    triggerOnce
                    direction={EAnimeDirection.Left}
                    duration={ANIME_DURATION}
                >
                    <PlansPreview />
                    <PlansVars plansVars={plansVars} />
                    <PlansDetails />
                </Slide>
            </div>
            <div className="ep-plans__btn">
                <div className="link" onClick={handleRoute}>
                    <Button fullWidth variant="contained" loadingPosition="start">Далее</Button>
                </div>
            </div>
        </>
    )
}

export default EveningPlansPlansCtx;
