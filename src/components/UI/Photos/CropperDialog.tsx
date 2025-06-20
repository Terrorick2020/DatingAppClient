import {
    JSX,
    memo,
    useState,
    useCallback,
    useEffect,
    KeyboardEvent,
} from 'react';

import { getCroppedImg } from '@/funcs/img.funcs';
import { warningAlert } from '@/funcs/alert.funcs';
import { useDispatch } from 'react-redux';
import type { PropsPhotosCropperDialog, CropState } from '@/types/ui.types';
import type { RootDispatch } from '@/store';

import Cropper, { Area } from 'react-easy-crop';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


const PhotosCropperDialog = memo((props: PropsPhotosCropperDialog): JSX.Element => {
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [dLoading, setDLoading] = useState<boolean>(false);
    const [crop, setCrop] = useState<CropState>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);

    const dispatch = useDispatch<RootDispatch>();

    useEffect(() => {
        if (props.open) {
            setCrop({ x: 0, y: 0 });
            setZoom(1);
        }
    },[props.open]);
  
    const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(prev => {
            if (JSON.stringify(prev) === JSON.stringify(croppedAreaPixels)) {
                return prev;
            };

            return croppedAreaPixels;
        });
    }, []);

    const handleClose = (): void => {
        setCroppedAreaPixels(null);
        setDLoading(false);
        props.setOpen(false);
    };

    const handleCropPhoto = async (): Promise<void> => {
        setDLoading(true);
        try {
            if( !croppedAreaPixels ) return;

            const blob = await getCroppedImg(props.photo, croppedAreaPixels, 400, 480);
            
            if (!blob) throw new Error('Ошибка обрезки картинци');

            const photo = new File([blob], 'cropped.jpg', { type: 'image/jpeg' });

            props.handleAdd(photo);
        } catch (error) {
            warningAlert(dispatch, 'Ошибка при обрезке изображения');
        } finally {
            setDLoading(false);
            handleClose();
        }
    };

    const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>): void => {
        if (!props.open) return;
        if (event.key === 'Escape') {
            event.preventDefault();
            handleClose();
        } else if (event.key === 'Enter') {
            event.preventDefault();
            handleCropPhoto();
        }
    }, [props.open, croppedAreaPixels]);

    useEffect(() => {
        return () => { URL.revokeObjectURL(props.photo) };
    }, [props.photo]);

    return (
        <Dialog
            keepMounted
            className="base-confirm cropper-confirm"
            aria-describedby="alert-dialog-photos-cropper"
            open={props.open}
            onClose={handleClose}
            onKeyDown={handleKeyDown}
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
    )
})

export default PhotosCropperDialog;
