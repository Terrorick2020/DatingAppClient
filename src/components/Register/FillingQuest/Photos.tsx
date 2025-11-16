import { JSX, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFQErrors } from '@/store/slices/settingsSlice';
import { toError } from '@/config/routes.config';
import { EProfileRoles } from '@/types/store.types';
import { createSelector } from 'reselect';
import { EMPTY_INPUT_ERR_MSG } from '@/constant/settings';
import { saveSelfPhotoAsync, deleteSelfPhotoAsync } from '@/store/slices/profileSlice';
import { warningAlert, errorAlert } from '@/funcs/alert.funcs';
import type { SavePhotoAsyncThuncData } from '@/types/profile.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import Photos from '@/components/UI/Photos';


const selectSettings = (state: IState) => state.settings;
const selectProfile = (state: IState) => state.profile;

const selectRegPhotos = createSelector(
    [selectSettings, selectProfile],
    (settings, profile) => ({
        photos: profile.info.photos,
        fQErrors: settings.fQErrors,
        profileRole: profile.info.role,
    })
);

const FillingQuestPhotos = (): JSX.Element => {
    const {photos, fQErrors, profileRole} = useSelector(selectRegPhotos);

    const hasDelete = useRef<boolean>(false);

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
            navigate(toError);
        } else {
            dispatch(setFQErrors({
                ...fQErrors,
                photErr: {
                    value: false,
                    msg: '',
                }
            }))
        }
    };

    const handleDel = async (id: string): Promise<void> => {
        hasDelete.current = true;
        
        await dispatch(deleteSelfPhotoAsync(id));
    };

    useEffect(() => {
        if(!hasDelete.current) return;

        !photos.length && dispatch(setFQErrors({
            ...fQErrors,
            photErr: {
                value: true,
                msg: EMPTY_INPUT_ERR_MSG,
            }
        }))
    }, [photos]);

    return (
        <div className="widgets__photo">
            <h4 className="headline">Мои фото</h4>
            <div className="items">
                <Photos
                    photos={photos}
                    maxPhotos={
                        profileRole === EProfileRoles.Psych
                            ? 1
                            : undefined
                    }
                    handleAdd={handleAdd}
                    handleDel={handleDel}
                />
            </div>
            {fQErrors.photErr.value && <p className="err-msg">{fQErrors.photErr.msg}</p>}
        </div>
    )
}

export default FillingQuestPhotos;
