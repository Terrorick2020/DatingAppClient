import { JSX, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EMPTY_INPUT_ERR_MSG } from '@/constant/settings';
import { setInfo } from '@/store/slices/profileSlice';
import { setFQErrors } from '@/store/slices/settingsSlice';
import { AGE_PATTERN } from '@/constant/settings';
import { type IState } from '@/types/store.types';

import TextField from '@mui/material/TextField'


const FillingQuestAge = (): JSX.Element => {
    const profileInfo = useSelector((state: IState) => state.profile.info);
    const fQErrors = useSelector((state: IState) => state.settings.fQErrors);

    const dispatch = useDispatch();

    const handleChangeAge = (event: ChangeEvent<HTMLInputElement>): void => {
        const newAgeValue = event.target.value;
        const isAge = AGE_PATTERN.test( newAgeValue ) && +newAgeValue <= 100;
        const age = isAge ? +newAgeValue : profileInfo.age;

        dispatch(setFQErrors({
            ...fQErrors,
            ageErr: {
                value: !newAgeValue || ( !!age && age < 18 ),
                msg: !newAgeValue ? EMPTY_INPUT_ERR_MSG : '',
            }
        }))

        if( !newAgeValue ) {
            dispatch(setInfo({
                ...profileInfo,
                age: null,
            }))

            return;
        }

        dispatch(setInfo({
            ...profileInfo,
            age,
        }))
    }

    return (
        <div className="widgets__age">
            <h4>Сколько вам лет</h4>
                <TextField
                    className="age-input"
                    id="age-input"
                    fullWidth
                    placeholder="Возвраст"
                    value={profileInfo.age || ''}
                    onChange={handleChangeAge}
                    error={fQErrors.ageErr.value}
                    helperText={fQErrors.ageErr.msg}
                />
            {!fQErrors.ageErr.msg &&<p className={`description ${fQErrors.ageErr.value ? 'red-flag' : ''}`}
            >Минимальный возраст для регистрации: 18 лет</p>}
        </div>
    )
}

export default FillingQuestAge;
