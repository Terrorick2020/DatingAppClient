import { JSX, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { addRoute, initEPCtxAsync } from '@/store/slices/settingsSlice';
import { createSelector } from 'reselect';
import { warningAlert } from '@/funcs/alert.funcs';
import { getSelfPlansAsync } from '@/store/slices/profileSlice';
import { toMedia } from '@/config/routes.config';
import { useDispatch, useSelector } from 'react-redux';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import SvgVideoHelpers from '@/assets/icon/video-how-this-worked.svg';


const selectSettings = (state: IState) => state.settings;

const selectEPState = createSelector(
    [ selectSettings ],
    ( settings ) => ({
      isFirstly: settings.isFirstly,
      isLoad: settings.load,
      mediaLink: settings.mediaLink,
    })
);

const EPLayout = (): JSX.Element => {
    const { isFirstly, isLoad, mediaLink } = useSelector(selectEPState);

    const dispatch = useDispatch<RootDispatch>();
    const location = useLocation();
    const navigate = useNavigate();

    const handleMediaRoute = async (): Promise<void> => {
        if(!mediaLink) {
            warningAlert(
                dispatch,
                'Ссылка недоступна! Попробуйте позже'
            );

            return;
        };

        navigate(toMedia);
        dispatch(addRoute(location.pathname));
    };

    useEffect( () => { 
        dispatch(initEPCtxAsync());
        !isFirstly && dispatch(getSelfPlansAsync());
    }, []);

    if (isLoad) return (
        <div className="ep-layout">
            <div className="loader">
                <MyLoader />
            </div>
        </div>
    );

    return (
        <div className="ep-layout">
            <header className={ `ep-layout__header ${isLoad && 'opacity'}` }>
                <img
                    alt="help"
                    loading="lazy"
                    decoding="async"
                    className={ `preview-img ${!mediaLink && 'disabled'}` }
                    src={ SvgVideoHelpers }
                    onClick={ handleMediaRoute }
                />
            </header>
            <Outlet />
        </div>
    )
}

export default EPLayout;
