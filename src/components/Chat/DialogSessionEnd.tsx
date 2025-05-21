import { JSX, memo } from 'react';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import ChatPatternDialog from '@/components/UI/ChatPatternDialog';
import SvgClock from '@/assets/icon/clock.svg';


interface PropsChatDialogSessionEnd {
    open: boolean
    setOpen: (value: boolean) => void
}
const ChatDialogSessionEnd = memo((props: PropsChatDialogSessionEnd): JSX.Element => {
    return (
        <>
            <ChatPatternDialog
                open={props.open}
                img={SvgClock}
                setOpen={props.setOpen}
            >
                <>
                    <DialogContent>
                        <h4 className="headline">Время истекло</h4>
                        <p className="text">
                            Время сессии знакомства истекло.
                            Чат с данным человеком был удален.
                            Начните диалог с другим пользователем.
                        </p>
                    </DialogContent>
                    <DialogActions>
                    <Button
                        fullWidth
                        className="to-main-btn"
                    >На главную</Button>
                    </DialogActions>
                </>
            </ChatPatternDialog>
        </>
    )
})

export default ChatDialogSessionEnd;
