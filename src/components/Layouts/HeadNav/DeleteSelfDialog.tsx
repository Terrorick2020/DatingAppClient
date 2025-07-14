import { JSX, useState } from 'react';
import { deleteSelfAsync } from '@/store/slices/profileSlice';
import { warningAlert } from '@/funcs/alert.funcs';
import { useDispatch } from 'react-redux';
import type { PropsHeadNavfDialog } from '@/types/layout.types';
import type { RootDispatch } from '@/store';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ChatPatternDialog from '@/components/UI/ChatPatternDialog';
import Button from '@mui/material/Button';
import SvgAngrySmileyFace from '@/assets/icon/angry-smiley-face.svg';


const DeleteSelfDialog = (props: PropsHeadNavfDialog): JSX.Element => {
    const [dLoading, setDLoading] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();

    const handleDeleteUser = async (): Promise<void> => {
        setDLoading(true);

        const response = await dispatch(deleteSelfAsync()).unwrap();
        
        setDLoading(false);
        
        if(!response || response === 'error') {
            warningAlert(
                dispatch,
                'Не удалось удалить профиль! Попробуйте позже'
            );

            return;
        }

        props.handleClose();
    };

    return (
        <ChatPatternDialog
            open={props.open}
            img={SvgAngrySmileyFace}
            setOpen={() => props.handleClose()}
        >
            <DialogContent>
                <h4 className="headline">Удалить профиль?</h4>
                <p className="text">
                    Вы действительно хотите удалить профиль?
                    Это действие невозможно отменить и все данные о Вас будут утрачены навсегда.
                </p>
            </DialogContent>
            <DialogActions>
                <Button
                    className="exit-btn"
                    onClick={() => props.handleClose()}
                >Отмена</Button>
                <Button
                    fullWidth
                    loadingPosition="start"
                    className="close-btn"
                    loading={dLoading}
                    onClick={handleDeleteUser}
                >
                    {dLoading ? 'Удаление..' : 'Удалить'}
                </Button>
            </DialogActions>
        </ChatPatternDialog>
    )
}

export default DeleteSelfDialog;
