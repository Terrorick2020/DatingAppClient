import { JSX } from 'react';

import PlayerBtn from '@/components/UI/PlayerBtn';
import VideoInfoContentMainInfo from './Info';

const VideoInfoContentMain = (): JSX.Element => {
    return (
        <main className="video-info-main">
            <div className="player-block">
                <PlayerBtn
                    urlImg={'https://image.winudf.com/v2/image/bW9iaS5hbmRyb2FwcC5wcm9zcGVyaXR5YXBwcy5jNTExMV9zY3JlZW5fN18xNTI0MDQxMDUwXzAyMQ/screen-7.jpg?fakeurl=1&type=.jpg'}
                    urlVideo={'ывмывмы'}
                />
            </div>
            <div className='text'>
                <h5 className="sub-headline">Название видео в три строки, Название видео в три строки</h5>
            </div>
            <VideoInfoContentMainInfo />
        </main>
    )
};

export default VideoInfoContentMain;
