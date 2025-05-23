import { JSX, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { RootDispatch } from '@/store';
import { getProfileByIdAsync } from '@/store/slices/adminSlice';
import { type IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import UserInfoCtx from './Ctx';
import UserInfoBtns from './Btns';


const selectSettings = (state: IState) => state.settings;
const selectAdmin = (state: IState) => state.admin;

const selectComplListState = createSelector(
    [selectSettings, selectAdmin],
    (settings, admin) => ({
      isLoad: settings.load,
      targetProfile: admin.targetProfile,
    })
);

const UserInfoContent = (): JSX.Element => {
    const { id } = useParams();

    const { isLoad, targetProfile } = useSelector(selectComplListState);

    const dispatch = useDispatch<RootDispatch>();

    if(!id) return (<></>);

    useEffect(
        () => {
            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';

            dispatch(getProfileByIdAsync(id));
        },
        [id]
    )

    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    )

    return (
        <>
            <div className="user-info__ctx">
                <UserInfoCtx targetProfile={targetProfile} />
            </div>
            <div className="user-info__btns">
                <UserInfoBtns targetProfile={targetProfile} />
            </div>       
        </>
    )
}

export default UserInfoContent;
