import { JSX } from 'react';
import { getProfilesListAsync } from '@/store/slices/adminSlice';
import { useDispatch } from 'react-redux';
import { RootDispatch } from '@/store';

import Button from '@mui/material/Button';


const UsersListFooter = (): JSX.Element => {
    const dispatch = useDispatch<RootDispatch>();

    const handleSearchQuery = async () => await dispatch( getProfilesListAsync() );

    return (
        <>
            <div className="link">
                <Button className="link__btn" variant="contained" onClick={ handleSearchQuery }>Найти</Button>
            </div>
        </>
    )
}

export default UsersListFooter;
