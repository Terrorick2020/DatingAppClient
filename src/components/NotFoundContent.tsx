import { JSX, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toSlider } from '@/config/routes.config';
import { dellRoute, resetRoutes } from '@/store/slices/settingsSlice';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import Button from '@mui/material/Button';
import SvgNotFound from '@/assets/icon/not-found.svg';


const selectRoutes = (state: IState) => state.settings.routes;

const NotFoundContent = (): JSX.Element => {
    const setRoutes = useSelector(selectRoutes, shallowEqual);

    const navigate = useNavigate();
    const dispatch = useDispatch<RootDispatch>();

    const goBack = useCallback(() => {
        const backRoute = setRoutes.at(-1);

        if(!backRoute || backRoute === undefined) {
            navigate(toSlider);
            dispatch(resetRoutes());
        } else {
            navigate(backRoute);
            dispatch(dellRoute());        
        };

    }, [setRoutes, navigate, dispatch]);

    return (
        <div className="error__ctx">
            <header className="header">
                <div className="box">
                    <img
                        className="image"
                        alt="not-found"
                        loading="lazy"
                        decoding="async"
                        src={SvgNotFound}
                    />
                    <h3 className="headline">Cтраница не найдена</h3>
                    <p className="description">
                        Возможно, ресурс был удалён или возникли какие-то проблемы.
                        Продолжайте использовать приложение далее.
                    </p>
                </div>
            </header>
            <footer className="footer">
                <div className="link" onClick={goBack}>
                    <Button variant="contained">Вернуться назад</Button>
                </div>
            </footer>
        </div>
    )
}

export default NotFoundContent;
