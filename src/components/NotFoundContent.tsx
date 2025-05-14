import { JSX } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dellRoute } from '@/store/slices/settingsSlice';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import Button from '@mui/material/Button';
import SvgNotFound from '@/assets/icon/not-found.svg';


const NotFoundContent = (): JSX.Element => {
    const setRoutes = useSelector((state: IState) => state.settings.routes);

    const navigate = useNavigate();
    const dispatch = useDispatch<RootDispatch>();

    const goBack = (): void => {
        const backRoute = setRoutes.slice(-1)[0];
        navigate(backRoute);
        dispatch(dellRoute());
    };

    return (
        <>
            <div className="error__ctx">
                <header className="header">
                    <div className="box">
                        <img className="image" src={SvgNotFound} alt="not-found" />
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
        </>
    )
}

export default NotFoundContent;
