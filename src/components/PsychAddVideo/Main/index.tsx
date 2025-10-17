import { PSYCH_VIDEO_ADD_MARK } from '@/constant/quest';
import { EMPTY_INPUT_ERR_MSG } from '@/constant/settings';
import { setFAVErrors } from '@/store/slices/settingsSlice';
import { setTargetPsychVideo } from '@/store/slices/videosSlice';
import { useSelector, useDispatch } from 'react-redux';
import type { JSX, ChangeEvent } from 'react';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import PsychAddVideoMainVideo from './Video';
import PlayerBtn from '@/components/UI/PlayerBtn';
import TextField from '@mui/material/TextField';


interface PropsPsychAddVideoMain {
    id: string
}
const PsychAddVideoMain = (props: PropsPsychAddVideoMain): JSX.Element => {
    const targetPsychVideo = useSelector((state: IState) => state.videos.targetPsychVideo);
    const titleError = useSelector((state: IState) => state.settings.fAVErrors.titleErr);

    const dispatch = useDispatch<RootDispatch>();

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const title = event.target.value;
        const description  = event.target.value;

        dispatch(setTargetPsychVideo({ title, description }));

        dispatch(setFAVErrors({
            titleErr: {
                value: !title,
                msg: !title ? EMPTY_INPUT_ERR_MSG : '',
            },
        }));
    };

    return (
        <div className="content">
            <header className="header">
                <h3 className="headline">
                    {
                        props.id === PSYCH_VIDEO_ADD_MARK
                            ? 'Загрузить видео'
                            : 'Редактировать видео'
                    }
                </h3>
                { props.id === PSYCH_VIDEO_ADD_MARK
                        && <p className="description">Поделитесь опытом с другими</p> }
            </header>
            <main className="main">
                <div className="main__item">
                    { props.id === PSYCH_VIDEO_ADD_MARK
                        && <h4 className="sub-headline">Прикрепите видео</h4> }
                    <div className="video-box">
                        <div className='video-box__ctx'>
                            { props.id === PSYCH_VIDEO_ADD_MARK
                                ? <PsychAddVideoMainVideo />
                                : <PlayerBtn
                                    urlImg={targetPsychVideo.preview}
                                    urlVideo={targetPsychVideo.url}
                                />
                            }
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
                        value={targetPsychVideo.title}
                        helperText={titleError.msg}
                        error={titleError.value}
                        onChange={handleChange}
                    />
                </div>
            </main>
        </div>
    )
};

export default PsychAddVideoMain;
