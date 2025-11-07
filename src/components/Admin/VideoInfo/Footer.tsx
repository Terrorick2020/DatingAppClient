import { JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dellRoute } from '@/store/slices/settingsSlice';
import { deletePsychVideoAsync, toggleVideoPublishedAsync } from '@/store/slices/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import BrochPatternDialog from '@/components/UI/BrochPatternDialog';
import Button from '@mui/material/Button';
import { successAlert, warningAlert } from '@/funcs/alert.funcs';


const VideoInfoContentFooter = (): JSX.Element => {
    const [load, setLoad] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const appRoutes = useSelector((state: IState) => state.settings.routes)

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();

    const goBack = () => {
        const backRoute = appRoutes.at(-1);

        if(backRoute === undefined || !backRoute) return;

        navigate(backRoute);
        dispatch(dellRoute());
    };

    const handleDelete = async (): Promise<void> => {
        const response = await dispatch(deletePsychVideoAsync()).unwrap();

        if(!response || response === 'error') {
            warningAlert(dispatch, 'Не удалось удалить видео');
        } else {
            successAlert(dispatch, 'Успешное удаление видео');
            goBack();
        };
    };

    const handlePublish = async (): Promise<void> => {
        setLoad(true);

        const response = await dispatch(toggleVideoPublishedAsync()).unwrap();

        if(!response || response === 'error') {
            warningAlert(dispatch, 'Не удалось изменить статус публикации');
        } else {
            successAlert(dispatch, 'Успешное изменение статуса публикации');
        };

        setLoad(false);
    };

    return (
        <>        
            <footer className="video-info-footer">
                <div className="link">
                    <Button
                        fullWidth
                        className="crimson"
                        variant="contained"
                        disabled={load}
                        onClick={() => setOpen(true)}
                    >Удалить видео</Button>
                </div>
                <div className="link">
                    <Button
                        fullWidth
                        className="text-block"
                        variant="contained"
                        loadingPosition="start"
                        loading={load}
                        disabled={load}
                        onClick={handlePublish}
                    >Снять с публикации</Button>
                </div>
            </footer>
            <BrochPatternDialog
                title="Вы действительно хотите удалить это видео?"
                btnTxt="Удалить"
                open={open}
                btnFunc={handleDelete}
                setOpen={setOpen}
            />
        </>
    )
}

export default VideoInfoContentFooter;
