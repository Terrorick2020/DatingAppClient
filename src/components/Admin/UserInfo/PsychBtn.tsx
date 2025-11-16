import { errorAlert } from '@/funcs/alert.funcs';
import { userItemActivCtx } from '@/constant/admin';
import { selectPsychStatusAsync } from '@/store/slices/adminSlice';
import { useDispatch } from 'react-redux';
import { type JSX, useState, memo } from 'react';
import type { PropsUserInfoComponent } from '@/types/admin.types';
import type { RootDispatch } from '@/store';

import Button from '@mui/material/Button';
import { EPsychStatus } from '@/types/store.types';


const PsychBtn = (props: PropsUserInfoComponent): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();

    const sendPsychBlockReq = async (): Promise<void> => {
        setLoading(true);

        const response = await dispatch(selectPsychStatusAsync({
            id: props.targetProfile.id,
            targetValue: props.targetProfile.status === EPsychStatus.Active
                ? EPsychStatus.Inactive
                : EPsychStatus.Active,
            isDisp: true,
        })).unwrap();

        if(!response || response === 'error') {
            errorAlert(dispatch, 'Ошибка изменение статуса специалиста')
        };

        setLoading(false);
    };

    return (
        <div className="link">
            <Button
                fullWidth
                loadingPosition="start"
                variant="contained"
                className="link__btn take-pro"
                loading={loading}
                disabled={loading}
                onClick={sendPsychBlockReq}
            >
                { userItemActivCtx[props.targetProfile.status].text }
            </Button>
        </div>
    );
};

export default memo( PsychBtn );
