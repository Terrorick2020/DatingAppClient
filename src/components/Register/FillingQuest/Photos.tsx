import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFQErrors } from '@/store/slices/settingsSlice';
import { saveSelfPhotoAsync, deleteSelfPhotoAsync } from '@/store/slices/profileSlice';
import { warningAlert, errorAlert } from '@/funcs/alert.funcs';
import type { SavePhotoAsyncThuncData } from '@/types/profile.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import Photos from '@/components/UI/Photos';


const FillingQuestPhotos = (): JSX.Element => {
    const photos = useSelector((state: IState) => state.profile.info.photos);
    const fqErrors = useSelector((state: IState) => state.settings.fQErrors);

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();

    const handleAdd = async (photo: File, setUploadProgress: (value: number) => void): Promise<void> => {
        const data: SavePhotoAsyncThuncData = {
            photo,
            setUploadProgress
        };

        const response = await dispatch(saveSelfPhotoAsync(data)).unwrap();

        if(!response) {
            warningAlert(dispatch, 'Фотографию не удалось загрузить');
            return;
        } else if (response === 'error') {
            errorAlert(dispatch, 'Произошла ошибка при загрузке фотографии');
            navigate('error');
        } else {
            dispatch(setFQErrors({
                ...fqErrors,
                photErr: {
                    value: false,
                    msg: '',
                }
            }))
        }
    };

    const handleDel = async (id: string): Promise<void> => {
        await dispatch(deleteSelfPhotoAsync(id));
    };

    return (
        <div className="widgets__photo">
            <h4 className="headline">Мои фото</h4>
            <div className="items">
                <Photos photos={photos} handleAdd={handleAdd} handleDel={handleDel} />
            </div>
            {fqErrors.photErr.value && <p className="err-msg">{fqErrors.photErr.msg}</p>}
        </div>
    )
}

export default FillingQuestPhotos;
