import { MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInfo } from '@/store/slices/profileSlice';
import { ADD_INTEREST_VAR } from '@/constant/settings';
import { EProfileRoles } from '@/types/store.types';
import { type InterestsVarsItem } from '@/types/settings.type';
import { type IState } from '@/types/store.types';

import IconButton from '@mui/joy/IconButton';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import AddIcon from '@mui/icons-material/Add';


const FillingQuestInterests = () => {
    const profileInfo = useSelector((state: IState) => state.profile.info);
    const interestsVars = useSelector((state: IState) => state.settings.interestsVars);

    const dispatch = useDispatch();

    const handleChangeInterest = (_: MouseEvent<HTMLElement>, newValue: string | null): void => {
        if( newValue === ADD_INTEREST_VAR ) return;

        newValue && dispatch(setInfo({
            ...profileInfo,
            interest: newValue
        }))
    }

    const handleAddInterest = () => {
        
    }

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
                    {
                        profileInfo.role !== EProfileRoles.Admin &&
                        <IconButton
                            className="select__item add-btn"
                            key={`interest__add`}
                            value={ADD_INTEREST_VAR}
                            onClick={handleAddInterest}
                        ><AddIcon /></IconButton>
                    }
                </ToggleButtonGroup>
            </div>
        </>
    )
}

export default FillingQuestInterests
