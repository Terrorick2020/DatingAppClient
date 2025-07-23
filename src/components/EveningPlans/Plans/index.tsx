import { JSX } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toLocation } from '@/config/routes.config';
import { addRoute, setEPErrors } from '@/store/slices/settingsSlice';
import { EMPTY_INPUT_ERR_MSG, ANIME_DURATION } from '@/constant/settings';
import { Slide } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { EAnimeDirection } from '@/types/settings.type';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import Button from '@mui/material/Button';
import PlansPreview from './Preview';
import PlansVars from './Vars';
import PlansDetails from './Details';


const EveningPlansPlansCtx = (): JSX.Element => {
    const plansVars = useSelector((state: IState) => state.settings.plansVars);
    const fEPErrors = useSelector((state: IState) => state.settings.fEPErrors);
    const selfEPPlans = useSelector((state: IState) => state.profile.eveningPlans.plan);

    const dispatch = useDispatch<RootDispatch>();
    const location = useLocation();
    const navigate = useNavigate();

    const handleRoute = async (): Promise<void> => {
        if(!selfEPPlans.description) {
            dispatch(setEPErrors({
                ...fEPErrors,
                descPlanErr: {
                    value: true,
                    msg: EMPTY_INPUT_ERR_MSG,
                }
            }))

            return;
        };

        dispatch(addRoute(location.pathname));
        navigate(toLocation);
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
