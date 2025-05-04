import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addRoute } from '@/store/slices/settingsSlice';
import { appRoutes } from '@/config/routes.config';
import { useDispatch } from 'react-redux';
import type { RootDispatch } from '@/store';

import Button from '@mui/material/Button';
import PlansPreview from './Preview';
import PlansVars from './Vars';
import PlansDetails from './Details';


const EveningPlansPlansCtx = () => {
    const dispatch = useDispatch<RootDispatch>();
    const location = useLocation();
    const navigate = useNavigate();

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
                <PlansPreview />
                <PlansVars />
                <PlansDetails />
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
