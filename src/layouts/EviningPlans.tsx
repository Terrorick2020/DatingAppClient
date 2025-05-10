import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LinkPageType } from '@/types/store.types';
import { initMediaLinkAsync } from '@/store/slices/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addRoute } from '@/store/slices/settingsSlice';
import { appRoutes } from '@/config/routes.config';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import SvgVideoHelpers from '@/assets/icon/video-how-this-worked.svg';


const EPLayout = () => {
    const isLoad = useSelector((state: IState) => state.settings.load);

    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const dispatch = useDispatch<RootDispatch>();
    const location = useLocation();
    const navigate = useNavigate();

    const handleMediaRoute = async (): Promise<void> => {
        const regGlobRoute  = appRoutes.register.global;
        const regMediaRoute = appRoutes.register.inner.media;
        const toMedia = `${regGlobRoute}/${regMediaRoute}`;

        navigate(toMedia);
        dispatch(addRoute(location.pathname));
    }

    useEffect(
        () => {
            const fetchMediaLink = async () => {
                try {
                    const response = await dispatch(
                        initMediaLinkAsync(LinkPageType.EveningPlans)
                    ).unwrap();
                    
                    setIsDisabled(!response);
                } catch (error) {
                    setIsDisabled(false);
                }
            };
        
            fetchMediaLink();
        },
        [dispatch]
    );

    if (isLoad) return (
        <div className="ep-layout">
            <div className="loader">
                <MyLoader />
            </div>
        </div>
    );

    return (
        <>
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
        </>
    )
}

export default EPLayout;
