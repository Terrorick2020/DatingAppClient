import { JSX, memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { delteChatByIDAsync } from '@/store/slices/chatsSlice';
import { dellRoute } from '@/store/slices/settingsSlice';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ChatPatternDialog from '@/components/UI/ChatPatternDialog';
import Button from '@mui/material/Button';
import SvgAngrySmileyFace from '@/assets/icon/angry-smiley-face.svg';


interface PropsChatDialogDelete {
    open: boolean
    id: string
    hadleClose: () => void
}
const ChatDialogDelete = memo((props: PropsChatDialogDelete): JSX.Element => {
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
            <ChatPatternDialog
                open={props.open}
                img={SvgAngrySmileyFace}
                setOpen={() => props.hadleClose()}
            >
                <>
                    <DialogContent>
                        <h4 className="headline">Удалить чат?</h4>
                        <p className="text">
                            Вы действительно хотите удалить чат?
                            Это действие невозможно отменить и вся переписка будет стерта навсегда.
                        </p>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className="exit-btn"
                            onClick={() => props.hadleClose()}
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
                </>
            </ChatPatternDialog>
        </>
    )
})

export default ChatDialogDelete;
