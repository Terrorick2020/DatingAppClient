import { MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInfo } from '@/store/slices/profileSlice';
import { EMySex } from '@/types/profile.types';

import IconButton from '@mui/joy/IconButton';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';

import type { IState } from '@/types/store.types';


const FillingQuestMySex = () => {
    const profInfo = useSelector((state: IState) => state.profile.info);

    const dispatch = useDispatch();

    const handleSelectSex = (_: MouseEvent<HTMLElement>, newValue: EMySex | null) => {
        newValue && dispatch(setInfo({
            ...profInfo,
            sex: newValue,
        }))
    }

    return (
        <>
            <div className="widgets__my-sex">
                <h4 className="headline">Выберите ваш пол</h4>
                <ToggleButtonGroup
                    className="select"
                    id="select-my-sex"
                    spacing={2}
                    value={profInfo.sex}
                    onChange={handleSelectSex}
                >
                    <IconButton className="select__item" value={EMySex.Male}>Мужчина</IconButton>
                    <IconButton className="select__item" value={EMySex.Female}>Женщина</IconButton>
                </ToggleButtonGroup>
            </div>
        </>
    )
}

export default FillingQuestMySex;
