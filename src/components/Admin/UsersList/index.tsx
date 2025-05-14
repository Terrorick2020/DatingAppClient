import { JSX, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProfilesListAsync } from '@/store/slices/adminSlice';
import { type RootDispatch } from '@/store';

import UsersListHeader from './Header';
import UsersListMain from './Main';
import UsersListFooter from './Footer';


const UsersListContent = (): JSX.Element => {
    const dispatch = useDispatch<RootDispatch>();

    useEffect( () => { dispatch(getProfilesListAsync()) }, [] );

    return (
        <>
            <header className="users-list__header">
                <UsersListHeader />
            </header>
            <main className="users-list__main">
                <UsersListMain />
            </main>
            <footer className="users-list__footer">
                <UsersListFooter />
            </footer>
        </>
    )
}

export default UsersListContent;
