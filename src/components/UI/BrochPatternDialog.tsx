import { JSX, useState } from 'react';
import type { PropsBrochPatternDialog } from '@/types/ui.types';

import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';


const BrochPatternDialog = (props: PropsBrochPatternDialog): JSX.Element => {
    const [load, setLoad] = useState<boolean>(false);

    const handleClose = (): void => props.setOpen(false);

    const handleClick = async (): Promise<void> => {
        setLoad(true);

        await props.btnFunc();

        setLoad(false);
        handleClose();
    };

    return (
        <Dialog
            keepMounted
            className="base-confirm admin-confirm"
            aria-describedby="alert-dialog-broch"
            slots={{ transition: Slide }}
            slotProps={{
                transition: {
                    direction: 'up',
                },
            }}
            open={props.open}
            onClose={handleClose}
        >
            <DialogTitle>{ props.title }</DialogTitle>
            <DialogActions>
                <Button
                    fullWidth
                    className="exit-btn"
                    disabled={load}
                    onClick={handleClose}
                >Отмена</Button>
                <Button
                    fullWidth
                    className="close-btn"
                    variant="contained"
                    loadingPosition="start"
                    loading={load}
                    disabled={load}
                    onClick={handleClick}
                >{ props.btnTxt }</Button>
            </DialogActions>
        </Dialog>
    )
};

export default BrochPatternDialog;
