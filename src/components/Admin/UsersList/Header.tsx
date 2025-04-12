import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchType, setSearchId } from '@/store/slices/adminSlice';
import { EProfileRoles } from '@/types/store.types';
import { type IState } from '@/types/store.types';

import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import SearchInput from '@/components/UI/SearchInput';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/material/Button';


const UsersListHeader = () => {
    const adminState = useSelector((state: IState) => state.admin);

    const dispatch = useDispatch();

    const handleChangeRole = (_: MouseEvent<HTMLElement>, newValue: EProfileRoles | null): void => {
        newValue && dispatch(setSearchType( newValue ));
    }

    const handleInputChange = (newValue: string) => {
        dispatch( setSearchId( newValue ) );
    }

    const handleClearInput = () => {

    }

    const handleInputKeyDown = () => {

    }

    return (
        <>
            <h2 className="headline">Админ-панель</h2>
            <ToggleButtonGroup
                className="person-type"
                spacing={2}
                value={adminState.searchType}
                onChange={handleChangeRole}
            >
                <IconButton className="person-type__item" value={EProfileRoles.User}>Пользователи</IconButton>
                <IconButton className="person-type__item" value={EProfileRoles.Psych}>Пси-специалисты</IconButton>
            </ToggleButtonGroup>
            <div className="persone-inp-conteiner">
                <SearchInput
                    value={adminState.searchId}
                    placeholder="Поиск пользователя по ID..."
                    handleInputChange={handleInputChange}
                    handleClearInput={handleClearInput}
                    handleInputKeyDown={handleInputKeyDown}
                />
                {
                    adminState.searchType === EProfileRoles.Psych &&
                    <Button className="persone-btn" variant="contained">Добавить</Button>
                }
            </div>
        </>
    )
}

export default UsersListHeader;
