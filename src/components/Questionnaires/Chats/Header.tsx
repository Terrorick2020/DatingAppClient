import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';

import PngWoman from '@/assets/img/woman.png';


const msgList = [
    {id: 0, content: '15:41'},
    {id: 1, content: '15:41'},
    {id: 2, content: '15:41'},
    {id: 3, content: '15:41'},
    {id: 4, content: '15:41'},
    {id: 5, content: '15:41'},
    {id: 6, content: '15:41'},
    {id: 7, content: '15:41'},
]
const ChatsHeader = () => {
    return (
        <>
            <h4 className="headline">Чаты</h4>
            <div className="history">
                {msgList.map(item => (
                    <Badge
                        className="item"
                        badgeContent={item.content}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                    >
                        <Avatar
                            alt="chat-head-avatar"
                            src={PngWoman}
                        />
                    </Badge>
                ))}
            </div>
        </>
    )
}

export default ChatsHeader
