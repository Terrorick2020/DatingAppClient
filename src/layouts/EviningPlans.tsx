import { JSX, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { addRoute, initEPCtxAsync } from '@/store/slices/settingsSlice';
import { getSelfPlansAsync } from '@/store/slices/profileSlice';
import { toMedia } from '@/config/routes.config';
import { useDispatch, useSelector } from 'react-redux';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import SvgVideoHelpers from '@/assets/icon/video-how-this-worked.svg';


const EPLayout = (): JSX.Element => {
    const [isFirstly, isLoad] = useSelector((state: IState) => [
        state.settings.isFirstly,
        state.settings.load
    ]);
    const mediaLink = useSelector((state: IState) => state.settings.mediaLink);

    const dispatch = useDispatch<RootDispatch>();
    const location = useLocation();
    const navigate = useNavigate();

    const handleMediaRoute = async (): Promise<void> => {
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
            <header className={`ep-layout__header ${isLoad && 'opacity'}`}>
                <img
                    alt="help"
                    className={ `preview-img ${mediaLink && 'disabled'}`}
                    src={SvgVideoHelpers}
                    onClick={handleMediaRoute}
                />
            </header>
            <Outlet />
        </div>
    )
}

export default EPLayout;
