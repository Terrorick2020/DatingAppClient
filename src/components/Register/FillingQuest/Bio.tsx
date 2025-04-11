import { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInfo } from '@/store/slices/profileSlice';
<<<<<<< HEAD
import type { IState } from '@/types/store.types';
=======
import { type IState } from '@/types/store.types';
>>>>>>> dev

import TextField from '@mui/material/TextField';


const maxLenBio = 500;

const FillingQuestBio = () => {
<<<<<<< HEAD
    const profInfo = useSelector((state: IState) => state.profile.info);
    const regInpErr = useSelector((state: IState) => state.settings.regInpErr);
    
    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const text = event.target.value.substring(0, maxLenBio);

        dispatch(setInfo({
            ...profInfo,
            bio: text,
=======
    const profileInfo = useSelector((state: IState) => state.profile.info);
    const fQErrors = useSelector((state: IState) => state.settings.fQErrors);

    const dispatch = useDispatch();

    const handleChangeBio = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        dispatch(setInfo({
            ...profileInfo,
            bio: event.target.value,
>>>>>>> dev
        }))
    };

    return (
        <>
            <div className="widgets__bio">
<<<<<<< HEAD
                <h4 className="headline">Био <span className="count">{profInfo.bio.length}/500</span></h4>
=======
                <h4 className="headline">Био <span className="count">{profileInfo.bio.length}/500</span></h4>
>>>>>>> dev
                <TextField
                    className="bio-input"
                    id="bio-input"
                    multiline
                    fullWidth
                    minRows={5}
                    maxRows={10}
                    placeholder="Напишите немного о себе, это поможет пользователям лучше понять вас."
<<<<<<< HEAD
                    value={profInfo.bio}
                    onChange={handleChange}
                    error={regInpErr.bioErr}
                    helperText={'Поле не может быть пустым'}
=======
                    value={profileInfo.bio}
                    onChange={handleChangeBio}
                    error={fQErrors.bioErr.value}
                    helperText={fQErrors.bioErr.msg}
>>>>>>> dev
                    slotProps={{
                        input: {
                            inputProps: {
                                maxLength: maxLenBio,
                            },
                        },
                    }}
                />
            </div>
        </>
    )
}

export default FillingQuestBio
