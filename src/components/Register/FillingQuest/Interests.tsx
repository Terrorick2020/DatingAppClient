import { useEffect, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInfo } from '@/store/slices/profileSlice';

import IconButton from '@mui/joy/IconButton';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';

import type { InterestsVariant } from '@/types/settings.type';
import type { IState } from '@/types/store.types';


const FillingQuestInterests = () => {
    const profInfo = useSelector((state: IState) => state.profile.info);
    const interestsVariantsList = useSelector((state: IState) => state.settings.interestsVariants);

    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(setInfo({
                ...profInfo,
                interest: interestsVariantsList[0].value,
            }))
        },
        []
    )

    const handleSelectInterest = (_: MouseEvent<HTMLElement>, newValue: string | null) => {
        newValue && dispatch(setInfo({
            ...profInfo,
            interest: newValue,
        }))
    }

    return (
        <>
            <div className="widgets__interests">
                <h4 className="headline">Вы хотите найти</h4>
                <ToggleButtonGroup
                    className="select"
                    id="select-interests"
                    spacing={ 5 }
                    value={profInfo.interest}
                    onChange={handleSelectInterest}
                >
                    {interestsVariantsList.map( (item: InterestsVariant) => (
                        <IconButton
                            className="select__item"
                            key={`interest__${item.id}`}
                            value={item.value}
                        >
                            {item.label}
                        </IconButton>
                    ))}
                </ToggleButtonGroup>
            </div>
        </>
    )
}

export default FillingQuestInterests;
