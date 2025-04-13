import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { appRoutes } from '@/config/routes.config';
import { addRoute } from '@/store/slices/settingsSlice';
import { setSearchType, setSearchId } from '@/store/slices/adminSlice';
import { SERCH_ID_PATTERN } from '@/constant/admin';
import { EProfileRoles } from '@/types/store.types';
import { getProfilesListAsync } from '@/store/slices/adminSlice';
import { RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import SearchInput from '@/components/UI/SearchInput';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/material/Button';


const UsersListHeader = () => {
    const adminState = useSelector((state: IState) => state.admin);

    const dispatch = useDispatch<RootDispatch>();

    const handleChangeRole = async (_: MouseEvent<HTMLElement>, newValue: EProfileRoles | null): Promise<void> => {
        newValue && dispatch(setSearchType( newValue )) && await dispatch( getProfilesListAsync() );
    }

    const handleInputChange = async (newValue: string): Promise<void> => {
        if( !newValue ) {
            dispatch( setSearchId( newValue ) );
            await dispatch( getProfilesListAsync() );
            return;
        };

        let isId = SERCH_ID_PATTERN.test( newValue );

        dispatch( setSearchId( isId ? newValue : adminState.searchId ) );
    }

    const handleSerch = async () => await dispatch( getProfilesListAsync() );

    const adminGlobRoute = appRoutes.admin.global;
    const adminAddPhys   = appRoutes.admin.inner.physAdd;
    const toAddPhys      = `${adminGlobRoute}/${adminAddPhys}`;

    const navigate = useNavigate();
    const location = useLocation();

    const handleNavToAddPhys = (): void => {
        dispatch(addRoute(location.pathname));
        navigate(toAddPhys);
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
                    handleClearInput={handleSerch}
                    handleInputKeyDown={handleSerch}
                />
                {
                    adminState.searchType === EProfileRoles.Psych &&
                    <Button className="persone-btn" variant="contained" onClick={handleNavToAddPhys}>Добавить</Button>
                }
            </div>
        </>
    )
}

export default UsersListHeader;
