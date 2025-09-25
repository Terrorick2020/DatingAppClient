import { JSX, useMemo  } from 'react';
import { PSYCH_VIDEO_ADD_MARK } from '@/constant/quest';

import PsychAddVideoMainVideo from './Video';
import PlayerBtn from '@/components/UI/PlayerBtn';
import TextField from '@mui/material/TextField';


interface PropsPsychAddVideoMain {
    id: string
}
const PsychAddVideoMain = (props: PropsPsychAddVideoMain): JSX.Element => {

    const VideoHTML = useMemo((): JSX.Element => {
        return props.id === PSYCH_VIDEO_ADD_MARK
            ? <PsychAddVideoMainVideo />
            : <PlayerBtn urlImg='dvsdvsd' urlVideo='xdvsd' />
    }, [props.id]);

    return (
        <div className="content">
            <header className="header">
                <h3 className="headline">Загрузить видео</h3>
                <p className="description">Поделитесь опытом с другими</p>
            </header>
            <main className="main">
                <div className="main__item">
                    <h4 className="sub-headline">Прикрепите видео</h4>
                    <div className="video-box">
                        <div className='video-box__ctx'>
                            { VideoHTML }
                        </div>
                    </div>
                </div>
                <div className="main__item">
                    <h4 className="sub-headline">Название для видео</h4>
                    <TextField
                        className="video-name"
                        id="video-name"
                        fullWidth
                        placeholder="Название"
                    />
                </div>
            </main>
        </div>
    )
};

export default PsychAddVideoMain;
