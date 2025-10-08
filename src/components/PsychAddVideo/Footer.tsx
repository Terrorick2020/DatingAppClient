import { type JSX, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PSYCH_VIDEO_ADD_MARK } from '@/constant/quest';
import { publishPsychVideoAsync, editPsychVideoAsync } from '@/store/slices/videosSlice';
import { successAlert, warningAlert } from '@/funcs/alert.funcs';
import type { EditVideoData } from '@/types/videos.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import Button from '@mui/material/Button';


const btnText = [
    [ 'Сохранить изменения', 'Сохранение изменений...' ],
    [ 'Опубликовать', 'Публикация...' ],
];

interface PropsPsychAddVideoFooter {
    id: string
    setId: (value: string) => void
}
const PsychAddVideoFooter = (props: PropsPsychAddVideoFooter): JSX.Element => {
    const targetPsychVideo = useSelector((state: IState) => state.videos.targetPsychVideo);

    const [isLoad, setIsLoad] = useState<boolean>(false);

    const cacheData = useRef<string>('');

    const dispatch = useDispatch<RootDispatch>();

    const handleClick = async (): Promise<void> => {
        setIsLoad(true);

        let response = null;
        let errText = '';
        let infoText = '';

        if(props.id === PSYCH_VIDEO_ADD_MARK) {
            errText = 'Не удалось опубликовать видео! Попробуйте позже';
            infoText= 'Видео успешно опубликовано';
            response = await dispatch(publishPsychVideoAsync()).unwrap();
        } else {
            errText = 'Не удалось изменить видео! Попробуйте позже';
            infoText= 'Видео успешно изменено';

            if(targetPsychVideo.videoId) {
                const data: EditVideoData = {
                    videoId: targetPsychVideo.videoId,
                    title: targetPsychVideo.title,
                    description: targetPsychVideo.description,
                    isPublished: true,
                };

                response = await dispatch(editPsychVideoAsync(data)).unwrap();  
            };
        };

        if(!response || response === 'error') {
            warningAlert(dispatch, errText);
        } else {
            successAlert(dispatch, infoText);
            cacheData.current = JSON.stringify(targetPsychVideo);
            props.setId(''+targetPsychVideo.videoId);
        };

        setIsLoad(false);
    };

    useEffect(() => {
        cacheData.current = JSON.stringify(targetPsychVideo);
    }, []);

    const isDisabled = JSON.stringify(targetPsychVideo) === cacheData.current
        || !targetPsychVideo.description || !targetPsychVideo.key;

    return (
        <footer className="footer">
            <div className="link">
                <Button
                    fullWidth
                    variant="contained"
                    loadingPosition="start"
                    loading={isLoad}
                    disabled={isDisabled}
                    onClick={handleClick}
                >
                    { btnText[+(props.id === PSYCH_VIDEO_ADD_MARK)][+isLoad] }
                </Button>
            </div>
        </footer>
    )
};

export default PsychAddVideoFooter;
