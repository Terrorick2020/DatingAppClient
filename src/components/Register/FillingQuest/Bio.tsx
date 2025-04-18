import { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInfo } from '@/store/slices/profileSlice';
import { type IState } from '@/types/store.types';

import TextField from '@mui/material/TextField';


const maxLenBio = 500;

const FillingQuestBio = () => {
    const profileInfo = useSelector((state: IState) => state.profile.info);
    const fQErrors = useSelector((state: IState) => state.settings.fQErrors);

    const dispatch = useDispatch();

    const handleChangeBio = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        dispatch(setInfo({
            ...profileInfo,
            bio: event.target.value,
        }))
    };

    return (
        <>
            <div className="widgets__bio">
                <h4 className="headline">Био <span className="count">{profileInfo.bio.length}/500</span></h4>
                <TextField
                    className="bio-input"
                    id="bio-input"
                    multiline
                    fullWidth
                    minRows={5}
                    maxRows={10}
                    placeholder="Напишите немного о себе, это поможет пользователям лучше понять вас."
                    value={profileInfo.bio}
                    onChange={handleChangeBio}
                    error={fQErrors.bioErr.value}
                    helperText={fQErrors.bioErr.msg}
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
