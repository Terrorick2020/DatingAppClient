import { JSX } from 'react';
import { SmartCaptcha } from '@yandex/smart-captcha';
import { CAPTURE_KEY, CAPTURE_MODE } from '@/config/env.config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toError } from '@/config/routes.config';
import type { IState } from '@/types/store.types';


export const FillingQuestCaptcha = (): JSX.Element => {
    const lang = useSelector((state: IState) => state.settings.lang);

    const navigate = useNavigate();

    const handleNetworkError = (): void => {
        navigate(toError);
    };

    const handleSuccess = (token: string): void => {
        console.log(token)
    };

    const handleTokenExpired = (): void => {
        console.log('Время жизни токена истекло');
    };

    return (
        <div className="widgets__captcha">
            <SmartCaptcha
                sitekey={CAPTURE_KEY}
                test={CAPTURE_MODE === 'test'}
                language={lang}
                webview={true}
                onNetworkError={handleNetworkError}
                onSuccess={handleSuccess}
                onTokenExpired={handleTokenExpired}
            />
            <p className="captcha-msg-err">Проверка не пройдена</p>
        </div>
    )
}

export default FillingQuestCaptcha;
