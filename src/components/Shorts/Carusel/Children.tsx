import { type JSX, type MouseEvent } from 'react';

import IconButton from '@mui/joy/IconButton';
import AvatarWithPreload from '@/components/UI/AvatarWithPreload';
import SvgLink from '@/assets/icon/link-white.svg';
import SvgLike from '@/assets/icon/like.svg?react'


const ShortsCtxCaruselChildren = (): JSX.Element => {
    const handleLink = (e: MouseEvent): void => {
        e.stopPropagation();
    };

    const handleLike = (e: MouseEvent): void => {
        e.stopPropagation();
    };

    const handleAvatarClick = (): void =>  {};

    return (
        <div className="shorts-carusel-slide__children">
            <div className="cldrn-box">
                <div className="cldrn-box__btns">
                    <div className="btns-right">
                        <IconButton
                            className="link-btn"
                            onClick={handleLink}
                        >
                            <img
                                src={ SvgLink }
                                alt="link"
                                loading="lazy"
                                decoding="async"
                            />
                        </IconButton>
                        <IconButton
                            className={`link-btn ${false ? 'active' : ''}`}
                            onClick={handleLike}
                        >
                            <SvgLike />
                        </IconButton>
                    </div>
                </div>
                <div className="cldrn-box__info">
                    <div className="psych">
                        <AvatarWithPreload
                            avatarUrl={''}
                            prefAlt={'sdvsdvsd'}
                            addClass="shorts-psych"
                            handleClick={handleAvatarClick}
                        />
                        <div className="text">
                            <h5 className="name">Александра</h5>
                            <h6 className="date">20.14.2025</h6>
                        </div>
                    </div>
                    <p className="short-name">Название видео в три строки, Название видео в три строки, Название видео в три строки</p>
                </div>
            </div>
        </div>
    );
};

export default ShortsCtxCaruselChildren;
