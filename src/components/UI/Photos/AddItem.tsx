import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { infoAlert, warningAlert } from '@/funcs/alert.funcs';
import type { RootDispatch } from '@/store';

import PhotosCropperDialog from './CropperDialog';
import SvgAdd from '@/assets/icon/add.svg';


interface PropsPhotosAddItem {
    handleAdd: (photo: File) => void
}
const PhotosAddItem = (props: PropsPhotosAddItem) => {
    const [open, setOpen] = useState<boolean>(false);
    const [photo, setPhoto] = useState<string>('');

    const dispatch = useDispatch<RootDispatch>();

    const handleChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        const file = event.target.files?.[0];
    
        if (!file) {
            warningAlert(
                dispatch,
                'Фотографи не загрузилась'
            );

            return;
        };
        
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 5 * 1024 * 1024;
        
        if (!validImageTypes.includes(file.type)) {
          infoAlert(
            dispatch,
            'Неправильный формат фотографии'
          );

          return;
        };
        
        if (file.size > maxSize) {
            infoAlert(
                dispatch,
                'Фотография превышает разрешённый размер: 5Mb',
            );

          return;
        };

        setPhoto(URL.createObjectURL(file));
        setOpen(true);

        event.target.value = '';
    }

    return (
        <>
            <li className="photos__item add">
                <input
                    className="btn"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                />
                <img src={SvgAdd} alt="camera" />
            </li>
            <PhotosCropperDialog
                open={open}
                setOpen={setOpen}
                photo={photo}
                handleAdd={props.handleAdd}
            />
        </>
    )
}

export default PhotosAddItem;
