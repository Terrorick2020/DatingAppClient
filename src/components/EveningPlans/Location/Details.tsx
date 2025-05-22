import { JSX } from 'react';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY_INPUT_ERR_MSG } from '@/constant/settings';
import { setLocation } from '@/store/slices/profileSlice';
import { setEPErrors } from '@/store/slices/settingsSlice';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import TextField from '@mui/material/TextField';


const LocationDetails = (): JSX.Element => {
    const location = useSelector((state: IState) => state.profile.eveningPlans.location);
    const fEPErrors = useSelector((state: IState) => state.settings.fEPErrors);

    const dispatch = useDispatch<RootDispatch>();

    const handleChangeDesc = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const description = event.target.value;

        dispatch(setLocation({
            ...location,
            description,
        }))

        dispatch(setEPErrors({
            ...fEPErrors,
            descDistErr: {
                value: !description,
                msg: !description ? EMPTY_INPUT_ERR_MSG : '',
            }
        }))
    };

    return (
        <TextField
            className="details-input"
            id="location-textarea"
            multiline
            fullWidth
            minRows={4}
            maxRows={6}
            placeholder="Подробнее о месте встречи"
            slotProps={{
                input: {
                    inputProps: {
                        maxLength: 200,
                    },
                },
            }}
            value={location.description}
            onChange={handleChangeDesc}
            error={fEPErrors.descDistErr.value}
            helperText={fEPErrors.descDistErr.msg}
        />
    )
}

export default LocationDetails;
