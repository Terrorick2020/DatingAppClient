import { ChangeEvent, JSX, memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { delay } from '@/funcs/general.funcs';
import { infoAlert, warningAlert } from '@/funcs/alert.funcs';
import { validImageTypes, maxImgSize } from '@/constant/ui';
import type { RootDispatch } from '@/store';
import type { PropsPhotosAddItem } from '@/types/ui.types';

import PhotosCropperDialog from './CropperDialog';
import SvgAdd from '@/assets/icon/add.svg';


const PhotosAddItem = memo((props: PropsPhotosAddItem): JSX.Element => {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [photo, setPhoto] = useState<string>('');

    const dispatch = useDispatch<RootDispatch>();

    const handleChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (isProcessing) return;
    
        setIsProcessing(true);

        await delay(100);

        try {
            const file = event.target.files?.[0];

            if (!file) {
                warningAlert(
                    dispatch,
                    'Фотографи не загрузилась'
                );

                return;
            };
            
            if (!validImageTypes.includes(file.type)) {
                infoAlert(
                    dispatch,
                    'Неправильный формат фотографии'
                );

                return;
            };
            
            if (file.size > maxImgSize) {
                infoAlert(
                    dispatch,
                    'Фотография превышает максимально разрешённый размер',
                );

                return;
            };

            processFile(file);

        } catch {
            warningAlert(
                dispatch,
                'Произошла ошибка при обработке файла'
            );
        } finally {
            if (event.target) {
                event.target.value = '';
            };

            setIsProcessing(false);
        }
    };

    const processFile = (file: File) => {
        const reader = new FileReader();
  
        reader.onload = () => {
            const result = reader.result as string;
            const img = new Image();
            
            img.onload = () => {
                setPhoto(result);
                setOpen(true);
            };
            
            img.onerror = () => {
                infoAlert(dispatch, 'Ошибка при загрузке изображения');
            };
            
            img.src = result;
        };
  
        reader.onerror = () => {
            infoAlert(dispatch, 'Ошибка чтения файла');
        };
  
        reader.readAsDataURL(file);
    };

    return (
        <>
            <li className="photos__item add">
                <input
                    className="btn"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                />
                <img
                    src={SvgAdd}
                    alt="camera"
                    loading="lazy"
                    decoding="async"
                />
            </li>
            <PhotosCropperDialog
                open={open}
                setOpen={setOpen}
                photo={photo}
                handleAdd={props.handleAdd}
            />
        </>
    )
})

export default PhotosAddItem;
