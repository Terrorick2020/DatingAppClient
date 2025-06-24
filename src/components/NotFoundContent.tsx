import { JSX, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dellRoute } from '@/store/slices/settingsSlice';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import Button from '@mui/material/Button';
import SvgNotFound from '@/assets/icon/not-found.svg';


const selectRoutes = (state: IState) => state.settings.routes;

const NotFoundContent = (): JSX.Element => {
    const setRoutes = useSelector(selectRoutes, shallowEqual);

    const navigate = useNavigate();
    const dispatch = useDispatch<RootDispatch>();

    const goBack = useCallback(() => {
        const backRoute = setRoutes.slice(-1)[0];
        navigate(backRoute);
        dispatch(dellRoute());
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
                        Возможно, пользователь удалил свой аккаунт или возникли какие-то проблемы.
                        Продолжайте общаться с другими людьми.
                    </p>
                </div>
            </header>
            <footer className="footer">
                <div className="link" onClick={goBack}>
                    <Button variant="contained">Назад к анкетам</Button>
                </div>
            </footer>
        </div>
    )
}

export default NotFoundContent;
