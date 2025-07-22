import {
    toPlans,
    toFillQuest,
    toPolicy,
    toRules,
} from '@/config/routes.config';

import { JSX, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRoute } from '@/store/slices/settingsSlice';
import { createSelector } from 'reselect';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { initEPCtxAsync } from '@/store/slices/settingsSlice';
import { type RootDispatch } from '@/store';
import { type IState, EProfileRoles } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import ProfileInfo from './Info';
import ProfilePlans from './Plans';
import ProfileLink from './Link';
import ProfileDelete from './Delete';


const selectSettings = (state: IState) => state.settings;
const selectProfile = (state: IState) => state.profile;

const selectQProfile = createSelector(
    [selectSettings, selectProfile],
    (settings, profile) => ({
      isLoad: settings.load,
      profileInfo: profile.info,
    })
);

const ProfileContent = (): JSX.Element => {
    const { isLoad, profileInfo } = useSelector(selectQProfile);

    const dispatch = useDispatch<RootDispatch>();
    const location = useLocation();
    const navigate = useNavigate();

    const isPsych = profileInfo.role === EProfileRoles.Psych;

    useEffect(() => {
        const profileHtml = document.getElementById('profile');
        if ( profileHtml ) profileHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

        const logoHeader = document.getElementById('logo-header');
        if( logoHeader ) logoHeader.style.display = 'flex';

        !isPsych && dispatch(initEPCtxAsync());

        if( profileHtml && logoHeader ) {
            const handleScroll = (element: HTMLElement) => {
                const atTop = element.scrollTop <= 5;

                logoHeader.classList.toggle('no-shadow', atTop);
            };

            const onScroll = (event: Event) => {
                handleScroll(event.currentTarget as HTMLElement);
            };

            profileHtml.addEventListener('scroll', onScroll);

            handleScroll(profileHtml);

            return () => {
                profileHtml.removeEventListener('scroll', onScroll);
            };
        };
    }, []);

    const handleInfoRoute = (): void => {
        navigate(toFillQuest);
        dispatch(addRoute(location.pathname));
    };

    const handlePlansRoute = (): void => {
        navigate(toPlans);
        dispatch(addRoute(location.pathname));
    };

    const handleRoute = () => {
        dispatch(addRoute(location.pathname));
    };

    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    )

    return (
        <div className="profile__ctx">
            <h4 className="headline">Мой профиль</h4>
            <div className="content">
                <ProfileInfo handleRoute={handleInfoRoute} />
                {!isPsych && <>
                    <ProfilePlans handleRoute={handlePlansRoute} />
                    <ProfileLink />
                </> }
                <ProfileDelete />
                <div className="policy-links">
                    <p className="text">
                        <NavLink
                            to={toPolicy}
                            onClick={handleRoute}
                        >Политика конфиденциальности</NavLink>
                        {" "}и{" "}
                        <NavLink
                            to={toRules}
                            onClick={handleRoute}
                        >Правила использования</NavLink></p>
                </div>
            </div>
        </div>
    )
}

export default ProfileContent;
