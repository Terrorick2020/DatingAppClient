import { JSX } from 'react';

import Chip from '@mui/material/Chip';
import AvatarWithPreload from '@/components/UI/AvatarWithPreload';


const VideosListCtxItem = (): JSX.Element => {
    return (
        <div className="video-list-block">
            <div className="video-list-block__info">
                <div className="img"></div>
                <div className="text">
                    <h6 className="name">Название видео в три строки, Название видео в три строки, Название видео в три строки</h6>
                    <Chip className="lemon" label={'В ленте'} />
                </div>
            </div>
            <div className="video-list-block__author">
                <AvatarWithPreload 
                    avatarUrl=""
                    prefAlt="dsdvfd"
                    size={30}
                    handleClick={() => {}}
                />
                <div className="text">
                    <h6 className="name">Александра</h6>
                    <p className="description">20.14.2025</p>
                </div>
            </div>
        </div>
    )
}

export default VideosListCtxItem;
