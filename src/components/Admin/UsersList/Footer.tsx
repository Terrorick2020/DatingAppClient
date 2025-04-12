import { getProfilesListAsync } from '@/store/slices/adminSlice';
import { useDispatch } from 'react-redux';
import { RoootDispatch } from '@/store';

import Button from '@mui/material/Button';


const UsersListFooter = () => {
    const dispatch = useDispatch<RoootDispatch>();

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
