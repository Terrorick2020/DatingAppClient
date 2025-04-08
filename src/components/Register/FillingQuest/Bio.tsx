import { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInfo } from '@/store/slices/profileSlice';
import type { IState } from '@/types/store.types';

import TextField from '@mui/material/TextField';


const maxLenBio = 500;

const FillingQuestBio = () => {
    const profInfo = useSelector((state: IState) => state.profile.info);
    const regInpErr = useSelector((state: IState) => state.settings.regInpErr);
    
    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const text = event.target.value.substring(0, maxLenBio);

        dispatch(setInfo({
            ...profInfo,
            bio: text,
        }))
    };

    return (
        <>
            <div className="widgets__bio">
                <h4 className="headline">Био <span className="count">{profInfo.bio.length}/500</span></h4>
                <TextField
                    className="bio-input"
                    id="bio-input"
                    multiline
                    fullWidth
                    minRows={5}
                    maxRows={10}
                    placeholder="Напишите немного о себе, это поможет пользователям лучше понять вас."
                    value={profInfo.bio}
                    onChange={handleChange}
                    error={regInpErr.bioErr}
                    helperText={'Поле не может быть пустым'}
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
