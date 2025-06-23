import { JSX } from 'react';
import { NavLink } from 'react-router-dom';

import Button from '@mui/material/Button';
import SvgBlocked from '@/assets/icon/blocked.svg';


const BlockedContent = (): JSX.Element => {
    return (
        <div className="error__ctx">
            <header className="header">
                <div className="box">
                    <img className="image" src={SvgBlocked} alt="blocked" loading="lazy" decoding="async" />
                    <h3 className="headline">Ваш аккаунт заблокирован</h3>
                    <p className="description">
                        Возможно, вы нарушили правила использования приложения или конституции РФ.
                        Если вы были заблокированы ошибочно, то отправьте запрос в техподдержку
                    </p>
                </div>
            </header>
            <footer className="footer">
                <NavLink className="link" to={ '' }>
                    <Button variant="contained">Техподдержка</Button>
                </NavLink>
            </footer>
        </div>
    )
}

export default BlockedContent;
