import { JSX } from 'react';
import { useDispatch } from 'react-redux';
import { URL_MARK } from '@/config/env.config';
import { toUserInfo } from '@/config/routes.config';
import { addRoute } from '@/store/slices/settingsSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import type { RootDispatch } from '@/store';

import Chip from '@mui/material/Chip';
import AvatarWithPreload from '@/components/UI/AvatarWithPreload';


const VideoInfoContentMainInfo = (): JSX.Element => {
    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const handleRoute = (): void => {
        dispatch(addRoute(location.pathname));
        navigate(toUserInfo.replace(`:${URL_MARK}`, 'dsvsdvsdv'))
    };

    return (
        <div className="info-block">
            <div className="info-block__item">
                <AvatarWithPreload
                    avatarUrl={''}
                    prefAlt={'sdvsdv'}
                    size={40}
                    handleClick={handleRoute}
                />
                <div className="info" onClick={handleRoute}>
                    <p className="sub-hedline">Автор видео</p>
                    <p className="headline">Александра</p>
                </div>
            </div>
            <div className="info-block__item">
                <p className="sub-hedline">Дата и время публикации</p>
                <p className="headline">20.14.2025</p>
            </div>
            <div className="info-block__item">
                <p className="sub-hedline">Статус публикации</p>
                <Chip className="lemon" label={'В ленте'} />
            </div>
        </div>
    )
};

export default VideoInfoContentMainInfo;
