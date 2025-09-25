import { JSX, useState } from 'react';

import VideoMainItem from './Item';
import BrochPatternDialog from '@/components/UI/BrochPatternDialog';


export enum VideoConfDType {
    Revoke = 'revoke',
    Delete = 'delete',
}
const VideoMain = (): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);
    const [dialogType, setDialogType] = useState<VideoConfDType>(VideoConfDType.Revoke);


    const handleRemovePublication = async (): Promise<void> => {};
    const handleDelete = async (): Promise<void> => {};

    return (
        <>
            <main className="list">
                <VideoMainItem
                    setDialogType={setDialogType}
                    setOpenConf={setOpen}
                />
                <VideoMainItem
                    setDialogType={setDialogType}
                    setOpenConf={setOpen}
                />
                <VideoMainItem
                    setDialogType={setDialogType}
                    setOpenConf={setOpen}
                />
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

    )
};

export default VideoMain;
