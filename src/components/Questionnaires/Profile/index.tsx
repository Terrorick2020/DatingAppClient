import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelfProfile } from '@/store/slices/profileSlice';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import ProfileCtx from './Ctx';


const ProfileContent = () => {
    const isLoad = useSelector((state: IState) => state.settings.load);

    const dispatch = useDispatch<RootDispatch>();

    useEffect(
        () => {
            const profileHtml = document.getElementById('profile');
            if ( profileHtml ) profileHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';

            dispatch(getSelfProfile());
        },
        []
    )

    return (
        <>
            {
                isLoad
                    ?
                    <div className="loader">
                        <MyLoader />
                    </div>
                    :
                    <div className="profile__ctx">
                        <ProfileCtx />
                    </div>
            }
        </>
    )
}

export default ProfileContent;
