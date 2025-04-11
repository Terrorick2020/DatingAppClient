import { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInfo } from '@/store/slices/profileSlice';
<<<<<<< HEAD
import type { IState } from '@/types/store.types';
=======
import { AGE_PATTERN } from '@/constant/settings';
import { type IState } from '@/types/store.types';

import TextField from '@mui/material/TextField'
>>>>>>> dev

import TextField from '@mui/material/TextField';


const agePattern = /^\d+$/;

const FillingQuestAge = () => {
<<<<<<< HEAD
    const profInfo = useSelector((state: IState) => state.profile.info);
    const regInpErr = useSelector((state: IState) => state.settings.regInpErr);

    const dispatch = useDispatch();

    const handleChangeAge = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value.trim()

        if( !newValue.length ) {
            dispatch(setInfo({
                ...profInfo,
                age: null,
            }))
            return;
        }

        const ageCondition = agePattern.test( newValue ) && Number( newValue ) >= 1 && Number( newValue ) <= 100;

        dispatch(setInfo({
            ...profInfo,
            age: ageCondition ? newValue : profInfo.age,
=======
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

        let isAge = AGE_PATTERN.test( newAgeValue ) && Number( newAgeValue ) <= 100;

        dispatch(setInfo({
            ...profileInfo,
            age: isAge ? Number( newAgeValue ) : profileInfo.age,
>>>>>>> dev
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
<<<<<<< HEAD
                        value={profInfo.age || ''}
                        onChange={handleChangeAge}
                        error={regInpErr.ageErr}
                        helperText={'Поле не может быть пустым'}
=======
                        value={profileInfo.age || ''}
                        onChange={handleChangeAge}
                        error={fQErrors.ageErr.value}
                        helperText={fQErrors.ageErr.msg}
>>>>>>> dev
                    />
                <p className="description">Минимальный возраст для регистрации: 18 лет</p>
            </div>
        </>
    )
}

export default FillingQuestAge;
