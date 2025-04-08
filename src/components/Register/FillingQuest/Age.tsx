import { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInfo } from '@/store/slices/profileSlice';
import type { IState } from '@/types/store.types';

import TextField from '@mui/material/TextField';


const agePattern = /^\d+$/;

const FillingQuestAge = () => {
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
                        value={profInfo.age || ''}
                        onChange={handleChangeAge}
                        error={regInpErr.ageErr}
                        helperText={'Поле не может быть пустым'}
                    />
                <p className="description">Минимальный возраст для регистрации: 18 лет</p>
            </div>
        </>
    )
}

export default FillingQuestAge;
