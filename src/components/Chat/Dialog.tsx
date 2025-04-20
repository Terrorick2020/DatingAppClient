import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { delteChatByIDAsync } from '@/store/slices/chatsSlice';
import { dellRoute } from '@/store/slices/settingsSlice';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import SvgAngrySmileyFace from '@/assets/icon/angry-smiley-face.svg';


interface PropsChatDialog {
    open: boolean
    id: string
    hadleClose: () => void
}
const ChatDialog = (props: PropsChatDialog) => {
    const setRoutes = useSelector((state: IState) => state.settings.routes);

    const [dLoading, setDLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch<RootDispatch>();

    const goBack = () => {
        const backRoute = setRoutes.slice(-1)[0];
        navigate(backRoute);
        dispatch(dellRoute());
    };

    const handleDeleteUser = async (): Promise<void> => {
        setDLoading(true);
        await dispatch(delteChatByIDAsync(props.id));
        setDLoading(false);
        props.hadleClose();
        goBack();
    };

    return (
        <>
            <Dialog
                className="base-confirm chat-confirm"
                open={props.open}
                keepMounted
                onClose={() => props.hadleClose()}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <img src={SvgAngrySmileyFace} alt="angry-smile-face" />
                    <h4 className="headline">Удалить чат?</h4>
                    <p className="text">
                        Вы действительно хотите удалить чат?
                        Это действие невозможно отменить и вся переписка будет стерта навсегда.
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.hadleClose()}>Отмена</Button>
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
        </>
    )
}

export default ChatDialog;
