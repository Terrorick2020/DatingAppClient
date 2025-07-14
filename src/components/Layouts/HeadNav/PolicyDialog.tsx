import { JSX } from 'react';
import type { PropsHeadNavfDialog } from '@/types/layout.types';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';


const PolicyDialog = (props: PropsHeadNavfDialog): JSX.Element => {
    
    return (
        <Dialog
            keepMounted
            className="base-confirm policy-confirm"
            aria-describedby="alert-dialog-slide-policy-confirm"
            open={props.open}
            onClose={() => props.handleClose()}
            slots={{ transition: Slide }}
            slotProps={{
                transition: {
                    direction: 'up',
                },
            }}
        >
            <DialogTitle>Политика использования приложения</DialogTitle>
            <DialogContent>
                <p className="text">
                    sdvsdvsdvsdvs
                    zdvsdvsdvsdvsdvsdvvvvvvvvvvvvvvvvvvvvvvvvvv
                    sdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvs
                    dvsd
                    vs
                    dv
                    sdv
                    sdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdv
                    sdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvssdvsdv
                    sdvefvfvdfvdfv
                                        sdvsdvsdvsdvs
                    zdvsdvsdvsdvsdvsdvvvvvvvvvvvvvvvvvvvvvvvvvv
                    sdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvs
                    dvsd
                    vs
                    dv
                    sdv
                    sdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdv
                    sdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvssdvsdv
                    sdvefvfvdfvdfv
                                        sdvsdvsdvsdvs
                    zdvsdvsdvsdvsdvsdvvvvvvvvvvvvvvvvvvvvvvvvvv
                    sdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvs
                    dvsd
                    vs
                    dv
                    sdv
                    sdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdv
                    sdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvssdvsdv
                    sdvefvfvdfvdfv
                                        sdvsdvsdvsdvs
                    zdvsdvsdvsdvsdvsdvvvvvvvvvvvvvvvvvvvvvvvvvv
                    sdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvs
                    dvsd
                    vs
                    dv
                    sdv
                    sdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdv
                    sdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvsdvssdvsdv
                    sdvefvfvdfvdfv
                </p>
            </DialogContent>
            <DialogActions>
                <Button
                    className="exit-btn"
                    onClick={() => props.handleClose()}
                >Закрыть</Button>
            </DialogActions>
        </Dialog>
    )
}

export default PolicyDialog;
