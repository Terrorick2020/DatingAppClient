import { JSX, memo, ChangeEvent, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserAsync, setTargetProfileId, setPassword } from '@/store/slices/adminSlice';
import type { PropsUsersListDialog } from '@/types/admin.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';


const UsersListDialog = memo((props: PropsUsersListDialog): JSX.Element => {
    const password = useSelector((state: IState) => state.admin.password);

    const [dLoading, setDLoading] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();

    const handleChangePass = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(setPassword(event.target.value));
    }, [dispatch]);

    const handleDeleteUser = useCallback(async (): Promise<void> => {
        setDLoading(true);
        await dispatch(deleteUserAsync());
        setDLoading(false);
        dispatch(setPassword(''));
        props.hadleClose();
    }, [dispatch, props.hadleClose]);

    const handleExit = useCallback((): void => {
        dispatch(setPassword(''));
        dispatch(setTargetProfileId(''));
        props.hadleClose();
    }, [dispatch, props.hadleClose]);

    return (
        <Dialog
            className="base-confirm admin-confirm"
            open={props.open}
            keepMounted
            onClose={handleExit}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Вы действительно хотите удалить специалиста?</DialogTitle>
            <DialogContent>
                <h4 className="headline">Пароль</h4>
                <TextField
                    className="del-input"
                    id="del-input"
                    fullWidth
                    placeholder="Введите пароль"
                    value={password}
                    onChange={handleChangePass}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleExit}>Отмена</Button>
                <Button
                    fullWidth
                    loadingPosition="start"
                    loading={dLoading}
                    onClick={handleDeleteUser}
                >
                    {dLoading ? 'Удаление..' : 'Удалить'}
                </Button>
            </DialogActions>
        </Dialog>
    )
})

export default UsersListDialog;
