import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { SnackbarProviderProps } from 'notistack';
import { addRoute } from '@/store/slices/settingsSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { toPlans } from '@/config/routes.config';
import type { RootDispatch } from '@/store';

import Chip from '@mui/material/Chip';
import SvgHourglass from '@/assets/img/hourglass.png';


const SAPlansTimeout = forwardRef<HTMLDivElement, SnackbarProviderProps>((_, ref) => {
    const dispatch = useDispatch<RootDispatch>();
    const location = useLocation();
    const navigate = useNavigate();

    const handleCLick = (): void => {
        dispatch(addRoute(location.pathname));
        navigate(toPlans);
    }

    return (
        <Chip
            clickable
            ref={ref}
            className="plans-timeout"
            label="Обновите свои планы"
            onClick={handleCLick}
            icon={
                <img
                    src={SvgHourglass}
                    alt="hourglass"
                    loading="lazy"
                    decoding="async"
                />
            }
        />
    )
})

export default SAPlansTimeout;
