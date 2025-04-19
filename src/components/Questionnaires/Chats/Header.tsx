import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appRoutes } from '@/config/routes.config';
import { addRoute } from '@/store/slices/settingsSlice';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';


const ChatsHeader = () => {
    const chatsFavList = useSelector((state: IState) => state.chats.chatsFavList);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<RootDispatch>();

    const toChat = (id: string) => {
        navigate(appRoutes.targetChat.replace(':id', `${id}`));
        dispatch(addRoute(location.pathname));
    }

    return (
        <>
            <h4 className="headline">Чаты</h4>
            <div className="history">
                {chatsFavList.map(item => (
                    <Badge
                        className="item"
                        key={`fav-hist-${item.id}`}
                        badgeContent={item.timer}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        onClick={() => toChat(item.id)}
                    >
                        <Avatar
                            alt="chat-head-avatar"
                            src={item.avatar}
                        />
                    </Badge>
                ))}
            </div>
        </>
    )
}

export default ChatsHeader;
