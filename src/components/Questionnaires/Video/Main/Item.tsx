import { JSX, useState, MouseEvent, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { URL_MARK } from '@/config/env.config';
import { formatDate } from '@/funcs/general.funcs';
import { addRoute } from '@/store/slices/settingsSlice';
import { warningAlert } from '@/funcs/alert.funcs';
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


const VideoMainItem = (props: PropsVideoMainItem): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    
    const ref = useRef<HTMLDivElement | null>(null);

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const handleClose = (event: MouseEvent<HTMLLIElement>): void => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const handleRemovePublication = (event: MouseEvent<HTMLLIElement>): void => {
        props.setDialogType(VideoConfDType.Revoke);
        handleClose(event);
        props.setSelId(props.item.id);
        props.setOpenConf(true);
    };

    const handleEdit = async (event: MouseEvent<HTMLLIElement>): Promise<void> => {
        const response = await dispatch(getTargetPsychVideoAsync(props.item.id)).unwrap();
        
        if(!response) {
            warningAlert(dispatch, 'Не удалось получить информации о видео');
        } else {
            dispatch(addRoute(location.pathname));
            navigate(toPsychAddVideo.replace(`:${URL_MARK}`, ''+props.item.id));
        };

        handleClose(event);
    };

    const handleDelete = (event: MouseEvent<HTMLLIElement>): void => {
        props.setDialogType(VideoConfDType.Delete);
        handleClose(event);
        props.setSelId(props.item.id);
        props.setOpenConf(true);
    };

    const formatedDate = useMemo(
        (): string => formatDate(props.item.updatedAt),
        [props.item.updatedAt],
    );

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
                    src={ props.item.previewUrl }
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
