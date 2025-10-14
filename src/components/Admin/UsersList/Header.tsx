import { JSX, MouseEvent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { infoAlert } from '@/funcs/alert.funcs';
import { setSearchType, setSearchId } from '@/store/slices/adminSlice';
import { EProfileRoles } from '@/types/store.types';
import { getProfilesListAsync } from '@/store/slices/adminSlice';
import { RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import SearchInput from '@/components/UI/SearchInput';
import LinkMsg from '@/components/UI/LinkMsg';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/material/Button';


const UsersListHeader = (): JSX.Element => {
    const adminState = useSelector((state: IState) => state.admin);

    const [open, setOpen] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();

    const handleChangeRole = useCallback(
        async (_: MouseEvent<HTMLElement>, newValue: EProfileRoles | null): Promise<void> => {
            if (!newValue) return;
            dispatch(setSearchType( newValue ));
            await dispatch( getProfilesListAsync() );
        },
        [dispatch]
    );

    const handleInputChange = useCallback(
        async (newValue: string): Promise<void> => {
            dispatch( setSearchId( newValue ) );

            !newValue && await dispatch( getProfilesListAsync() );
        },
        [dispatch]
    );

    const handleSearch = useCallback(
        async () => await dispatch(getProfilesListAsync()),
        [dispatch]
    );

    const handleOpen = useCallback(() => {
        if(!adminState.link) {
            infoAlert(
                dispatch,
                'Ссылка для регистрации специалиста отсутствует',
            );

            return;
        };

        setOpen(true)
    }, [adminState.link]);

    return (
        <>
            <h2 className="headline">Пользователи</h2>
            <ToggleButtonGroup
                className="search-type"
                spacing={2}
                value={adminState.searchType}
                onChange={handleChangeRole}
            >
                <IconButton className="search-type__item" value={EProfileRoles.User}>Пользователи</IconButton>
                <IconButton className="search-type__item" value={EProfileRoles.Psych}>Пси-специалисты</IconButton>
            </ToggleButtonGroup>
            <div className="persone-inp-conteiner">
                <SearchInput
                    value={adminState.searchId}
                    placeholder="Поиск пользователя по ID..."
                    inpType="string"
                    handleInputChange={handleInputChange}
                    handleClearInput={handleSearch}
                    handleInputKeyDown={handleSearch}
                />
                {
                    adminState.searchType === EProfileRoles.Psych &&
                    <Button className="persone-btn" variant="contained" onClick={handleOpen}>Добавить</Button>
                }
            </div>
            <LinkMsg link={adminState.link} open={open} setOpen={setOpen} />
        </>
    )
}

export default UsersListHeader;
