import { type JSX, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_MARK } from '@/config/env.config';
import { toVideoInfo } from '@/config/routes.config';
import { formatDate } from '@/funcs/general.funcs';
import type { PropsVideosLiatItem } from '@/types/admin.types';

import Chip from '@mui/material/Chip';
import AvatarWithPreload from '@/components/UI/AvatarWithPreload';


const VideosListCtxItem = (props: PropsVideosLiatItem): JSX.Element => {
    const navigate = useNavigate();

    const handleClick = (): void => {
        navigate(toVideoInfo.replace(`:${URL_MARK}`, ''+props.item.id));
    };
    
    const { dateStr, isPubls } = useMemo(() => {
        const dateStr = formatDate( props.item.createdAt, false );
        const isPubls = props.item.isPublished;

        return { dateStr, isPubls };
    }, [ props.item.isPublished, props.item.createdAt ]);

    return (
        <div
            className="video-list-block"
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
                    handleClick={() => {}}
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
