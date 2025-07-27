import { JSX, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { warningAlert } from '@/funcs/alert.funcs';
import { toNotFoud } from '@/config/routes.config';
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
    const navigate = useNavigate();

    if(!id) {
        navigate(toNotFoud);

        return (<></>);
    }

    const initUserInfo = async (): Promise<void> => {
        const response = await dispatch(getProfileByIdAsync(id)).unwrap();

        if(!response || response === 'error') {
            warningAlert(
                dispatch,
                'Не удалось получить информацию о пользователе',
            );

            navigate(toNotFoud);
        };
    };

    useEffect(() => {
        const logoHeader = document.getElementById('logo-header');
        if( logoHeader ) logoHeader.style.display = 'flex';

        initUserInfo();
    }, [id] );

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
