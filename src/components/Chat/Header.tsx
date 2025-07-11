import { JSX, memo, useState, MouseEvent, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { appRoutes } from '@/config/routes.config';
import { lineStatusAttr } from '@/constant/settings';
import { setComplOpen, addRoute } from '@/store/slices/settingsSlice';
import { getNamespaceSocket, handleSocket } from '@/config/socket.config';
import { setInterLineStatus } from '@/store/slices/chatsSlice';
import { MsgsCltOnMeths, ChtasCltMethods } from '@/types/socket.types';
import { WS_MSGS, WS_CHATS } from '@/config/env.config';
import type { OnResTyping, OnResInterLineStat } from '@/types/socket.types';
import type { PropsChatHeader } from '@/types/chats.types';
import type { RootDispatch } from '@/store';
import { type IState, ETypingStatus, ELineStatus } from '@/types/store.types';

import MenuBtn from '@/components/UI/MenuBtn';
import ComplaintDrawer from '@/components/Layouts/ComplaintDrawer';
import ChatDialogDelete from './DialogDelete';
import AvatarWithPreload from '@/components/UI/AvatarWithPreload';
import MenuItem from '@mui/material/MenuItem';
import SvgVertOther from '@/assets/icon/vertical-other.svg';
import SvgChatWarn from '@/assets/icon/chat-warn.svg?react';
import SvgChatTrash from '@/assets/icon/chat-trash.svg?react';


const ChatHeader = memo((props: PropsChatHeader): JSX.Element => {
    const chatInterlocutor = useSelector((state: IState) => state.chats.targetChat.interlocutor);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDel, setOpenDel] = useState<boolean>(false);
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const handleTyping = (data: OnResTyping | null): void => {
        if(!data) return;

        setIsTyping(data.isTyping);
    }

    const handleUserStatus = (data: OnResInterLineStat | null): void => {
        if(!data) return

        dispatch(setInterLineStatus(data.status));
    }


    useEffect(() => {
        const msgsSocket = getNamespaceSocket(WS_MSGS);
        const chatsSocket = getNamespaceSocket(WS_CHATS);

        handleSocket<OnResTyping>(msgsSocket, MsgsCltOnMeths.typingStatus, handleTyping);
        handleSocket<OnResInterLineStat>(chatsSocket, ChtasCltMethods.userStatus, handleUserStatus);

        return () => {
            msgsSocket?.off(MsgsCltOnMeths.typingStatus);
            chatsSocket?.off(ChtasCltMethods.userStatus);
        }
    }, [props.id])

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
        if( chatInterlocutor?.id ) {
            const toDetails = appRoutes.details.replace(':id', chatInterlocutor.id);

            dispatch(addRoute(location.pathname));
            navigate(toDetails);
        }
    }

    const lineMemoCtx = useMemo(() => {
        if( isTyping ) return lineStatusAttr[ETypingStatus.Typing];

        return lineStatusAttr[chatInterlocutor?.lineStat || ELineStatus.Offline];
    }, [chatInterlocutor?.lineStat, isTyping]);

    if(!chatInterlocutor || !props.id) return (<></>);

    return (
        <> 
            <div className="person">
                <AvatarWithPreload
                    avatarUrl={chatInterlocutor.avatar}
                    prefAlt={chatInterlocutor.name}
                    handleClick={handleNavToDetails}
                />
                <div className="description">
                    <h6 className="name" onClick={handleNavToDetails}>
                        {`${chatInterlocutor.name} ${chatInterlocutor?.age ? ', ' + chatInterlocutor?.age : ''}`}
                    </h6>
                    <span className={`line ${lineMemoCtx.addClass}`}>
                        {lineMemoCtx.text}
                    </span>
                </div>
            </div>
            <MenuBtn
                id="chat-head-menu"
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
            <ComplaintDrawer id={chatInterlocutor.id} />
        </>
    )
})

export default ChatHeader;
