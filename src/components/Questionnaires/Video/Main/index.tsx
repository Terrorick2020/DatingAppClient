import { type JSX, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { errorAlert, successAlert, warningAlert } from '@/funcs/alert.funcs';
import { VideoConfDType } from '@/types/videos.types';
import { deletePsychVideoAsync, editPsychVideoAsync } from '@/store/slices/videosSlice';
import type { EditVideoData } from '@/types/videos.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import VideoMainItem from './Item';
import BrochPatternDialog from '@/components/UI/BrochPatternDialog';
import SvgEmptyVideoPsych from '@/assets/icon/empty-psych-video.svg';


const VideoMain = (): JSX.Element => {
    const selfPsychVideos = useSelector((state: IState) => state.videos.selfPsychVideos);

    const [open, setOpen] = useState<boolean>(false);
    const [dialogType, setDialogType] = useState<VideoConfDType>(VideoConfDType.Revoke);
    const [selId, setSelId] = useState<number | null>(null);

    const dispatch = useDispatch<RootDispatch>();

    const handleTogglePublication = async (): Promise<void> => {
        const text = 'Ошибка измения статуса публикации видео';

        if(!selId) {
            errorAlert(dispatch, text);
            return;
        };

        const targetVideo = selfPsychVideos.videos.find(
            item => item.id === selId
        );

        if(!targetVideo) {
            errorAlert(dispatch, text);
            return;
        };

        const data: EditVideoData = {
            videoId: targetVideo.id,
            title: targetVideo.title,
            description: targetVideo.description,
            isPublished: !targetVideo.isPublished
        };

        const response = await dispatch(editPsychVideoAsync(data)).unwrap();

        if(!response || response === 'error') {
            warningAlert(dispatch, text);
            return;
        };

        successAlert(dispatch, 'Статус публицаии видео успешно изменён')
    };

    const handleDelete = async (): Promise<void> => {
        if(!selId) {
            errorAlert(dispatch, 'Ошибка удаления видео');
            return;
        };

        const response = await dispatch(deletePsychVideoAsync(selId)).unwrap();

        if(!response || response === 'error') {
            errorAlert(dispatch, 'Ошибка удаления видео');
        } else {
            successAlert(dispatch, 'Видео успешно удалено')
        };
    };

    if(!selfPsychVideos.total || !selfPsychVideos.videos.length) return (
        <div className="empty">
            <img
                src={SvgEmptyVideoPsych}
                alt="quests-empty"
                loading="lazy"
                decoding="async"
            />
            <h4 className="headline">У вас нет сохранённых видео</h4>
            <p className="text">
                Нажмите на кнопку, чтобы добавить видео.
                Это поможет получить дополнительную аудиторию
            </p>
        </div>
    );

    return (
        <>
            <main className="list">
                {
                    selfPsychVideos.videos.map(item => (
                        <VideoMainItem
                            key={`video-main-item-${item.id}`}
                            item={item}
                            setSelId={setSelId}
                            setDialogType={setDialogType}
                            setOpenConf={setOpen}
                        />
                    ))
                }
            </main>
            <BrochPatternDialog
                title={
                    dialogType === VideoConfDType.Revoke
                        ? 'Вы действительно хотите снять с публикации это видео?'
                        : 'Вы действительно хотите удалить это видео?'
                }
                btnTxt={
                    dialogType === VideoConfDType.Revoke
                        ? 'Снять'
                        : 'Удалить'
                }
                open={open}
                btnFunc={
                    dialogType === VideoConfDType.Revoke
                        ? handleTogglePublication
                        : handleDelete
                }
                setOpen={setOpen}
            />
        </>

    );
};

export default VideoMain;
