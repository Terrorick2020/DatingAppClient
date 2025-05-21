import { JSX } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveSelfPhotoAsync, deleteSelfPhotoAsync } from '@/store/slices/profileSlice';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import Photos from '@/components/UI/Photos';


const FillingQuestPhotos = (): JSX.Element => {
    const photos = useSelector((state: IState) => state.profile.info.photos);
    const photErr = useSelector((state: IState) => state.settings.fQErrors.photErr);

    const dispatch = useDispatch<RootDispatch>();

    const handleAdd = async (photo: File): Promise<void> => {
        await dispatch(saveSelfPhotoAsync(photo));
    }

    const handleDel = async (id: string): Promise<void> => {
        await dispatch(deleteSelfPhotoAsync(id));
    }

    return (
        <div className="widgets__photo">
            <h4 className="headline">Мои фото</h4>
            <div className="items">
                <Photos photos={photos} handleAdd={handleAdd} handleDel={handleDel} />
            </div>
            {photErr.value && <p className="err-msg">{photErr.msg}</p>}
        </div>
    )
}

export default FillingQuestPhotos;
