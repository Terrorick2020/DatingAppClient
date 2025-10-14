import { type JSX, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { formatDate } from '@/funcs/general.funcs';
import { URL_MARK } from '@/config/env.config';
import { toUserInfo } from '@/config/routes.config';
import { addRoute } from '@/store/slices/settingsSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import type { PropsVideoInfoContentMainInfo } from '@/types/admin.types';
import type { RootDispatch } from '@/store';

import Chip from '@mui/material/Chip';
import AvatarWithPreload from '@/components/UI/AvatarWithPreload';


const VideoInfoContentMainInfo = (props: PropsVideoInfoContentMainInfo): JSX.Element => {
    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const handleRoute = (): void => {
        dispatch(addRoute(location.pathname));
        navigate(toUserInfo.replace(`:${URL_MARK}`, props.id))
    };

    const dateStr = useMemo((): string => formatDate( props.date, false ), []);

    return (
        <div className="info-block">
            <div className="info-block__item">
                <AvatarWithPreload
                    avatarUrl={props.url}
                    prefAlt={props.name}
                    size={40}
                    handleClick={handleRoute}
                />
                <div className="info" onClick={handleRoute}>
                    <p className="sub-hedline">Автор видео</p>
                    <p className="headline">{props.name}</p>
                </div>
            </div>
            <div className="info-block__item">
                <p className="sub-hedline">Дата и время публикации</p>
                <p className="headline">{dateStr}</p>
            </div>
            <div className="info-block__item">
                <p className="sub-hedline">Статус публикации</p>
                <Chip
                    className={props.isPublished ? 'lemon' : 'crimson'}
                    label={props.isPublished ? 'В ленте' : 'Снято с публикации'}
                />
            </div>
        </div>
    )
};

export default VideoInfoContentMainInfo;
