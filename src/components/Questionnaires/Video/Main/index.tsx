import { type JSX, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { initialQuery } from '@/constant/chats';
import { VideoConfDType } from '@/types/videos.types';
import type { InitSliderData } from '@/types/quest.types';
import type { IState } from '@/types/store.types';

import VideoMainItem from './Item';
import BrochPatternDialog from '@/components/UI/BrochPatternDialog';
import SvgEmptyVideoPsych from '@/assets/icon/empty-psych-video.svg';


const VideoMain = (): JSX.Element => {
    const selfPsychVideos = useSelector((state: IState) => state.videos.selfPsychVideos);

    const [open, setOpen] = useState<boolean>(false);
    const [dialogType, setDialogType] = useState<VideoConfDType>(VideoConfDType.Revoke);

    const lastIndx = useRef<number | null>(null);
    const initQuery = useRef<InitSliderData>(initialQuery);

    const handleRemovePublication = async (): Promise<void> => {};
    const handleDelete = async (): Promise<void> => {};

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
                        ? handleRemovePublication
                        : handleDelete
                }
                setOpen={setOpen}
            />
        </>

    );
};

export default VideoMain;
