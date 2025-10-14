import { JSX, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ESearchComplType } from '@/types/admin.types';
import { getAdminShorrtsAsync } from '@/store/slices/videosSlice';
import { initComplaintListAsync } from '@/store/slices/adminSlice';
import { initialQuery } from '@/constant/chats';
import type { InitSliderData } from '@/types/quest.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import AdmineFooter from '@/components/UI/AdmineFooter';
import ComplaintsListHeader from './Header';
import ComplaintsListCtx from './List';


const ComplaintsListConstent = (): JSX.Element => {
    const searchComplType = useSelector((state: IState) => state.admin.searchComplType);

    const initData = useRef<InitSliderData>(initialQuery);

    const dispatch = useDispatch<RootDispatch>();

    const handleSearch = async (): Promise<void> => {
        let response;

        switch (searchComplType) {
            case ESearchComplType.Complaint:
                response = await dispatch(initComplaintListAsync(initData.current)).unwrap();
                break;
            case ESearchComplType.Video:
                response = await dispatch(getAdminShorrtsAsync(initData.current)).unwrap();
                break;
        };
    };

    useEffect(() => { handleSearch(); }, []);

    return (
        <>
            <header className="complaints-list__header">
                <ComplaintsListHeader handleSearch={ handleSearch } />
            </header>
            <main className="complaints-list__ctx">
                <ComplaintsListCtx />
            </main>
            <AdmineFooter handleSearch={ handleSearch } />
        </>
    );
}

export default ComplaintsListConstent;
