import { JSX, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_MARK } from '@/config/env.config';
import { toPsychAddVideo } from '@/config/routes.config';
import { VideoConfDType } from './index';

import Chip from '@mui/material/Chip';
import MenuBtn from '@/components/UI/MenuBtn';
import MenuItem from '@mui/material/MenuItem';
import SvgMoreCircle from '@/assets/icon/more-circle.svg';
import SvgChatTrash from '@/assets/icon/chat-trash.svg?react';
import SvgEdit from '@/assets/icon/edit.svg?react';
import SvgCross from '@/assets/icon/cross.svg?react';
import PngLeady from '@/assets/img/leady.png';


interface PropsVideoMainItem {
    setDialogType: (value: VideoConfDType) => void
    setOpenConf: (value: boolean) => void
}
const VideoMainItem = (props: PropsVideoMainItem): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const handleClose = (event: MouseEvent<HTMLLIElement>): void => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const handleRemovePublication = (event: MouseEvent<HTMLLIElement>): void => {
        props.setDialogType(VideoConfDType.Revoke);
        handleClose(event);
        props.setOpenConf(true);
    };

    const handleEdit = (event: MouseEvent<HTMLLIElement>): void => {
        navigate(toPsychAddVideo.replace(`:${URL_MARK}`, 'sdvdsvvdfbfgb'))
        handleClose(event);
    };

    const handleDelete = (event: MouseEvent<HTMLLIElement>): void => {
        props.setDialogType(VideoConfDType.Delete);
        handleClose(event);
        props.setOpenConf(true);
    };

    return (
        <div className="list__item">
            <div className="img">
                <img
                    alt="preiew"
                    loading="lazy"
                    decoding="async"
                    src={PngLeady}
                />
            </div>
            <div className="info">
                <div className="title">
                    <h5 className="text">Психология свиданий: Как понять своего партнера</h5>
                </div>
                <div className="date">
                    <h6 className="descreeption">Дата и время публикации</h6>
                    <p className="value">20.14.2025  14:51</p>
                </div>
                <div className="status">
                    <h6 className="descreeption">Статус</h6>
                    <Chip className="lemon" label={'В ленте'} />
                </div>
            </div>
            <div className="btn">
                <MenuBtn
                    id={`users-list-menu-${ 1 }`}
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    handleClose={handleClose}
                    btnIcon={SvgMoreCircle}
                    btnAddClass="video-btn"
                    menuAddClass="video-menu"
                >
                    <MenuItem onClick={handleRemovePublication}>
                        <SvgCross className="cross" />
                        <span className="text">Снять с публикации</span>
                    </MenuItem>
                    <MenuItem onClick={handleEdit}>
                        <SvgEdit />
                        <span className="text">Редактировать</span>
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                        <SvgChatTrash />
                        <span className="text">Удалить</span>
                    </MenuItem>
                </MenuBtn>
            </div>
        </div>
    )
}

export default VideoMainItem;
