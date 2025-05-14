import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addRoute } from '@/store/slices/settingsSlice';
import { NavLink, useLocation } from 'react-router-dom';
import { appRoutes } from '@/config/routes.config';

import Button from '@mui/material/Button';


const ChangeContent = () => {
    const regGlobRoute    = appRoutes.register.global;
    const regPreviewRoute = appRoutes.register.inner.preview;
    const toPreview       = `${regGlobRoute}/${regPreviewRoute}`;

    const adminGlobRoute      = appRoutes.admin.global;
    const adminUsersListRoute = appRoutes.admin.inner.usersList;
    const toUsersList         = `${adminGlobRoute}/${adminUsersListRoute}`;

    const adminComplaintListRoute = appRoutes.admin.inner.compalintsList;
    const toComplaintList         = `${adminGlobRoute}/${adminComplaintListRoute}`;

    useEffect(
        () => {
            const langHtml = document.getElementById('change');
            if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards';
        },
        []
    )

    const location = useLocation();
    const dispatch = useDispatch();

    const handleRoute = () => {
        dispatch(addRoute(location.pathname));
    }

    return (
        <>
            <div className="change__ctx">
                <h3 className="headline">Выбор режима</h3>
                <div className="links">
                    <NavLink className="link" to={ toPreview } onClick={ handleRoute }>
                        <Button className="link__btn crimson" variant="contained">Приложение</Button>
                    </NavLink>
                    <NavLink className="link" to={ toUsersList } onClick={ handleRoute }>
                        <Button className="link__btn take-pro" variant="contained">Список пользователей</Button>
                    </NavLink>
                    <NavLink className="link" to={ toComplaintList } onClick={ handleRoute }>
                        <Button className="link__btn text-block" variant="contained">Список жалоб</Button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default ChangeContent;
