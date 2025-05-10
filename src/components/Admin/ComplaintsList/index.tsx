import { JSX, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { initComplaintListAsync } from '@/store/slices/adminSlice';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import ComplaintsListHeader from './Header';
import ComplaintsListCtx from './List';


const selectSettings = (state: IState) => state.settings;
const selectAdmin = (state: IState) => state.admin;

const selectComplListState = createSelector(
    [selectSettings, selectAdmin],
    (settings, admin) => ({
      isLoad: settings.load,
      complaintsList: admin.complaintsList,
    })
);

const ComplListCtxMemo   = memo(ComplaintsListCtx);

const ComplaintsListConstent = (): JSX.Element => {
    const { isLoad, complaintsList } = useSelector(selectComplListState);

    const dispatch = useDispatch<RootDispatch>();

    useEffect(() => { dispatch(initComplaintListAsync()) }, []);

    if (isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    );

    if (!complaintsList.length) return (
        <div className="complaints-list__empty">
            <h4 className="headline">Жалоб пока не поступало</h4>
        </div>
    );

    return (
        <>
            <header className="complaints-list__header">
                <ComplaintsListHeader />
            </header>
            <main className="complaints-list__ctx">
                <ComplListCtxMemo complaintsList={complaintsList} />
            </main>
        </>
    );
}

export default ComplaintsListConstent;
