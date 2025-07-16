import { JSX, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSelfAsync } from '@/store/slices/profileSlice';
import { warningAlert } from '@/funcs/alert.funcs';
import type { RootDispatch } from '@/store';

import Button from '@mui/material/Button';

const ProfileDelete = (): JSX.Element => {
    const [delLoad, setDelLoad] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();

    const handleDelete = async (): Promise<void> => {
        setDelLoad(true);

        const response = await dispatch(deleteSelfAsync()).unwrap();
        
        if(!response || response === 'error') {
            warningAlert(
                dispatch,
                'Не удалось удалить профиль! Попробуйте позже'
            );
        };

        setDelLoad(false);
    };

    return (
        <div className="delete-box">
            <h3 className="headline">Удалить анкету</h3>
            <div className="link">
                <Button
                    className="black"
                    fullWidth
                    variant="contained"
                    loadingPosition="start"
                    loading={delLoad}
                    disabled={delLoad}
                    onClick={handleDelete}
                >
                    {delLoad ? 'Удаление' : 'Удалить'}
                </Button>
            </div>
        </div>
    )
}

export default ProfileDelete;
