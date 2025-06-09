import { JSX, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { toChats } from '@/config/routes.config';
import type { PropsChatDialogSessionEnd } from '@/types/chats.types';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import ChatPatternDialog from '@/components/UI/ChatPatternDialog';
import SvgClock from '@/assets/icon/clock.svg';


const ChatDialogSessionEnd = memo((props: PropsChatDialogSessionEnd): JSX.Element => {
    return (
        <ChatPatternDialog
            open={props.open}
            img={SvgClock}
            setOpen={() => props.setOpen(true)}
        >
            <DialogContent>
                <h4 className="headline">Время истекло</h4>
                <p className="text">
                    Время сессии знакомства истекло.
                    Чат с данным человеком был удален.
                    Начните диалог с другим пользователем.
                </p>
            </DialogContent>
            <DialogActions>
                <NavLink to={toChats}>
                    <Button
                        fullWidth
                        className="to-main-btn"
                    >На главную</Button>
                </NavLink>
            </DialogActions>
        </ChatPatternDialog>
    )
})

export default ChatDialogSessionEnd;
