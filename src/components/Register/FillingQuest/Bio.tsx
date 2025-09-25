import { JSX, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInfo } from '@/store/slices/profileSlice';
import { EMPTY_INPUT_ERR_MSG } from '@/constant/settings';
import { MAX_LEN_BIO } from '@/constant/register';
import { setFQErrors } from '@/store/slices/settingsSlice';
import { type IState, EProfileRoles } from '@/types/store.types';

import TextField from '@mui/material/TextField';


const FillingQuestBio = (): JSX.Element => {
    const profileInfo = useSelector((state: IState) => state.profile.info);
    const fQErrors = useSelector((state: IState) => state.settings.fQErrors);

    const dispatch = useDispatch();

    const handleChangeBio = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const newValue = event.target.value;
        const bio = newValue.length < MAX_LEN_BIO ? newValue : profileInfo.bio;

        dispatch(setInfo({
            ...profileInfo,
            bio,
        }))

        dispatch(setFQErrors({
            ...fQErrors,
            bioErr: {
                value: !bio,
                msg: !bio ? EMPTY_INPUT_ERR_MSG : '',
            }
        }))
    };

    const isPsych = profileInfo.role === EProfileRoles.Psych;

    return (
        <div className="widgets__bio">
            <h4 className="headline">
                {
                    isPsych
                        ? 'О себе как о специалисте '
                        : 'Био '
                }
                <span className="count">{profileInfo?.bio?.length ?? 0}/{MAX_LEN_BIO}</span></h4>
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
                            maxLength: MAX_LEN_BIO,
                        },
                    },
                }}
            />
        </div>
    )
}

export default FillingQuestBio
