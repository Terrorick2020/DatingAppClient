import { MouseEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setInfo } from '@/store/slices/profileSlice';
import { ESex } from '@/types/store.types';
import { type IState } from '@/types/store.types';

import IconButton from '@mui/joy/IconButton'
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup'


const FillingQuestSelectionSex = () => {
    const profileInfo = useSelector((state: IState) => state.profile.info);
    const selSexVars = useSelector((state: IState) => state.settings.selSexVars);

    const dispatch = useDispatch();

    const handleOnChangeSelSex = (_: MouseEvent<HTMLElement>, newValue: ESex | null): void => {
        newValue && dispatch(setInfo({
            ...profileInfo,
            selSex: newValue
        }))
    }

    return (
        <>
            <div className="widgets__selection-sex">
                <h4 className="headline">Выберите, кого вы ищите</h4>
                <ToggleButtonGroup
                    className="select"
                    spacing={3}
                    value={profileInfo.selSex}
                    onChange={handleOnChangeSelSex}
                >
                    {selSexVars.map(item => (
                        <IconButton
                            className="select__item"
                            key={`select__item-${item.id}`}
                            disabled={item.isDisabled}
                            value={item.value}
                        >{item.label}</IconButton>
                    ))}
                </ToggleButtonGroup>
            </div>
        </>
    )
}

export default FillingQuestSelectionSex;