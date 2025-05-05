import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlan } from '@/store/slices/profileSlice';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import TextField from '@mui/material/TextField';


const PlansDetails = () => {
    const plan = useSelector((state: IState) => state.profile.eveningPlans.plan);

    const dispatch = useDispatch<RootDispatch>();

    const handleChangeDesc = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        dispatch(setPlan({
            ...plan,
            description: event.target.value,
        }))
    };

    return (
        <>
            <TextField
                className="details-input"
                id="plans-textarea"
                multiline
                fullWidth
                minRows={4}
                maxRows={6}
                placeholder="Напишите подробнее о планах"
                slotProps={{
                    input: {
                        inputProps: {
                            maxLength: 200,
                        },
                    },
                }}
                value={plan.description}
                onChange={handleChangeDesc}
            />
        </>
    )
}

export default PlansDetails;
