import { type JSX, type MouseEvent, useMemo, useState } from 'react';
import { formatDate } from '@/funcs/general.funcs';
import { useShareLink } from '@/funcs/hooks';
import { toggleShortsLikeAsync } from '@/store/slices/videosSlice';
import { useDispatch } from 'react-redux';
import { warningAlert } from '@/funcs/alert.funcs';
import type { RootDispatch } from '@/store';
import type { PropsShortsCtxCaruselChildren } from '@/types/quest.types';

import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/joy/IconButton';
import AvatarWithPreload from '@/components/UI/AvatarWithPreload';
import SvgLink from '@/assets/icon/link-white.svg';
import SvgLike from '@/assets/icon/like.svg?react'


const ShortsCtxCaruselChildren = (props: PropsShortsCtxCaruselChildren): JSX.Element => {
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const { shareLink, isSharing } = useShareLink({
        text: 'Посмотри интересное видео от одого из ведущих специалистов с сфере психологии',
        title: 'Ссылка на интересное видео',
    });

    const dispatch = useDispatch<RootDispatch>();

    const handleLink = (e: MouseEvent): void => {
        e.stopPropagation();
        shareLink('Вставить сслыку');
    };

    const handleLike = async (e: MouseEvent): Promise<void> => {
        e.stopPropagation();

        setIsLoad(true);

        const response = await dispatch(toggleShortsLikeAsync(props.videoId)).unwrap();

        if(!response || response === 'error') {
            warningAlert(dispatch, 'Не удалось поставить лайк');
        };

        setIsLoad(false);
    };

    const handleAvatarClick = (): void =>  {};

    const formatedDate = useMemo(
        (): string => formatDate(props.uptAt, false),
        [props.uptAt],
    );

    return (
        <div className="shorts-carusel-slide__children">
            <div className="cldrn-box">
                <div className="cldrn-box__btns">
                    <div className="btns-right">
                        <IconButton
                            className="link-btn"
                            onClick={handleLink}
                            disabled={isSharing}
                        >
                            { isSharing
                                ? <CircularProgress size={23} />
                                : <img
                                    src={ SvgLink }
                                    alt="link"
                                    loading="lazy"
                                    decoding="async"
                                />
                            }
                        </IconButton>
                        <IconButton
                            className={`link-btn ${!isLoad && props.isLiked ? 'active' : ''}`}
                            onClick={handleLike}
                            disabled={isLoad}
                        >
                            { isLoad
                                ? <CircularProgress size={23} />
                                : <SvgLike />
                            }
                        </IconButton>
                    </div>
                </div>
                <div className="cldrn-box__info">
                    <div className="psych">
                        <AvatarWithPreload
                            avatarUrl={props.avatar}
                            prefAlt={'sdvsdvsd'}
                            addClass="shorts-psych"
                            handleClick={handleAvatarClick}
                        />
                        <div className="text">
                            <h5 className="name">{props.name}</h5>
                            <h6 className="date">{formatedDate}</h6>
                        </div>
                    </div>
                    <p className="short-name">{props.text}</p>
                </div>
            </div>
        </div>
    );
};

export default ShortsCtxCaruselChildren;
