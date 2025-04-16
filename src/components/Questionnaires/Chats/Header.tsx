import { useSelector } from 'react-redux';
import { type IState } from '@/types/store.types';

import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';


const ChatsHeader = () => {
    const chatsFavList = useSelector((state: IState) => state.chats.chatsFavList);

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
