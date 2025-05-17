import { JSX, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProfilesListAsync } from '@/store/slices/adminSlice';
import { type RootDispatch } from '@/store';

import AdmineFooter from '@/components/UI/AdmineFooter';
import UsersListHeader from './Header';
import UsersListMain from './Main';


const UsersListContent = (): JSX.Element => {
    const dispatch = useDispatch<RootDispatch>();

    useEffect( () => { dispatch(getProfilesListAsync()) }, [] );

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
            <AdmineFooter handleSearch={handleSearch} />
        </>
    )
}

export default UsersListContent;
