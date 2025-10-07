import { JSX, useState, MouseEvent, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { URL_MARK } from '@/config/env.config';
import { getTargetPsychVideoAsync } from '@/store/slices/videosSlice';
import { toPsychAddVideo } from '@/config/routes.config';
import { type PropsVideoMainItem, VideoConfDType } from '@/types/videos.types';
import type { RootDispatch } from '@/store';

import Chip from '@mui/material/Chip';
import MenuBtn from '@/components/UI/MenuBtn';
import MenuItem from '@mui/material/MenuItem';
import SvgMoreCircle from '@/assets/icon/more-circle.svg';
import SvgChatTrash from '@/assets/icon/chat-trash.svg?react';
import SvgEdit from '@/assets/icon/edit.svg?react';
import SvgCross from '@/assets/icon/cross.svg?react';
import PngLeady from '@/assets/img/leady.png';


const VideoMainItem = (props: PropsVideoMainItem): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    
    const ref = useRef<HTMLDivElement | null>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch<RootDispatch>();

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
        dispatch(getTargetPsychVideoAsync(props.item.id));
        navigate(toPsychAddVideo.replace(`:${URL_MARK}`, ''+props.item.id));
        handleClose(event);
    };

    const handleDelete = (event: MouseEvent<HTMLLIElement>): void => {
        props.setDialogType(VideoConfDType.Delete);
        handleClose(event);
        props.setOpenConf(true);
    };

    const formatedDate = useMemo((): string => {
        const date = new Date(props.item.updatedAt);

        const formatted = new Intl.DateTimeFormat("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }).format(date);

        return formatted.replace(',', ' ');
    }, [props.item.updatedAt]);

    useEffect(() => {
        if (!ref.current) return;

        const scrollParent = ref.current.closest('.video-page');

        if (!scrollParent) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    console.log('Виден элемент id:', props.item.id);
                }
            },
            {
                root: scrollParent,
                threshold: 0.5,
            }
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [props.item.id]);

    return (
        <div className="list__item" ref={ref}>
            <div className="img">
                <img
                    alt="preiew"
                    loading="lazy"
                    decoding="async"
                    src={ PngLeady }
                />
            </div>
            <div className="info">
                <div className="title">
                    <h5 className="text">{ props.item.title }</h5>
                </div>
                <div className="date">
                    <h6 className="descreeption">Дата и время публикации</h6>
                    <p className="value">{ formatedDate }</p>
                </div>
                <div className="status">
                    <h6 className="descreeption">Статус</h6>
                    <Chip
                        className={ props.item.isPublished ? 'lemon' : 'crimson' }
                        label={ props.item.isPublished ? 'В ленте' : 'Снято с публикации'}
                    />
                </div>
            </div>
            <div className="btn">
                <MenuBtn
                    id={ `users-list-menu-${ props.item.id }` }
                    anchorEl={ anchorEl }
                    setAnchorEl={ setAnchorEl }
                    handleClose={ handleClose }
                    btnIcon={ SvgMoreCircle }
                    btnAddClass="video-btn"
                    menuAddClass="video-menu"
                >
                    <MenuItem onClick={ handleRemovePublication }>
                        <SvgCross className={ props.item.isPublished ? 'cross' : '' } />
                        <span className="text">
                            {
                                props.item.isPublished
                                    ? 'Снять с публикации'
                                    : 'Опубликовать'
                            }
                        </span>
                    </MenuItem>
                    <MenuItem onClick={ handleEdit }>
                        <SvgEdit />
                        <span className="text">Редактировать</span>
                    </MenuItem>
                    <MenuItem onClick={ handleDelete }>
                        <SvgChatTrash />
                        <span className="text">Удалить</span>
                    </MenuItem>
                </MenuBtn>
            </div>
        </div>
    );
};

export default VideoMainItem;
