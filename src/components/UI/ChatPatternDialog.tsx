import { JSX, memo } from 'react';
import type { PropsChatPatternDialog } from '@/types/ui.types';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const ChatPatternDialog = memo((props: PropsChatPatternDialog): JSX.Element => {
    const handleClose = (): void => props.setOpen(false);

    return (
        <Dialog
            keepMounted
            className="base-confirm chat-confirm"
            aria-describedby="alert-dialog-slide-description-link-confirm"
            open={props.open}
            onClose={handleClose}
            slots={{ transition: Slide }}
            slotProps={{
                transition: {
                    direction: 'up',
                },
            }}
        >
            <DialogTitle>
                <img
                    src={props.img}
                    alt="link-confirm"
                    loading="lazy"
                    decoding="async"    
                />
            </DialogTitle>
            { props.children }
        </Dialog>
    )
})

export default ChatPatternDialog;
