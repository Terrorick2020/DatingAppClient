import { JSX, useState } from 'react';
import { useSelector } from 'react-redux';
import type { IState } from '@/types/store.types';

import IconButton from '@mui/joy/IconButton';
import LinkMsg from '@/components/UI/LinkMsg';
import SvgLink from '@/assets/icon/link-white.svg';


const ProfileLink = (): JSX.Element => {
    const addLink = useSelector((state: IState) => state.profile.addLink);

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
                    <img
                        src={SvgLink}
                        alt="link"
                        loading="lazy"
                        decoding="async"
                    />
                </IconButton>
            </div>
            <LinkMsg link={addLink} open={open} setOpen={setOpen} />
        </>
    )
}

export default ProfileLink;
