import { JSX, useState } from 'react';

import BrochPatternDialog from '@/components/UI/BrochPatternDialog';
import Button from '@mui/material/Button';


const VideoInfoContentFooter = (): JSX.Element => {
    const [load, setLoad] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const handleDelete = async (): Promise<void> => {
    };

    const handlePublish = async (): Promise<void> => {
        setLoad(true);
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
