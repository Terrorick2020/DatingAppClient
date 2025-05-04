import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addRoute } from '@/store/slices/settingsSlice';
import { appRoutes } from '@/config/routes.config';
import { useDispatch } from 'react-redux';
import type { RootDispatch } from '@/store';

import Button from '@mui/material/Button';
import LocationDistrict from './Disrict';
import LocationDetails from './Details';


const EveningPlansLocationCtx = () => {
    const [appLoad, setAppLoad] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();
    const location = useLocation();
    const navigate = useNavigate();

    const handleRoute = async (): Promise<void> => {
        setAppLoad(true);

        const questGlobRoute = appRoutes.questionnaires.global;
        const questSliderRoute = appRoutes.questionnaires.inner.slider;
        const toSlider = `${questGlobRoute}/${questSliderRoute}`;

        dispatch(addRoute(location.pathname));
        setAppLoad(false);
        navigate(toSlider);
    }

    return (
        <>
                <div className="ep-location__ctx">
                    <div className="ep-text">
                        <h4 className="headline">Место встречи</h4>
                        <p className="description">Расскажите где бы вы хотели встретиться</p>
                    </div>
                    <LocationDistrict />
                    <LocationDetails />
                </div>
                <div className="ep-location__btn">
                    <div className="link" onClick={handleRoute}>
                        <Button
                            fullWidth
                            variant="contained"
                            loadingPosition="start"
                            loading={appLoad}
                        >
                            {appLoad ? 'Сохранение..': 'Сохранить'}
                        </Button>
                    </div>
                </div>
        </>
    )
}

export default EveningPlansLocationCtx;
