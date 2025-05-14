import { JSX, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootDispatch } from '@/store';
import { getProfileByIdAsync } from '@/store/slices/adminSlice';
import { type IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import UserInfoCtx from './Ctx';
import UserInfoBtns from './Btns';


const UserInfoContent = (): JSX.Element => {
    const { id } = useParams();

    const targetProfile = useSelector((state: IState) => state.admin.targetProfile);
    const isLoad = useSelector((state: IState) => state.settings.load);

    const dispatch = useDispatch<RootDispatch>();

    useEffect(
        () => {
            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';

            id && dispatch(getProfileByIdAsync(id));
        },
        [id, dispatch]
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
