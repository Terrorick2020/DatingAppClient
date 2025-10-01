import { type JSX, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { publishPsychVideoAsync } from '@/store/slices/videosSlice';
import { warningAlert } from '@/funcs/alert.funcs';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import Button from '@mui/material/Button';


const PsychAddVideoFooter = (): JSX.Element => {
    const targetPsychVideo = useSelector((state: IState) => state.videos.targetPsychVideo);

    const [isLoad, setIsLoad] = useState<boolean>(false);

    const cacheData = useRef<string>('');

    const dispatch = useDispatch<RootDispatch>();

    const handlePublished = async (): Promise<void> => {
        setIsLoad(true);

        const response = await dispatch(publishPsychVideoAsync()).unwrap();

        if(!response || response === 'error') {
            warningAlert(dispatch, 'Не удалось опубликовать видео! Попробуйте позже');
        };

        setIsLoad(false);
    };

    useEffect(() => {
        cacheData.current = JSON.stringify(targetPsychVideo);
    }, []);

    const isDisabled = JSON.stringify(targetPsychVideo) === cacheData.current;

    return (
        <footer className="footer">
            <div className="link">
                <Button
                    fullWidth
                    variant="contained"
                    loadingPosition="start"
                    disabled={isDisabled}
                    onClick={handlePublished}
                >
                    { isLoad ? 'Публикация...' : 'Опубликовать' }
                </Button>
            </div>
        </footer>
    )
};

export default PsychAddVideoFooter;
