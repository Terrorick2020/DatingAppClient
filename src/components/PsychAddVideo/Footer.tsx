import { type JSX, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PSYCH_VIDEO_ADD_MARK } from '@/constant/quest';
import { publishPsychVideoAsync } from '@/store/slices/videosSlice';
import { successAlert, warningAlert } from '@/funcs/alert.funcs';
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

    const handlePublished = async (): Promise<void> => {
        setIsLoad(true);

        const response = await dispatch(publishPsychVideoAsync()).unwrap();

        if(!response || response === 'error') {
            warningAlert(dispatch, 'Не удалось опубликовать видео! Попробуйте позже');
        } else {
            successAlert(dispatch, 'Видео успешно опубликовано');
            cacheData.current = JSON.stringify(targetPsychVideo);
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
                    onClick={handlePublished}
                >
                    { btnText[+(props.id === PSYCH_VIDEO_ADD_MARK)][+isLoad] }
                </Button>
            </div>
        </footer>
    )
};

export default PsychAddVideoFooter;
