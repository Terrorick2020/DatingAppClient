import { type JSX, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addRoute } from '@/store/slices/settingsSlice';
import { URL_MARK } from '@/config/env.config';
import { EProfileRoles } from '@/types/store.types';
import { toVideoInfo, toUserInfo } from '@/config/routes.config';
import { formatDate } from '@/funcs/general.funcs';
import type { PropsVideosLiatItem } from '@/types/admin.types';
import type { RootDispatch } from '@/store';

import Chip from '@mui/material/Chip';
import AvatarWithPreload from '@/components/UI/AvatarWithPreload';


const VideosListCtxItem = (props: PropsVideosLiatItem): JSX.Element => {
    const ref = useRef<HTMLDivElement | null>(null);

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (): void => {
        dispatch(addRoute(location.pathname));
        navigate(toVideoInfo.replace(`:${URL_MARK}`, ''+props.item.id));
    };

    const handleRouteToPsych = (): void => {
        dispatch(addRoute(location.pathname));
        navigate(
            toUserInfo
                .replace(`:${URL_MARK}`, ''+props.item.psychologist.id)
                .replace(EProfileRoles.User, EProfileRoles.Psych)
        );
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        props.dopLoad(props.index)
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [props.item.id]);
    
    const { dateStr, isPubls } = useMemo(() => {
        const dateStr = formatDate( props.item.createdAt, false );
        const isPubls = props.item.isPublished;

        return { dateStr, isPubls };
    }, [ props.item.isPublished, props.item.createdAt ]);

    return (
        <div
            className="video-list-block"
            ref={ ref }
            onClick={ handleClick }
        >
            <div className="video-list-block__info">
                <div
                    className="img"
                    style={{
                        backgroundImage: `url(${ props.item.previewUrl })`,
                    }}
                />
                <div className="text">
                    <h6 className="name">{ props.item.title }</h6>
                    <Chip
                        className={ isPubls ? 'lemon' : 'crimson' }
                        label={ isPubls ? 'В ленте' : 'Снято с публикации' }
                    />
                </div>
            </div>
            <div className="video-list-block__author">
                <AvatarWithPreload 
                    avatarUrl={ props.item.psychologist.photoUrl }
                    prefAlt={ props.item.psychologist.name }
                    size={ 30 }
                    handleClick={handleRouteToPsych}
                />
                <div className="text">
                    <h6 className="name">{ props.item.psychologist.name }</h6>
                    <p className="description">{ dateStr }</p>
                </div>
            </div>
        </div>
    );
};

export default VideosListCtxItem;
