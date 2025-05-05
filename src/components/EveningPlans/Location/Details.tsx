import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '@/store/slices/profileSlice';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import TextField from '@mui/material/TextField';


const LocationDetails = () => {
    const location = useSelector((state: IState) => state.profile.eveningPlans.location);

    const dispatch = useDispatch<RootDispatch>();

    const handleChangeDesc = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        dispatch(setLocation({
            ...location,
            description: event.target.value,
        }))
    };

    return (
        <>
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
            />
        </>
    )
}

export default LocationDetails;
