import { JSX, memo, useState } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


interface PropsPhotosDelDialog {
    id: string
    open: boolean
    setOpen: (value: boolean) => void
    handleDel: (id: string) => void
}
const PhotosDelDialog = memo((props: PropsPhotosDelDialog): JSX.Element => {
    const [dLoading, setDLoading] = useState<boolean>(false);

    const handleClose = (): void => props.setOpen(false);

    const handleDeletePhoto = async (): Promise<void> => {
        setDLoading(true);
        await props.handleDel(props.id);
        setDLoading(false);
        handleClose();
    }

    return (
        <>
            <Dialog
                keepMounted
                className="base-confirm chat-confirm"
                aria-describedby="alert-dialog-photos-del"
                open={props.open}
                onClose={handleClose}
                slots={{ transition: Slide }}
                slotProps={{
                    transition: {
                    direction: 'up',
                    },
                }}
            >
                <DialogContent>
                    <h4 className="headline">Удаление фотографии</h4>
                    <p className="text">Вы уверены, что хотите удалить фото?</p>
                </DialogContent>
                <DialogActions>
                    <Button
                        className="exit-btn"
                        onClick={handleClose}
                    >Отмена</Button>
                    <Button
                        fullWidth
                        loadingPosition="start"
                        className="close-btn"
                        loading={dLoading}
                        onClick={handleDeletePhoto}
                    >
                        {dLoading ? 'Удаление..' : 'Удалить'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
})

export default PhotosDelDialog;
