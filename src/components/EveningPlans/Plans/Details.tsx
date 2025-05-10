import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY_INPUT_ERR_MSG } from '@/constant/settings';
import { setPlan } from '@/store/slices/profileSlice';
import { setEPErrors } from '@/store/slices/settingsSlice';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import TextField from '@mui/material/TextField';


const PlansDetails = () => {
    const plan = useSelector((state: IState) => state.profile.eveningPlans.plan);
    const fEPErrors = useSelector((state: IState) => state.settings.fEPErrors);

    const dispatch = useDispatch<RootDispatch>();

    const handleChangeDesc = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const description = event.target.value;

        dispatch(setPlan({
            ...plan,
            description,
        }))

        dispatch(setEPErrors({
            ...fEPErrors,
            descPlanErr: {
                value: !description,
                msg: !description ? EMPTY_INPUT_ERR_MSG : '',
            }
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
                error={fEPErrors.descPlanErr.value}
                helperText={fEPErrors.descPlanErr.msg}
            />
        </>
    )
}

export default PlansDetails;
