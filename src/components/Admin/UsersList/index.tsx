import { JSX, useEffect, UIEvent } from 'react';
import { useDispatch } from 'react-redux';
import { getProfilesListAsync } from '@/store/slices/adminSlice';
import { getUniqueLinkAsync } from '@/store/slices/adminSlice';
import { type RootDispatch } from '@/store';

import AdmineFooter from '@/components/UI/AdmineFooter';
import UsersListHeader from './Header';
import UsersListMain from './Main';


const UsersListContent = (): JSX.Element => {
    const dispatch = useDispatch<RootDispatch>();

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget; // HTMLDivElement, по которому прокрутка
        console.log(target); // здесь будет элемент users-list__main

        // Например, получить текущую позицию прокрутки по вертикали:
        console.log(target.scrollTop);

        // Или размеры и видимую область
        console.log(target.scrollHeight, target.clientHeight);

        // Определить, дошли ли до низа
        if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
            console.log('Прокрутили до конца вниз');
        }
    };

    useEffect(() => { 
        dispatch(getProfilesListAsync());
        dispatch(getUniqueLinkAsync());
    }, []);

    const handleSearch = async (): Promise<void> => {
        await dispatch( getProfilesListAsync() )
    }

    return (
        <>
            <header className="users-list__header">
                <UsersListHeader />
            </header>
            <main className="users-list__main" onScroll={handleScroll}>
                <UsersListMain />
            </main>
            <AdmineFooter handleSearch={handleSearch} />
        </>
    )
}

export default UsersListContent;
