import { useState, ChangeEvent } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';


interface PropsUsersListDialog {
    open: boolean
    hadleClose: () => void
}

const UsersListDialog = (props: PropsUsersListDialog) => {
    const [pass, setPass] = useState('');

    const handleChangePass = (event: ChangeEvent<HTMLInputElement>): void => {
        setPass(event.target.value)
    }

    return (
        <>
            <Dialog
                className="del-confirm"
                open={props.open}
                keepMounted
                onClose={props.hadleClose}
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
                        value={pass}
                        onChange={handleChangePass}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.hadleClose}>Disagree</Button>
                    <Button onClick={props.hadleClose}>Agree</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UsersListDialog;
