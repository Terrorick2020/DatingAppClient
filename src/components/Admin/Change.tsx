import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toPreview, toUsersList, toComplsList } from '@/config/routes.config';
import { addRoute } from '@/store/slices/settingsSlice';
import { NavLink, useLocation } from 'react-router-dom';

import Button from '@mui/material/Button';


const ChangeContent = () => {
    useEffect(() => {
        const langHtml = document.getElementById('change');
        if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards';
    },[])

    const location = useLocation();
    const dispatch = useDispatch();

    const handleRoute = () => {
        dispatch(addRoute(location.pathname));
    }

    return (
        <div className="change__ctx">
            <h3 className="headline">Выбор режима</h3>
            <div className="links">
                <NavLink className="link" to={ toPreview } onClick={ handleRoute }>
                    <Button className="link__btn crimson" variant="contained">Приложение</Button>
                </NavLink>
                <NavLink className="link" to={ toUsersList } onClick={ handleRoute }>
                    <Button className="link__btn take-pro" variant="contained">Пользователи</Button>
                </NavLink>
                <NavLink className="link" to={ toComplsList } onClick={ handleRoute }>
                    <Button className="link__btn text-block" variant="contained">Ресурсы и жалобы</Button>
                </NavLink>
            </div>
        </div>
    )
}

export default ChangeContent;
