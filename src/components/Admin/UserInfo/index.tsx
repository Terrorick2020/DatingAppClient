import { useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootDispatch } from '@/store';
import { getProfileByIdAsync } from '@/store/slices/adminSlice';
import { type IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import UserInfoCtx from './Ctx';
import UserInfoBtns from './Btns';


const UserInfoContent = () => {
    const targetProfile = useSelector((state: IState) => state.admin.targetProfile);
    const isLoad = useSelector((state: IState) => state.settings.load);

    const { id } = useParams();
    const dispatch = useDispatch<RootDispatch>();

    useEffect(
        () => {
            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';

            id && dispatch(getProfileByIdAsync(id));
        },
        [id, dispatch]
    )

    const MyLoaderMemo = memo(MyLoader);
    const UserInfoCtxMemo = memo(UserInfoCtx);
    const UserInfoBtnsMemo = memo(UserInfoBtns);

    return (
        <>
            {
                isLoad
                    ?
                    <div className="loader">
                        <MyLoaderMemo />
                    </div>
                    :
                    <>
                        <div className="user-info__ctx">
                            <UserInfoCtxMemo targetProfile={targetProfile} />
                        </div>
                        <div className="user-info__btns">
                            <UserInfoBtnsMemo targetProfile={targetProfile} />
                        </div>       
                    </>
            }
        </>
    )
}

export default UserInfoContent;
