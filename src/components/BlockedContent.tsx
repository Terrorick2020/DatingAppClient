import {
    isTMA,
    switchInlineQuery,
    SwitchInlineQueryChatType,
} from '@telegram-apps/sdk';

import { JSX } from 'react';
import { useDispatch } from 'react-redux';
import { infoAlert } from '@/funcs/alert.funcs';
import type { RootDispatch } from '@/store';

import Button from '@mui/material/Button';
import SvgBlocked from '@/assets/icon/blocked.svg';


const BlockedContent = (): JSX.Element => {
    const dispatch = useDispatch<RootDispatch>();

    const handleClick = async (): Promise<void> => {
        const isTg = await isTMA();
        
        if(!isTg) {
            infoAlert(
                dispatch,
                'Тех поддержка возможна только в приложении Telegram',
            );

            return;
        };

        const text: string = '/teh';
        const utils: SwitchInlineQueryChatType[] = [ 'users','groups' ];

        if(switchInlineQuery.isAvailable()) {
            switchInlineQuery(text, utils);
        } else {
            infoAlert(
                dispatch,
                'Для получения тех. помощи необходимо закрыть приложение' +
                ' и нажать на соответствующую кнопку в боте',
            );
        };
    };

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
                <div className="link" onClick={handleClick}>
                    <Button variant="contained">Техподдержка</Button>
                </div>
            </footer>
        </div>
    )
}

export default BlockedContent;
