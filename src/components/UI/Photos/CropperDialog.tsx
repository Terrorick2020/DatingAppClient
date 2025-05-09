import { JSX, useState, useCallback  } from 'react';
import { getCroppedImg } from '@/funcs/img.funcs';

import Cropper, { Area } from 'react-easy-crop';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


interface PropsPhotosCropperDialog {
    open: boolean
    setOpen: (value: boolean) => void
    photo: string
    handleAdd: (photo: File) => void
}
interface CropState {
    x: number
    y: number
}
const PhotosCropperDialog = (props: PropsPhotosCropperDialog): JSX.Element => {
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [dLoading, setDLoading] = useState<boolean>(false);
    const [crop, setCrop] = useState<CropState>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);
  
    const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleClose = (): void => {
        props.setOpen(false);
    };

    const handleCropPhoto = async (): Promise<void> => {
        setDLoading(true);
        try {
            if( !croppedAreaPixels ) return;

            const blob = await getCroppedImg(props.photo, croppedAreaPixels, 400, 480);
            
            if (!blob) return;

            const photo = new File([blob], 'cropped.jpg', { type: 'image/jpeg' });

            props.handleAdd(photo);
        } catch (error) {
            console.error('Ошибка при обрезке изображения:', error);
        } finally {
            setDLoading(false);
            handleClose();
        }
    };

    return (
        <>
            <Dialog
                keepMounted
                className="base-confirm cropper-confirm"
                aria-describedby="alert-dialog-photos-cropper"
                open={props.open}
                onClose={handleClose}
                slots={{ transition: Slide }}
                slotProps={{
                    transition: {
                    direction: 'up',
                    },
                }}
            >
                <DialogContent>
                    <Cropper
                        image={props.photo}
                        crop={crop}
                        zoom={zoom}
                        aspect={5 / 6}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        className="exit-btn"
                        onClick={handleClose}
                    >Отмена</Button>
                    <Button
                        fullWidth
                        loadingPosition="start"
                        className="save-btn"
                        loading={dLoading}
                        onClick={handleCropPhoto}
                    >
                        {dLoading ? 'Сохранение..' : 'Сохранить'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default PhotosCropperDialog;
