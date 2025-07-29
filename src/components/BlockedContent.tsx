import { JSX } from 'react';
import { useDispatch } from 'react-redux';
import { handleTechSupport } from '@/funcs/handles.funcs';
import type { RootDispatch } from '@/store';

import Button from '@mui/material/Button';
import SvgBlocked from '@/assets/icon/blocked.svg';


const BlockedContent = (): JSX.Element => {
    const dispatch = useDispatch<RootDispatch>();

    const handleClickTech = (): Promise<void> => handleTechSupport(dispatch);

    return (
        <div className="error__ctx">
            <header className="header">
                <div className="box">
                    <img
                        className="image"
                        src={SvgBlocked}
                        alt="blocked"
                        loading="lazy"
                        decoding="async"
                    />
                    <h3 className="headline">Ваш аккаунт заблокирован</h3>
                    <p className="description">
                        Возможно, вы нарушили правила использования приложения или конституции РФ.
                        Если вы были заблокированы ошибочно, то отправьте запрос в техподдержку
                    </p>
                </div>
            </header>
            <footer className="footer">
                <div className="link" onClick={handleClickTech}>
                    <Button variant="contained">Техподдержка</Button>
                </div>
            </footer>
        </div>
    )
}

export default BlockedContent;
