import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/joy/IconButton';

import PngWoman from '@/assets/img/woman.png';
import SvgOther from '@/assets/icon/other.svg?react';


const ChatHeader = () => {
    return (
        <>
            <div className="person">
                <Avatar
                    alt="chat-head-avatar"
                    src={PngWoman}
                />
                <div className="description">
                    <h6 className="name">Виктория, 20</h6>
                    <p className="status">Онлайн</p>
                </div>
            </div>
            <IconButton>
                <SvgOther />
            </IconButton>
        </>
    )
}

export default ChatHeader;
