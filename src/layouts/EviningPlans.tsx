import { JSX, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { addRoute, initEPCtxAsync } from '@/store/slices/settingsSlice';
import { getSelfPlansAsync } from '@/store/slices/profileSlice';
import { LinkPageType, type IState } from '@/types/store.types';
import { toMedia } from '@/config/routes.config';
import { useInitMediaLink } from '@/funcs/effects.funcs';
import { useDispatch, useSelector } from 'react-redux';
import type { RootDispatch } from '@/store';

import MyLoader from '@/components/UI/MyLoader';
import SvgVideoHelpers from '@/assets/icon/video-how-this-worked.svg';


const EPLayout = (): JSX.Element => {
    const isLoad = useSelector((state: IState) => state.settings.load);

    const isDisabled = useInitMediaLink(LinkPageType.EveningPlans);

    const dispatch = useDispatch<RootDispatch>();
    const location = useLocation();
    const navigate = useNavigate();

    const handleMediaRoute = async (): Promise<void> => {
        navigate(toMedia);
        dispatch(addRoute(location.pathname));
    };

    useEffect( () => { 
        dispatch(initEPCtxAsync());
        dispatch(getSelfPlansAsync());
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
                    className={ `preview-img ${isDisabled && 'disabled'}`}
                    src={SvgVideoHelpers}
                    onClick={handleMediaRoute}
                />
            </header>
            <Outlet />
        </div>
    )
}

export default EPLayout;
