import { JSX, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initComplaintListAsync } from '@/store/slices/adminSlice';
import type { RootDispatch } from '@/store';

import AdmineFooter from '@/components/UI/AdmineFooter';
import ComplaintsListHeader from './Header';
import ComplaintsListCtx from './List';


const ComplaintsListConstent = (): JSX.Element => {
    const dispatch = useDispatch<RootDispatch>();

    useEffect(() => { dispatch(initComplaintListAsync()) }, []);

    const handleSearch = async (): Promise<void> => {
        await dispatch(initComplaintListAsync());
    };

    return (
        <>
            <header className="complaints-list__header">
                <ComplaintsListHeader handleSearch={handleSearch} />
            </header>
            <main className="complaints-list__ctx">
                <ComplaintsListCtx />
            </main>
            <AdmineFooter handleSearch={handleSearch} />
        </>
    );
}

export default ComplaintsListConstent;
