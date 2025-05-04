import { useState } from 'react';

import IconButton from '@mui/joy/IconButton';
import LinkMsg from '@/components/UI/LinkMsg';
import SvgLink from '@/assets/icon/link.svg';


const ProfileLink = () => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = (): void => setOpen(true);

    return (
        <>
            <div className="link-box" onClick={handleOpen}>
                <div className="text">
                    <h4 className="headline">Пригласить</h4>
                    <p className="description opacity">Отправьте ссылку на ваш профиль</p>
                </div>
                <IconButton>
                    <img src={SvgLink} alt="link" />
                </IconButton>
            </div>
            <LinkMsg link={'https://t.me/BotFather'} open={open} setOpen={setOpen} />
        </>
    )
}

export default ProfileLink;
