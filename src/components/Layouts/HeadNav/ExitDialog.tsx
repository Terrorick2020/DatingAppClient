import { JSX } from 'react';
import type { PropsHeadNavExitDialog } from '@/types/layout.types';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ChatPatternDialog from '@/components/UI/ChatPatternDialog';
import Button from '@mui/material/Button';
import PngExit from '@/assets/img/exit.png';

const HeadNavExitDialog = (props: PropsHeadNavExitDialog): JSX.Element => {
    const handleClose = (): void => props.setOpen(false);

    const handleExit = (): void => {
        document.getElementsByTagName('html')[0].remove();
        handleClose();
    };

    return (
        <ChatPatternDialog
            open={props.open}
            img={PngExit}
            setOpen={props.setOpen}
        >
            <DialogContent>
                <h4 className="headline">Закрытие приложения</h4>
                <p className="text">Вы действительно хотите закрыть приложение?</p>
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
                    onClick={handleExit}
                >Закрыть</Button>
            </DialogActions>
        </ChatPatternDialog>
    )
}

export default HeadNavExitDialog;