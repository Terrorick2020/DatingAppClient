import { useState, MouseEvent, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { lineStatusAttr } from '@/constant/settings';
import { setComplOpen } from '@/store/slices/settingsSlice';
import { ageToStr } from '@/funcs/general.funcs';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import MenuBtn from '@/components/UI/MenuBtn';
import ComplaintDrawer from '@/components/Layouts/ComplaintDrawer';
import ChatDialogDelete from './DialogDelete';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import SvgVertOther from '@/assets/icon/vertical-other.svg';
import SvgChatWarn from '@/assets/icon/chat-warn.svg?react';
import SvgChatTrash from '@/assets/icon/chat-trash.svg?react';


interface PropsChatHeader {
    id: string
}
const ChatHeader = (props: PropsChatHeader) => {
    const chatInterlocutor = useSelector((state: IState) => state.chats.targetChat.interlocutor);

    const dispatch = useDispatch<RootDispatch>();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDel, setOpenDel] = useState<boolean>(false);

    const handleMenuClose = (event: MouseEvent<HTMLLIElement>): void => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const hadleComplain = (event: MouseEvent<HTMLLIElement>): void => {
        dispatch(setComplOpen(true));
        handleMenuClose(event);
    };

    const handleOpenDeletePanel = (event: MouseEvent<HTMLLIElement>): void => {
        setOpenDel(true);
        handleMenuClose(event);
    };

    const ageStr = useMemo(() => ageToStr(chatInterlocutor?.age ?? null), [chatInterlocutor?.age]);

    return (
        chatInterlocutor && <> 
            <div className="person">
                <Avatar
                    alt="chat-head-avatar"
                    src={chatInterlocutor.avatar}
                />
                <div className="description">
                    <h6 className="name">
                        {`${chatInterlocutor.name}, ${ageStr}`}
                    </h6>
                    <span className={`line ${lineStatusAttr[chatInterlocutor.lineStat].addClass}`}>
                        {lineStatusAttr[chatInterlocutor.lineStat].text}
                    </span>
                </div>
            </div>
            <MenuBtn
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                handleClose={handleMenuClose}
                btnIcon={SvgVertOther}
                btnAddClass="chat-btn"
                menuAddClass="chat-menu"
            >
                <MenuItem onClick={hadleComplain}>
                    <SvgChatWarn />
                    <span className="text">Пожаловаться</span>
                </MenuItem>
                <MenuItem onClick={handleOpenDeletePanel}>
                    <SvgChatTrash />
                    <span className="text">Удалить чат</span>
                </MenuItem>
            </MenuBtn>
            <ChatDialogDelete open={openDel} id={props.id} hadleClose={() => setOpenDel(false)} />
            <ComplaintDrawer id={props.id} />
        </>
    )
}

export default ChatHeader;
