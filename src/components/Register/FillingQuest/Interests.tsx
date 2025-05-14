import { JSX, MouseEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInfo } from '@/store/slices/profileSlice';
import { selSexVarsBase } from '@/constant/settings';
import { setSelSexVars } from '@/store/slices/settingsSlice';
import { type InterestsVarsItem } from '@/types/settings.type';
import { type IState, ESex } from '@/types/store.types';

import IconButton from '@mui/joy/IconButton';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';


const FillingQuestInterests = (): JSX.Element => {
    const profileInfo = useSelector((state: IState) => state.profile.info);
    const interestsVars = useSelector((state: IState) => state.settings.interestsVars);

    const dispatch = useDispatch();

    const handleChangeInterest = (_: MouseEvent<HTMLElement>, newValue: string | null): void => {
        newValue && dispatch(setInfo({
            ...profileInfo,
            interest: newValue
        }))
    }

    useEffect(
        () => {
            const targetObject = interestsVars.find( item => item.value === profileInfo.interest );
            const selSexKey = targetObject?.isOppos ? profileInfo.sex : ESex.All;

            const interestsVar = selSexVarsBase[ selSexKey ];
            const targetSex = interestsVar.find( item => !item.isDisabled )!.value;

            dispatch(setSelSexVars(interestsVar));
            dispatch(setInfo({
                ...profileInfo,
                selSex: targetObject?.isOppos ? targetSex : profileInfo.selSex,
            }))
        },
        [profileInfo.interest, profileInfo.sex]
    )

    return (
        <>
            <div className="widgets__interests">
                <h4 className="headline">Вы хотите найти</h4>
                <ToggleButtonGroup
                    className="select"
                    id="select-interests"
                    spacing={5}
                    value={profileInfo.interest}
                    onChange={handleChangeInterest}
                >
                    {interestsVars.map( (item: InterestsVarsItem) => (
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
