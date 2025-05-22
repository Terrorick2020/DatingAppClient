import { JSX, memo, useState, MouseEvent, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { appRoutes } from '@/config/routes.config';
import { lineStatusAttr } from '@/constant/settings';
import { setComplOpen, addRoute } from '@/store/slices/settingsSlice';
import { ageToStr } from '@/funcs/general.funcs';
import type { PropsChatHeader } from '@/types/chats.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import MenuBtn from '@/components/UI/MenuBtn';
import ComplaintDrawer from '@/components/Layouts/ComplaintDrawer';
import ChatDialogDelete from './DialogDelete';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import SvgVertOther from '@/assets/icon/vertical-other.svg';
import SvgChatWarn from '@/assets/icon/chat-warn.svg?react';
import SvgChatTrash from '@/assets/icon/chat-trash.svg?react';


const ChatHeader = memo((props: PropsChatHeader): JSX.Element => {
    const chatInterlocutor = useSelector((state: IState) => state.chats.targetChat.interlocutor);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDel, setOpenDel] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

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
    
    const handleNavToDetails = (): void => {
        const toDetails = appRoutes.details.replace(':id', props.id);

        dispatch(addRoute(location.pathname));
        navigate(toDetails);
    }

    const ageStr = useMemo(() => ageToStr(chatInterlocutor?.age ?? null), [chatInterlocutor?.age]);

    if(!chatInterlocutor) return (<></>)

    return (
        <> 
            <div className="person">
                <Avatar
                    alt="chat-head-avatar"
                    src={chatInterlocutor.avatar}
                    onClick={handleNavToDetails}
                />
                <div className="description">
                    <h6 className="name" onClick={handleNavToDetails}>
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
            <ChatDialogDelete open={openDel} id={props.id} handleClose={() => setOpenDel(false)} />
            <ComplaintDrawer id={props.id} />
        </>
    )
})

export default ChatHeader;
