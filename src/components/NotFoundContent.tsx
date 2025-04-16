import { NavLink } from 'react-router-dom';
import { appRoutes } from '@/config/routes.config';

import Button from '@mui/material/Button';
import SvgNotFound from '@/assets/icon/not-found.svg';


const NotFoundContent = () => {
    const regGlobRoute = appRoutes.register.global
    const regPreviewRoute = appRoutes.register.inner.preview
    const toPreview = `${regGlobRoute}/${regPreviewRoute}`

    return (
        <>
            <div className="error__ctx">
                <header className="header">
                    <div className="box">
                        <img className="image" src={SvgNotFound} alt="not-found" />
                        <h3 className="headline">Cтраница не найдена</h3>
                        <p className="description">Возможно, пользователь удалил свой аккаунт. Продолжайте общаться с другими людьми.</p>
                    </div>
                </header>
                <footer className="footer">
                    <NavLink className="link" to={ toPreview }>
                        <Button variant="contained">Назад к анкетам</Button>
                    </NavLink>
                </footer>
            </div>
        </>
    )
}

export default NotFoundContent
