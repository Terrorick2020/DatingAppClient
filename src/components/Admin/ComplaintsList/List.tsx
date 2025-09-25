import { JSX, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import type { IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import ComplaintsList from './Complaints';
import VideosList from './Video';
import { ESearchComplType } from '@/types/admin.types';


const selectSettings = (state: IState) => state.settings;
const selectAdmin = (state: IState) => state.admin;

const selectComplListState = createSelector(
    [selectSettings, selectAdmin],
    (settings, admin) => ({
      isLoad: settings.load,
      searchComplType: admin.searchComplType,
      complaintsListLen: admin.complaintsList.length,
      videoListsLen: 1,
    })
);

const ComplaintsListCtx = (): JSX.Element => {
    const { isLoad, searchComplType, complaintsListLen, videoListsLen } = useSelector(selectComplListState);

    const isComplaints = searchComplType === ESearchComplType.Complaint;
    const isVideo      = searchComplType === ESearchComplType.Video;

    const ListHTML = useMemo(() => {
        if(isComplaints) return <ComplaintsList />

        return <VideosList />
    }, [searchComplType]);
    
    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    );

    if((isComplaints && !complaintsListLen) || (isVideo && !videoListsLen)) return (
        <div className="not-found">
            <h2 className="text">Ничего не найдено</h2>
        </div>
    );

    return (
        <div className="search-list">
            { ListHTML }
        </div>
    )
}

export default ComplaintsListCtx;
