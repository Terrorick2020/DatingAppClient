import {
    getProfilesListAsync,
    setSearchId,
    getUniqueLinkAsync,
} from '@/store/slices/adminSlice';

import { JSX, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { warningAlert } from '@/funcs/alert.funcs';
import { type RootDispatch } from '@/store';

import AdmineFooter from '@/components/UI/AdmineFooter';
import UsersListHeader from './Header';
import UsersListMain from './Main';


const UsersListContent = (): JSX.Element => {
    const dispatch = useDispatch<RootDispatch>();

    const [dis, setDis] = useState<boolean>(false);

    const initUsersList = async (): Promise<void> => {
        if(dis) return;
        
        setDis(true);

        const [_, linkRes] = await Promise.all([
            dispatch(getProfilesListAsync()),
            dispatch(getUniqueLinkAsync()).unwrap(),
        ]);

        if(!linkRes || linkRes === 'error') {
            warningAlert(
                dispatch,
                'Не удалось создать ссылку регистрации специалиста'
            );
        }

        setDis(false);
    }

    useEffect(() => {
        initUsersList();

        return () => {
            dispatch( setSearchId( '' ) );
        };
    }, []);

    const handleSearch = async (): Promise<void> => {
        await dispatch( getProfilesListAsync() )
    }

    return (
        <>
            <header className="users-list__header">
                <UsersListHeader />
            </header>
            <main className="users-list__main">
                <UsersListMain />
            </main>
            <AdmineFooter disable={dis} handleSearch={handleSearch} />
        </>
    )
}

export default UsersListContent;
