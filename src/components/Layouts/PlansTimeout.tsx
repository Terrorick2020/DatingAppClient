import { forwardRef } from 'react';
import { SnackbarProviderProps } from 'notistack';

import Chip from '@mui/material/Chip';
import SvgHourglass from '@/assets/img/hourglass.png';


const SAPlansTimeout = forwardRef<HTMLDivElement, SnackbarProviderProps>((_, ref) => {
    return (
        <>
            <Chip
                ref={ref}
                className="plans-timeout"
                label="Обновите свои планы"
                icon={
                    <img src={SvgHourglass} alt="hourglass" />
                }
            />
        </>
    )
})

export default SAPlansTimeout;
