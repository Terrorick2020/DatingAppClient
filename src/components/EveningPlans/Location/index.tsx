import { JSX, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toSlider } from '@/config/routes.config';
import { resetRoutes, setEPErrors, setMedaiLink } from '@/store/slices/settingsSlice';
import { EMPTY_INPUT_ERR_MSG } from '@/constant/settings';
import { LO_MEDIA_LINK } from '@/config/env.config';
import { useDispatch, useSelector } from 'react-redux';
import { saveSelfPlansAsync } from '@/store/slices/profileSlice';
import type { FEPHasErrors } from '@/types/settings.type';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import Button from '@mui/material/Button';
import LocationDistrict from './Disrict';
import LocationDetails from './Details';


const EveningPlansLocationCtx = (): JSX.Element => {
    const districtsVars = useSelector((state: IState) => state.settings.districtsVars);
    const fEPErrors = useSelector((state: IState) => state.settings.fEPErrors);
    const selfEPLocation = useSelector((state: IState) => state.profile.eveningPlans.location);

    const [appLoad, setAppLoad] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();

    const handleRoute = async (): Promise<void> => {
        setAppLoad(true);

        const errObj: FEPHasErrors = {};

        if(!selfEPLocation.value) {
            errObj['districtErr'] = {
                value: true,
                msg: EMPTY_INPUT_ERR_MSG,
            }
        };

        if(!selfEPLocation.description) {
            errObj['descDistErr'] = {
                value: true,
                msg: EMPTY_INPUT_ERR_MSG,
            }
        }

        const hasErrors = Object.values(errObj).some(item => item.value);

        if(hasErrors) {
            dispatch(setEPErrors({
                ...fEPErrors,
                ...errObj,
            }))

            setAppLoad(false);

            return;
        }

        const response = await dispatch(saveSelfPlansAsync()).unwrap();

        if(response === 'error') {
            setAppLoad(false);

            return;
        } else if (!response) {
            setAppLoad(false);
            
            return;
        }

        setAppLoad(false);
        dispatch(resetRoutes());
        navigate(toSlider);
    }

    useEffect(() => {
        dispatch(setMedaiLink(LO_MEDIA_LINK));
    }, [])

    return (
        <>
            <div className="ep-location__ctx">
                <div className="ep-text">
                    <h4 className="headline">Место встречи</h4>
                    <p className="description">Расскажите где бы вы хотели встретиться</p>
                </div>
                <LocationDistrict districtsVars={districtsVars} />
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
