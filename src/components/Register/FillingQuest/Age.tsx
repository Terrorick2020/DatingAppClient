import { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInfo } from '@/store/slices/profileSlice';
import { AGE_PATTERN } from '@/constant/settings';
import { type IState } from '@/types/store.types';

import TextField from '@mui/material/TextField'


const FillingQuestAge = () => {
    const profileInfo = useSelector((state: IState) => state.profile.info);
    const fQErrors = useSelector((state: IState) => state.settings.fQErrors);

    const dispatch = useDispatch();

    const handleChangeAge = (event: ChangeEvent<HTMLInputElement>): void => {
        const newAgeValue = event.target.value;

        if( !newAgeValue ) {
            dispatch(setInfo({
                ...profileInfo,
                age: null,
            }))

            return;
        }

        let isAge = AGE_PATTERN.test( newAgeValue ) && +newAgeValue <= 100;

        dispatch(setInfo({
            ...profileInfo,
            age: isAge ? +newAgeValue : profileInfo.age,
        }))
    }

    return (
        <>
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
                <p className="description">Минимальный возраст для регистрации: 18 лет</p>
            </div>
        </>
    )
}

export default FillingQuestAge