import { MouseEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setInfo } from '@/store/slices/profileSlice';
import { ESex } from '@/types/store.types';
import type { IState } from '@/types/store.types';

import IconButton from '@mui/joy/IconButton';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';


const FillingQuestSelectionSex = () => {
    const profInfo = useSelector((state: IState) => state.profile.info);

    const dispatch = useDispatch();

    const handleSelectSelSex = (_: MouseEvent<HTMLElement>, newValue: string | null) => {
        newValue && dispatch(setInfo({
            ...profInfo,
            selSex: newValue,
        }))
    }

    return (
        <>
            <div className="widgets__selection-sex">
                <h4 className="headline">Выберите, кого вы ищите</h4>
                <ToggleButtonGroup
                    className="select"
                    spacing={3}
                    value={profInfo.selSex}
                    onChange={handleSelectSelSex}
                >
                    <IconButton className="select__item" value={ESex.Male}>Мужчину</IconButton>
                    <IconButton className="select__item" value={ESex.Female}>Женщину</IconButton>
                    <IconButton className="select__item" value={ESex.All}>Всех</IconButton>
                </ToggleButtonGroup>
            </div>
        </>
    )
}

export default FillingQuestSelectionSex