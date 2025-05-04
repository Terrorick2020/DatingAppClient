import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRoute } from '@/store/slices/settingsSlice';
import { appRoutes } from '@/config/routes.config';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import SvgVideoHelpers from '@/assets/icon/video-how-this-worked.svg';


const EPLayout = () => {
    const isLoad = useSelector((state: IState) => state.settings.load);

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

    return (
        <>
            <div className="ep-layout">
                {
                    isLoad
                        ?
                        <div className="loader">
                            <MyLoader />
                        </div>
                        :
                        <>
                            <header className="ep-layout__header">
                                <img
                                    alt="help"
                                    src={SvgVideoHelpers}
                                    onClick={handleMediaRoute}
                                />
                            </header>
                            <Outlet />   
                        </>
                }
            </div>
        </>
    )
}

export default EPLayout;
