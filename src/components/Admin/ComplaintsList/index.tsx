import { JSX, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initComplaintListAsync } from '@/store/slices/adminSlice';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import ComplaintsListHeader from './Header';
import ComplaintsListCtx from './List';


const ComplaintsListConstent = (): JSX.Element => {
    const isLoad = useSelector((state: IState) => state.settings.load);
    const complaintsList = useSelector((state: IState) => state.admin.complaintsList);

    const dispatch = useDispatch<RootDispatch>();

    useEffect(() => { dispatch(initComplaintListAsync()) }, []);

    return (
        <>
            {
                isLoad
                    ?
                    <div className="loader">
                        <MyLoader />
                    </div>
                    :
                    <>
                        {
                            !complaintsList.length
                                ?
                                <div className="complaints-list__empty">
                                    <h4 className="headline">Жалоб пока не поступало</h4>
                                </div>
                                :
                                <>
                                    <header className="complaints-list__header">
                                        <ComplaintsListHeader />
                                    </header>
                                    <main className="complaints-list__ctx">
                                        <ComplaintsListCtx />
                                    </main>
                               </>
                        }
                    </>
            }
        </>
    )
}

export default ComplaintsListConstent;
