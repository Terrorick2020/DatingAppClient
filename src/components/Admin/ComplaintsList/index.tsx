import { JSX, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ESearchComplType } from '@/types/admin.types';
import { getAdminShorrtsAsync } from '@/store/slices/videosSlice';
import { initComplaintListAsync } from '@/store/slices/adminSlice';
import { initialQuery } from '@/constant/chats';
import { errorAlert } from '@/funcs/alert.funcs';
import type { InitSliderData } from '@/types/quest.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import AdmineFooter from '@/components/UI/AdmineFooter';
import ComplaintsListHeader from './Header';
import ComplaintsListCtx from './List';


const ComplaintsListConstent = (): JSX.Element => {
    const searchComplType = useSelector((state: IState) => state.admin.searchComplType);
    
    const [dis, setDis] = useState<boolean>(false);
    const initData = useRef<InitSliderData>(initialQuery);
    const isLoad = useRef<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();

    const handleSearch = async (): Promise<void> => {
        if(isLoad.current) return;

        isLoad.current = true;
        setDis(true);

        let response;
        let text;

        switch (searchComplType) {
            case ESearchComplType.Complaint:
                response = await dispatch(initComplaintListAsync(initData.current)).unwrap();
                text = 'Не удалось получить жалобы';
                break;
            case ESearchComplType.Video:
                response = await dispatch(getAdminShorrtsAsync(initData.current)).unwrap();
                text = 'Не удалось получить короткие видео';
                break;
        };

        if(!response || response === 'error') {
            errorAlert(dispatch, text);
        };

        setDis(false);
        isLoad.current = false;
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
            <AdmineFooter disable={dis} handleSearch={ handleSearch } />
        </>
    );
}

export default ComplaintsListConstent;
