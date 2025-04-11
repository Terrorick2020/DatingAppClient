import { MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInfo } from '@/store/slices/profileSlice';
import { ESex } from '@/types/store.types';
import { type IState } from '@/types/store.types';

import IconButton from '@mui/joy/IconButton';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';


const FillingQuestMySex = () => {
    const profileInfo = useSelector((state: IState) => state.profile.info);

    const dispatch = useDispatch();

    const handleOnChangeSex = (_: MouseEvent<HTMLElement>, newValue: ESex | null): void => {
        newValue && dispatch(setInfo({
            ...profileInfo,
            sex: newValue
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
                    value={profileInfo.sex}
                    onChange={handleOnChangeSex}
                >
                    <IconButton className="select__item" value={ESex.Male}>Мужчина</IconButton>
                    <IconButton className="select__item" value={ESex.Female}>Женщина</IconButton>
                </ToggleButtonGroup>
            </div>
        </>
    )
}

export default FillingQuestMySex;
