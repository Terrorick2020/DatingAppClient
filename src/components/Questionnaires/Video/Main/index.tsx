import {
    deletePsychVideoAsync,
    editPsychVideoAsync,
    getSelfPsychVideosAsync,
} from '@/store/slices/videosSlice';

import { type JSX, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialQuery } from '@/constant/chats';
import { errorAlert, successAlert, warningAlert } from '@/funcs/alert.funcs';
import { VideoConfDType } from '@/types/videos.types';
import type { InitSliderData } from '@/types/quest.types';
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

    const containerRef = useRef<HTMLDivElement>(null);
    const initData = useRef<InitSliderData>(initialQuery);
    const isDopLoad = useRef<boolean>(false);

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

    const handleVisible = async (index: number): Promise<void> => {
        if(
            isDopLoad.current      ||
            !selfPsychVideos.total ||
            selfPsychVideos.total <= selfPsychVideos.videos.length ||
            index + 3 < selfPsychVideos.videos.length
        )

        isDopLoad.current = true;


        const newData = {
            ...initData.current,
            offset: initData.current.offset + 1
        };

        const response = await dispatch(getSelfPsychVideosAsync(newData)).unwrap();

        if(response && response !== 'error') {
            initData.current = newData;
        };

        isDopLoad.current = false;
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const indexAttr = entry.target.getAttribute('data-index');
                        const index = indexAttr ? Number(indexAttr) : -1;
                        if (index >= 0) handleVisible(index);
                    }
                });
            },
            { threshold: 0.5 }
        );

        const items = containerRef.current.querySelectorAll('[data-index]');
        items.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [ selfPsychVideos.videos ]);

    useEffect(() => { initData.current.offset += 1 }, []);

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
            <main className="list" ref={containerRef}>
                {
                    selfPsychVideos.videos.map((item, index) => (
                        <VideoMainItem
                            key={`video-main-item-${item.id}`}
                            data-index={index}
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
